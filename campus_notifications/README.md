# Campus Notifications Priority Inbox

The product manager requested a Priority Inbox to display the top 10 most important unread notifications efficiently. 

## Source Code Location
Instead of isolating the code in a single messy script, this solution was built as an enterprise-grade Express.js microservice. 
The algorithm is an **O(N log K) Min Heap**, located here:
- [src/algorithms/minHeap.ts](../../src/algorithms/minHeap.ts)
- [src/services/notificationService.ts](../../src/services/notificationService.ts)

## Output Screenshots
*(Please drag and drop the API output screenshots of your deployed Render URL here)*
