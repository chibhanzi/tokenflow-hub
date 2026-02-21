# DePeer API

Standalone Node.js/Express backend for the DePeer tokenisation platform.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Run database migration
psql $DATABASE_URL < migrations/001_initial_schema.sql

# Start dev server
npm run dev
```

## API Endpoints

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register/investor` | Register as investor |
| POST | `/api/auth/register/business` | Register as business (full KYB) |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user (auth required) |

### Businesses
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/businesses` | List all (admin) |
| GET | `/api/businesses/mine` | Get own business (business owner) |
| GET | `/api/businesses/:id` | Get public business profile |
| PATCH | `/api/businesses/:id/status` | Approve/reject (admin) |

### Tokens
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tokens/marketplace` | Browse marketplace (public, filterable) |
| GET | `/api/tokens/mine` | Own business tokens |
| GET | `/api/tokens/:id` | Single token details |

### Transactions
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/transactions/buy` | Buy tokens (investor) |
| POST | `/api/transactions/sell` | Sell tokens (investor) |
| GET | `/api/transactions/history` | Transaction history (paginated) |
| GET | `/api/transactions/portfolio` | Holdings & portfolio value |

### Admin
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/users` | List users (paginated) |

## Architecture

```
backend/
├── migrations/          # SQL schema
├── src/
│   ├── config/          # DB & Knex config
│   ├── middleware/       # Auth & validation
│   ├── routes/          # Express route handlers
│   ├── types/           # TypeScript interfaces
│   ├── validators/      # Zod schemas
│   └── index.ts         # Entry point
├── .env.example
├── package.json
└── tsconfig.json
```

## Security

- Passwords hashed with bcrypt (12 rounds)
- JWT-based authentication
- Role-based access control (investor / business / admin)
- Zod input validation on all endpoints
- Helmet security headers
- Roles stored in separate `user_roles` table (prevents privilege escalation)
