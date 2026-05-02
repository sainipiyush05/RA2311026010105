# Vehicle Maintenance Scheduler

The problem requires selecting a subset of vehicles to maximize the total operational impact within a specific mechanic-hour budget. 

## Source Code Location
Instead of isolating the code in a single messy script, this solution was built as an enterprise-grade Express.js microservice. 
The algorithm is a **0/1 Knapsack Dynamic Programming solution**, located here:
- [src/algorithms/knapsack.ts](../../src/algorithms/knapsack.ts)
- [src/services/schedulerService.ts](../../src/services/schedulerService.ts)

## Output Screenshots
*(Please drag and drop the API output screenshots of your deployed Render URL here)*
