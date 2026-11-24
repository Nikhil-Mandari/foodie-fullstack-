# Foodie Full Stack

Foodie Full Stack is a responsive React and TypeScript food shopping frontend built with Vite. It provides food browsing, category filtering, search, browser-local authentication, cart management, checkout, and order-history screens.

> **Repository scope:** This repository contains the frontend application only. It does not include a backend implementation, database schema, migrations, or database server. Authentication, cart, and order data are currently managed with browser state and `localStorage`.

## Project Overview

The application presents vegetarian and non-vegetarian product collections, product search, a persistent shopping cart, checkout flow, and protected account pages. Registration and login use browser-managed user records; they do not contact a backend in the active frontend flow.

## Key Features

- Browse food products on the home page
- Filter products in dedicated vegetarian and non-vegetarian views
- Search products and retain recent searches
- Register and log in using browser-managed user records
- Protect cart, checkout, dashboard, profile, and orders routes
- Add, remove, increase, or decrease cart items
- Persist cart items in `localStorage`
- Select a delivery address manually or from browser geolocation
- Reverse geocode coordinates with OpenStreetMap Nominatim
- Choose supported checkout payment labels
- Calculate item totals, GST, delivery, platform fees, and discounts
- Send checkout details through EmailJS when configured
- View placed orders in the current React session

## Technologies Used

### Frontend

- React 19
- TypeScript
- Vite 8
- React Router DOM 7
- React Hook Form
- Framer Motion
- Axios
- React Toastify
- React Icons
- `react-qr-code`
- `use-immer`
- Tailwind CSS 4

### Browser Storage and External Services

- Browser `localStorage`
- EmailJS Browser SDK
- OpenStreetMap Nominatim reverse geocoding API

### Backend and Database

No backend or database is included in this repository.

### Development Tools

- npm
- Oxlint
- TypeScript compiler

## Project Architecture

```text
Browser
  |
  +--> React pages and components
  |      |
  |      +--> CartContext / OrderContext
  |      |       |
  |      |       +--> localStorage cart persistence
  |      |       +--> in-memory order state
  |
  +--> Local users/session in localStorage
  |
  +--> Optional Axios signup client
  |
  +--> EmailJS order email integration
  |
  +--> OpenStreetMap Nominatim location lookup
```

The active registration and login implementations are browser-local. Optional Axios setup exists for `/auth/signup`, but the active registration component does not call it. Orders are kept in React context for the current session. The cart is persisted across reloads in `localStorage`.

## Folder Structure

```text
foodie-fullstack/
├── public/
├── src/
│   ├── apis/
│   ├── assets/
│   ├── component/
│   │   └── data/
│   ├── contextapi/
│   ├── interfaces/
│   ├── pages/
│   ├── services/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## Screenshots

Screenshots are not included in the repository. Add application captures to a `screenshots/` directory and update this section when available.

## Prerequisites

- Node.js 18 or newer
- npm

## Installation

```powershell
git clone https://github.com/Nikhil-Mandari/foodie-fullstack-.git
cd foodie-fullstack-
npm install
```

## Frontend Setup

No frontend build variables are required to start the browsing and local authentication experience. To configure the optional REST API or EmailJS integration:

```powershell
Copy-Item .env.example .env
```

Update `.env` with your own values. `.env` is ignored by Git and must never contain private credentials in repository documentation or source files.

## Backend Setup

No backend setup is included. The repository does not start or contain a database or REST server.

An optional signup client exists and calls `POST /auth/signup` on `VITE_API_BASE_URL`. The active registration and login screens use `localStorage` instead, so this endpoint is not required for the current active flow.

## Database Configuration

No database configuration is included.

The implemented browser storage keys are:

- `users` - registered browser-local users
- `loggedInUser` - the current browser-local session
- `rememberMe` - login preference
- `food-express-cart` - persisted cart contents
- `recentSearches` - recent search terms

These values are not suitable for production authentication or sensitive customer data.

## Environment Variables

```dotenv
VITE_API_BASE_URL=http://localhost:8005/api
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

- `VITE_API_BASE_URL` defaults to `http://localhost:8005/api`.
- EmailJS variables are required only for checkout order-email functionality.
- Vite variables are exposed to browser code. EmailJS public configuration is suitable for this frontend; private credentials must not be used.

## API Endpoints and Integrations

### Frontend Routes

| Route | Access |
|---|---|
| `/` | Public |
| `/veg` | Public |
| `/nonveg` | Public |
| `/register` | Public |
| `/login` | Public |
| `/order-success` | Public |
| `/cart` | Requires `loggedInUser` |
| `/checkout` | Requires `loggedInUser` |
| `/orders` | Requires `loggedInUser` |
| `/orders/:id` | Requires `loggedInUser` |
| `/dashboard` | Requires `loggedInUser` |
| `/profile` | Requires `loggedInUser` |

### REST Endpoint Found in Source

| Method | Endpoint | Usage |
|---|---|---|
| `POST` | `${VITE_API_BASE_URL}/auth/signup` | Optional registration API helper |

The full default signup URL is `http://localhost:8005/api/auth/signup`.

### External Integrations

| Service | Request | Usage |
|---|---|---|
| OpenStreetMap Nominatim | `GET https://nominatim.openstreetmap.org/reverse?format=json&lat=...&lon=...` | Converts coordinates to a readable address |
| EmailJS | Browser SDK `emailjs.send(...)` | Sends checkout details configured from Vite environment variables |

### API Configuration Review

The Axios client used port `8005`, while `vite.config.ts` previously proxied `/api` to port `8080`. Because the Axios client used an absolute URL in `axiosConfig.ts`, the Vite proxy did not participate in the optional signup calls. The proxy target is now aligned to `8005`. If a backend is configured elsewhere, set `VITE_API_BASE_URL` and update the proxy target consistently.

## How to Run the Project

Start the Vite development server:

```powershell
npm run dev
```

The local URL is normally `http://localhost:5173`.

Create a production build:

```powershell
npm run build
```

Preview the production build:

```powershell
npm run preview
```

Run lint:

```powershell
npm run lint
```

## Security Notes

Do not commit `.env` files or replace placeholders with real private credentials. The source no longer contains the previously hardcoded EmailJS identifiers. Browser `localStorage` passwords and customer details are not suitable for secure production authentication or data storage.

## Future Enhancements

- Add a real backend and database
- Implement secure server-side authentication and password hashing
- Replace browser order state with persisted backend orders
- Add automated tests for authentication, cart, checkout, and routing
- Add a real payment integration
- Add order cancellation and delivery-status updates
- Improve location privacy messaging and API rate-limit handling
- Add responsive screenshots to documentation

## Author

**Nikhil Mandari**

- GitHub: https://github.com/Nikhil-Mandari
- Repository: https://github.com/Nikhil-Mandari/foodie-fullstack-
