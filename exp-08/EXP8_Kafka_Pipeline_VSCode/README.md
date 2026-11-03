# Experiment 8 — Kafka-Based Event-Driven Publishing Pipeline

This starter project follows the uploaded instructions: Docker Kafka in KRaft mode, Spring Boot backend, scheduled producer, Kafka consumer, retry with exponential backoff, dead-letter topic, idempotency table, and React dashboard.

## Requirements
- Java 17
- Maven installed (or open the backend folder in an IDE that supports Maven)
- Docker Desktop running
- Node.js

## Run in VS Code (Windows PowerShell)

### Terminal 1 — Start Kafka
From the project root (`EXP8_Kafka_Pipeline`):
```powershell
docker compose up -d
```
Check:
```powershell
docker ps
```

### Terminal 2 — Start backend
```powershell
cd backend
mvn spring-boot:run
```
Backend: http://localhost:8080

If `mvn` is not recognized, install Maven or open `backend/pom.xml` in IntelliJ/VS Code with Java extensions.

### Terminal 3 — Start frontend
```powershell
cd frontend
npm install
npm run dev
```
Open the URL Vite prints, usually http://localhost:5173.

## Test
1. Write a post in the dashboard.
2. Select a future schedule time (or leave it blank for about one minute from now).
3. Click **Schedule Post**.
4. The scheduler checks every 10 seconds and sends due posts to `post-topic`.
5. The consumer retries up to three attempts. Successful posts become `PUBLISHED`; failed posts become `FAILED` and are sent to `post-topic-dlq`.
6. The UI refreshes automatically.

## Stop Kafka
From the project root:
```powershell
docker compose down
```

## Notes
- The backend uses an H2 file database under `backend/data`.
- A 20% simulated failure chance is included to demonstrate retries and DLQ.
- This is a learning/demo implementation. For production, use durable Kafka retry/DLQ handling and stronger transaction/idempotency guarantees.
