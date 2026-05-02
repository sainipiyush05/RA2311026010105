# Architecture Overview

This project is built using a clean, layered architecture based on Node.js and TypeScript, designed for enterprise scalability.

## 1. Directory Structure

- `src/config`: Environment variable validation and initialization.
- `src/middleware`: Custom Express middleware for logging, errors, security, tracing, and timing.
- `src/controllers`: Request/Response handling layer. Extracts params and delegates to services.
- `src/services`: Business logic layer. Independent of HTTP contexts.
- `src/repository`: Data access layer. Handles fetching data from external APIs or databases.
- `src/algorithms`: Core pure computational functions (e.g., Knapsack DP, Min Heap).
- `src/utils`: Reusable helpers (Response formatters, Retry logic).

## 2. Distributed Logging System
Logs are not just printed to stdout; they are dispatched to a centralized logging microservice.
- Implementation: `src/middleware/logger.ts`
- Resiliency: Utilizes an automatic retry handler (`withRetry`) to prevent dropping logs if the logging service stutters.
- Contextualization: Request IDs (UUIDs) are attached to logs via `requestLogger.ts` for end-to-end trace mapping.

## 3. Centralized Error Handling
Instead of ad-hoc `res.status(500).send()` calls scattered in the code:
- Controllers wrap logic in `try-catch` blocks and pass errors to `next(error)`.
- `src/middleware/errorMiddleware.ts` formats the error consistently (stripping stack traces in production) and triggers an `error` level remote log.

## 4. Algorithms Integration
- **Scheduler Service (Knapsack):** The `optimizeSchedule` algorithm in `src/algorithms/knapsack.ts` uses Dynamic Programming (O(nW)) to solve the subset selection problem. It ensures the max impact is achieved without exceeding mechanics' hours.
- **Priority Inbox (Min Heap):** The `getTopKNotifications` algorithm avoids sorting the entire notification array $O(N \log N)$ by using a Min Heap of size K $O(N \log K)$. This is significantly faster for large sets where $K \ll N$.
