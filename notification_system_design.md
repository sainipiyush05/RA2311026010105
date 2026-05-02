# Campus Notification System Design

This document details the architectural design for the enterprise-grade Campus Notification System.

## Stage 1: REST API Design

### Endpoints

1. **`GET /notifications`**
   - **Purpose:** Fetch paginated notifications for the authenticated user.
   - **Pagination:** Cursor-based (`?cursor=timestamp&limit=20`) to prevent duplicate items during infinite scrolling.
   - **Response:** `200 OK` with array of notifications.

2. **`GET /notifications/unread`**
   - **Purpose:** Fetch unread count and top notifications.

3. **`POST /notifications`**
   - **Purpose:** Create a new notification.
   - **Body:** `{ "type": "string", "message": "string", "targetUsers": ["id"] }`
   - **Idempotency:** Accepts an `Idempotency-Key` header to prevent duplicate creations on retry.

4. **`PATCH /notifications/:id/read`**
   - **Purpose:** Mark a specific notification as read.

5. **`PATCH /notifications/read-all`**
   - **Purpose:** Mark all notifications for the user as read.

### WebSocket Design
For real-time updates, WebSockets will be used alongside the REST APIs.
- **Architecture:** Node.js WebSockets (Socket.io) with **Redis Pub/Sub** adapter.
- **Scaling:** Redis Pub/Sub enables horizontal scaling of WebSocket servers by broadcasting events across all active node instances.
- **Connection Management:** JWT authentication occurs on the connection handshake.

## Stage 2: Database Design

### SQL vs NoSQL
**PostgreSQL** (SQL) is chosen over NoSQL due to:
- ACID compliance and strict transactional guarantees (vital for read/unread state consistency).
- Powerful indexing (B-Tree, partial indexes).
- Relational integrity between Users and Notifications.

### Schema
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Indexing Strategy
To optimize frequent queries:
```sql
-- Composite index for the main notification feed
CREATE INDEX idx_notifications_user_created ON notifications(user_id, created_at DESC);

-- Partial index for unread notifications ONLY (saves significant space and speeds up unread counts)
CREATE INDEX idx_unread_notifications ON notifications(user_id) WHERE is_read = false;
```

## Stage 3: Query Optimization

### Analysis of the Slow Query
```sql
SELECT * FROM notifications WHERE studentID = 1042 AND isRead = false ORDER BY createdAt DESC;
```
**Why it's slow:**
- `SELECT *` forces the DB to read the full row from disk rather than an index (no Covering Index).
- Without a specific index, this causes a **Full Table Scan**.
- The `ORDER BY` causes an in-memory sort which is computationally expensive for large datasets.

**Optimized Approach:**
Using the partial index mentioned above (`CREATE INDEX idx_unread_notifications ON notifications(user_id) WHERE is_read = false;`), the DB only stores unread items in this index.

Querying recent placement notifications:
```sql
SELECT id, message, created_at FROM notifications 
WHERE type = 'Placement' AND created_at > NOW() - INTERVAL '7 days';
```

## Stage 4: Performance Scaling

- **Redis Caching:** Cache the top 20 notifications per user. Invalidate when a new notification is created or marked as read.
- **Lazy Loading:** Frontend uses cursor-based pagination with Intersection Observer to implement infinite scrolling.
- **Read Replicas:** Route `GET` requests to PostgreSQL read replicas to offload the primary write database.
- **Rate Limiting:** Protect APIs using Redis-based token bucket rate limiters to prevent abuse.

## Stage 5: Reliable Bulk Notifications

**The Problem with Synchronous Processing:**
Processing bulk notifications synchronously (looping over 10,000 students and sending an email/DB insert) leads to:
- Blocked Node.js event loop.
- API timeouts.
- Partial failures (if it crashes halfway, we don't know who received it).

**The Event-Driven Solution:**
Use **Kafka** or **RabbitMQ** to implement an asynchronous worker architecture.
1. The API receives the bulk request and instantly returns `202 Accepted`.
2. It publishes a single `bulk_notification_requested` event to a message broker.
3. A fan-out worker consumes the event and splits it into individual `send_notification` events.
4. Email/DB workers consume these individual events independently.
5. **Retries & Dead Letter Queues (DLQ):** If a specific email fails, it is placed in a retry queue with exponential backoff. If it fails 5 times, it is moved to a DLQ for manual inspection. This guarantees eventual consistency and fault tolerance.

## Stage 6: Priority Inbox Implementation

**The Problem:**
The product manager requested a Priority Inbox to display the top $n$ (e.g., 10) most important unread notifications. Sorting the entire database table or array using standard algorithms takes $O(N \log N)$ time. As the notification volume grows to millions, this becomes computationally expensive and slow for real-time inbox rendering.

**The Solution:**
I implemented a custom **Min Heap Priority Queue** data structure in TypeScript (`src/algorithms/minHeap.ts`). 

**How it maintains the top 10 efficiently:**
1. A Min Heap is initialized with a maximum capacity of $K$ (where $K = 10$).
2. As new notifications stream in or are fetched from the API, they are evaluated against the root of the Min Heap (which represents the *lowest* priority notification currently in the top 10).
3. Priority weights are assigned: `Placement = 3`, `Result = 2`, `Event = 1`. If weights are equal, the more recent `Timestamp` wins.
4. If a new notification has a higher priority than the root, the root is popped and the new notification is inserted, taking $O(\log K)$ time to re-heapify.
5. **Time Complexity:** The total time complexity is vastly reduced to **$O(N \log K)$**. Because $K$ is a small constant (10), this effectively approaches $O(N)$, allowing the system to instantly extract the top 10 notifications regardless of how massive the total array becomes.
