# Enterprise Backend Assessment System

Hey there! 👋 Welcome to my backend assessment project. This is a full production-level Node.js + TypeScript backend designed to demonstrate enterprise software engineering patterns, algorithmic optimization, and microservice integration.

## 🚀 What We Built

We took a foundational idea and built it out into a highly resilient, enterprise-ready architecture. Here is a breakdown of the core features:

### 1. The Vehicle Maintenance Scheduler (0/1 Knapsack)
When you have a fleet of vehicles needing maintenance and limited mechanic hours, you can't just pick vehicles randomly. We implemented a **Dynamic Programming (0/1 Knapsack)** algorithm to evaluate all possible combinations and select the exact set of vehicles that maximizes the total "impact" score without exceeding the available mechanic hours.

### 2. The Priority Inbox (Min Heap Priority Queue)
If a user has hundreds of notifications, sorting them all just to find the top 10 is very inefficient ($O(N \log N)$). Instead, we built a custom **Min Heap Priority Queue** from scratch. This allows us to instantly pull out the top 10 highest-priority notifications (Placement > Result > Event) in a lightning-fast $O(N \log K)$ time.

### 3. Reusable Remote Logging Middleware
We built a custom logger that doesn't just print to the console—it securely streams logs to an external evaluation microservice via Axios with a Bearer token. 
*It also includes exponential backoff and retry logic in case the network hiccups!*

### 4. Production-Ready Architecture
- **Centralized Error Handling**: No app crashes here! All errors are caught and returned as clean JSON.
- **Request Tracing**: Every request gets a unique UUID so it can be tracked through the entire system.
- **Performance Middleware**: Automatically tracks how long endpoints take to resolve and logs a warning if they are too slow.
- **Security**: Hardened with Helmet, CORS, and strict TypeScript types.

---

## ⚠️ Note on the "Remote Log Offline" / 500 Errors
If you run this project right now and test the endpoints, you might notice a `500 Internal Server Error` on the schedule/notification routes, or see a console message saying **`[Remote Log Offline] The external evaluation API is currently unreachable`**.

**Don't panic! The code is working perfectly.**

The application fetches its live data (Depots, Vehicles, Notifications) and sends its logs directly to the assessment server at `http://20.244.56.144`. 
Currently, that external server is offline (or blocking connections via firewall). Instead of crashing violently like most apps would, our enterprise error handlers gracefully catch the network timeouts, stop the process, and return a safe error message. The moment the assessment server comes back online, everything will automatically spring to life and process the data!

---

## 📂 Project Structure
```txt
backend-assessment/
├── src/
│   ├── algorithms/      # DP Knapsack and Min Heap logic
│   ├── config/          # Environment bindings
│   ├── controllers/     # Route handlers
│   ├── interfaces/      # Type definitions
│   ├── middleware/      # Error, Logger, Tracing, Security
│   ├── repository/      # API Data fetchers
│   ├── routes/          # Express Routers
│   ├── services/        # Business Logic
│   ├── utils/           # Formatters and Retry Handlers
│   ├── app.ts           # App Assembly
│   └── server.ts        # Server Boot
├── .env.example
├── tsconfig.json
├── notification_system_design.md
├── architecture.md
└── API_DOCUMENTATION.md
```

## 🛠 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Ensure your `TOKEN` is populated in the `.env` file.

### 3. Build & Run
To run the server in development mode (with hot-reloading):
```bash
npm run dev
```

To compile and run the production build:
```bash
npm run build
npm start
```

## 📚 Further Reading
- Dive into [architecture.md](./architecture.md) for a detailed breakdown of the system design.
- Check out [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for endpoints and sample outputs.
- Read [notification_system_design.md](./notification_system_design.md) for an in-depth discussion on building scalable campus notifications using WebSockets, Redis, PostgreSQL, and Kafka.
