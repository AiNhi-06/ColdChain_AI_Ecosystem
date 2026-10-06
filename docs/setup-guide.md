# ColdChain AI Ecosystem — Setup Guide

## Prerequisites

- [.NET SDK 10.0](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js 24+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (optional)
- IDE: Visual Studio 2022+, VS Code + C# extension, or rider

---

## 1. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Restore all packages
dotnet restore

# Build the solution
dotnet build

# Run tests
dotnet test

# Run a specific service (e.g., API Gateway)
dotnet run --project src/ApiGateway
```

### Run all services (development)

```bash
# Start API Gateway (port 5000)
dotnet run --project src/ApiGateway --urls "http://localhost:5000"

# In separate terminals, start each service:
dotnet run --project src/Services/IdentityService --urls "http://localhost:5001"
dotnet run --project src/Services/DeviceService --urls "http://localhost:5002"
dotnet run --project src/Services/TemperatureService --urls "http://localhost:5003"
dotnet run --project src/Services/AlertService --urls "http://localhost:5004"
dotnet run --project src/Services/OrderService --urls "http://localhost:5005"
```

Or use Docker Compose:

```bash
docker-compose up --build
```

---

## 2. Frontend Setup

```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build
```

---

## 3. Access the Application

| Service        | URL                        |
|---------------|----------------------------|
| Frontend      | http://localhost:3000      |
| API Gateway   | http://localhost:5000      |
| Identity API  | http://localhost:5000/api/identity |
| Devices API   | http://localhost:5000/api/devices  |
| Temperature API | http://localhost:5000/api/temperature |
| Alerts API    | http://localhost:5000/api/alerts    |
| Orders API    | http://localhost:5000/api/orders    |

---

## 4. Project Structure

```
ColdChain_AI_Ecosystem/
├── Backend/
│   ├── ColdChain.sln
│   ├── src/
│   │   ├── ApiGateway/         # YARP reverse proxy
│   │   ├── Services/
│   │   │   ├── IdentityService/
│   │   │   ├── DeviceService/
│   │   │   ├── TemperatureService/
│   │   │   ├── AlertService/
│   │   │   └── OrderService/
│   │   └── Shared/
│   │       └── Common/         # Shared DTOs, utilities
│   ├── tests/
│   │   ├── IdentityService.Tests/
│   │   ├── DeviceService.Tests/
│   │   ├── TemperatureService.Tests/
│   │   ├── AlertService.Tests/
│   │   └── OrderService.Tests/
│   └── docker-compose.yml
├── Frontend/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Route pages
│   │   ├── services/           # API service layer
│   │   ├── hooks/              # Custom hooks
│   │   ├── store/              # Zustand stores
│   │   │   └── slices/
│   │   ├── types/              # TypeScript types
│   │   ├── utils/              # Utility functions
│   │   └── __tests__/          # Test files
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig*.json
└── docs/
    ├── architecture.md
    └── setup-guide.md
```