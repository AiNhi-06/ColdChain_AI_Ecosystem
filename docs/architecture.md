# ColdChain AI Ecosystem

## Overview

ColdChain AI Ecosystem is a cold chain monitoring platform built with a **Service-Oriented Architecture (SOA)** using **.NET 10** on the backend and **React + Vite + TypeScript** on the frontend.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                        │
│                         Port 3000                              │
└───────────────────────────┬─────────────────────────────────────┘
                            │ /api/*
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   API Gateway (YARP Reverse Proxy)              │
│                         Port 5000                              │
├─────────────┬──────────────┬───────────┬───────────┬───────────┤
│  Identity   │   Device     │ Temperat. │   Alert   │   Order   │
│  Service    │   Service    │  Service  │  Service  │  Service  │
│  :5001      │   :5002      │  :5003    │  :5004    │  :5005    │
└─────────────┴──────────────┴───────────┴───────────┴───────────┘
```

## Backend Services

| Service       | Port  | Responsibility                   |
|---------------|-------|----------------------------------|
| API Gateway   | 5000  | YARP reverse proxy, routing      |
| Identity      | 5001  | Authentication, authorization    |
| Device        | 5002  | IoT device management            |
| Temperature   | 5003  | Temperature & humidity tracking  |
| Alert         | 5004  | Alert generation & notification  |
| Order         | 5005  | Cold chain order management      |
| Common        | -     | Shared DTOs, utilities           |

## Frontend

- **React 19** + **TypeScript**
- **Vite 6** for build tooling
- **Zustand** for state management
- **React Router v7** for routing
- **Axios** for API calls
- **Vitest** + **React Testing Library** for testing

## Tech Stack

- **Runtime**: .NET 10 / Node.js 24
- **Database**: TBD
- **Message Broker**: TBD
- **Containerization**: Docker & Docker Compose