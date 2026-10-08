# CLIXAD — ColdChain AI Ecosystem

## What it is

A **cold chain monitoring platform** built with **.NET 10 SOA** backend and **React 19 + TypeScript** frontend. Three user roles: Sender (chủ vựa), Driver (tài xế), and Enterprise (doanh nghiệp).

## Folder layout

```
ColdChain_AI_Ecosystem/
├── Backend/
│   ├── ColdChain.slnx           # solution file (.slnx, not .sln)
│   ├── src/
│   │   ├── ApiGateway/          # YARP reverse proxy (port 5000)
│   │   ├── Services/{Identity,Device,Temperature,Alert,Order}Service/
│   │   └── Shared/Common/       # shared DTOs & utilities
│   ├── tests/{Service}.Tests/   # one xUnit project per service
│   └── docker-compose.yml
├── Frontend/
│   ├── src/
│   │   ├── pages/{auth,sender,driver,enterprise}/
│   │   ├── components/ hooks/ services/ store/ types/ utils/
│   │   └── __tests__/           # colocated here, not per-page
│   ├── vite.config.ts           # port 3000, /api → proxy :5000
│   └── package.json
└── docs/
```

## Build / test / run

```bash
# Backend (from Backend/)
dotnet restore && dotnet build && dotnet test
dotnet run --project src/ApiGateway   # or any service

# Frontend (from Frontend/)
npm install && npm run dev       # dev server :3000
npm test                         # Vitest
npm run build                    # tsc -b && vite build
```

Full stack: `cd Backend && docker-compose -f docker-compose.yml up --build`

## Conventions to follow

1. **Backend** uses `<Nullable>enable</Nullable>` and `<ImplicitUsings>enable</ImplicitUsings>` everywhere; no explicit `using` statements needed.
2. **Solution file** is `.slnx` (XML, not the old `.sln` format). Add or remove projects there.
3. **Frontend tests** live in `src/__tests__/` using Vitest + jsdom + `@testing-library/react`. Tests use Vietnamese assertions (matching the UI language).
4. **State management** is Zustand; local state for forms/modals, server state for API data.
5. **Routing** uses React Router v7 with role-based paths (`/sender`, `/driver`, `/enterprise`).
6. **API calls** go through Axios, proxied via Vite (`/api` → `localhost:5000`).
7. **`tsconfig.app.json`** enables `strict` + `noUnusedLocals` + `noUnusedParameters`; the build (`npm run build`) runs `tsc -b` first — type errors will fail the build.
8. **ESLint** enforces `react-refresh/only-export-components` — every page/component should export its default as a named export or a `export default` at the end.
9. **The `.env` file in root** is the backend env template; backend services read `ASPNETCORE_ENVIRONMENT` from it. Frontend env goes in its own `.env` in `Frontend/`.
10. **Vietnamese** is the UI language throughout (labels, errors, statuses, navigation).
11. **Status badge values**: `pending` → "Chờ vận chuyển", `in_transit` → "Đang vận chuyển", `delivered` → "Đã bàn giao".

## Git

Active branch: `Sender_view`. Base configuration (secrets) in `.env` is tracked; local overrides go into `.env.local` or `.env.production` (gitignored).