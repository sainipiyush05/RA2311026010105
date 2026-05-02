# API Documentation

## 1. System Health
`GET /api/health`
Returns the system status and uptime. Useful for load balancers.
```json
{
  "success": true,
  "message": "System is healthy",
  "data": {
    "status": "UP",
    "uptime": 12.34,
    "timestamp": "2026-05-02T10:00:00.000Z"
  }
}
```

## 2. Generate Maintenance Schedule
`GET /api/schedule/:depotId`
Calculates the optimal maintenance schedule for a given depot using the 0/1 Knapsack DP algorithm.
- **Path Parameter**: `depotId` (String)

**Success Response (200 OK)**
```json
{
  "success": true,
  "message": "Schedule generated successfully",
  "data": {
    "depotId": "1",
    "mechanicHours": 24,
    "maxImpact": 42,
    "totalDuration": 22,
    "selectedVehicles": [
      {
        "TaskID": "V1",
        "Duration": 10,
        "Impact": 20
      }
    ]
  }
}
```

**Error Response (404 Not Found)**
```json
{
  "success": false,
  "message": "Depot with ID 999 not found"
}
```

## 3. Priority Inbox
`GET /api/notifications/priority`
Fetches all notifications and returns the top 10 highest priority ones utilizing a Min Heap.
- **Priority Logic:** Placement (3) > Result (2) > Event (1). Ties are broken by most recent timestamp.

**Success Response (200 OK)**
```json
{
  "success": true,
  "message": "Priority Inbox fetched successfully",
  "data": [
    {
      "ID": "123",
      "Type": "Placement",
      "Message": "You have been placed!",
      "Timestamp": "2026-04-22T17:51:18.000Z"
    }
  ]
}
```
