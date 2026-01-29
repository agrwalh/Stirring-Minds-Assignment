# Startup Benefits Platform

A premium full-stack platform for startup founders to access exclusive SaaS deals, built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Node.js/Express**.



## 🚀 Features

-   **Premium UI/UX**: Glassmorphism design, smooth page transitions (Bento Grid, Spotlight), and micro-interactions using Framer Motion.
-   **Role-Based Access**: "Locked" deals are restricted to verified founders.
-   **Verification System**: Auto-verifies users with `@startup.com` or `@innovate.io` emails.
-   **Deal Claims**: Interactive claiming process with permission checks and dashboard tracking.
-   **Robust Backend**: Layered architecture, security middleware (Helmet, Rate Limiting), global error handling, and JWT authentication.

---

## 🛠️ Tech Stack

-   **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Axios.
-   **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT.
-   **Infrastructure**: REST API with CORS/Proxy integration.

---

## 📖 End-to-End Application Flow

1.  **Onboarding**: Users land on a high-conversion Landing Page with 3D-style animations.
2.  **Registration**: Users sign up. 
    -   *Logic*: If email domain is `@startup.com`, they are auto-marked `isVerified: true`. Otherwise `false`.
3.  **Discovery**: Users browse the Deals Listing.
    -   *Public Deals*: Visible to everyone.
    -   *Locked Deals*: Visible but blurred/unclickable for unverified users.
4.  **Claiming**: 
    -   Verified users click "Claim".
    -   Backend validates eligibility.
    -   If successful, a Coupon Code is revealed and saved to their Dashboard.
5.  **Dashboard**: Users view their claimed history and redemption codes.

---

## 🔐 Authentication & Authorization Strategy

The system uses a **Stateless JWT (JSON Web Token)** strategy.

1.  **Login/Register**: Server validates credentials and signs a JWT payload containing `{ _id, role, isVerified }`.
2.  **Token Storage**: Frontend stores the token in `localStorage` (via AuthContext).
3.  **Protected Routes**:
    -   Frontend: `AuthGuard` or simple conditional rendering checks for `user` context.
    -   Backend: `protect` middleware verifies the Bearer Token signature.
    -   Backend: `verifiedOnly` middleware checks `req.user.isVerified` before allowing access to locked endpoints.

---

## 🔄 Internal Flow of Claiming a Deal

1.  **Frontend Request**: `POST /api/v1/claims` with `{ dealId }`.
2.  **Backend Validation (Controller)**:
    -   Does the Deal exist? (404 if no)
    -   Is the Deal "Locked"? 
        -   If `deal.isLocked == true`, check `user.isVerified`.
        -   If User Not Verified -> Return `403 Forbidden`.
    -   Has the user already claimed this?
        -   Check `Claim` collection for `{ user, deal }` index.
        -   If exists -> Return `400 Bad Request`.
3.  **Transaction**: 
    -   Create new `Claim` record.
    -   Return success response with the `discountCode`.

---

## 🔌 Interaction Between Frontend & Backend

-   **API Client**: A centralized Axios instance (`src/lib/api.ts`) handles base URLs and intercepts requests to attach the `Authorization: Bearer <token>` header automatically.
-   **Image Handling**: Frontend uses Next.js `<Image/>` optimization; Backend provides remote URLs (Unsplash).
-   **CORS**: Configured to allow requests from the frontend origin.

---

## ⚠️ Known Limitations & Weak Points

1.  **Token Storage**: Currently storing JWT in `userId` is vulnerable to XSS. *Production improvement: Use HttpOnly Cookies.*
2.  **State Management**: Using simple React Context. *Production improvement: React Query or Zustand for better cache management.*
3.  **Hardcoded Verification**: Verification depends on email domain. *Production improvement: Integration with LinkedIn API or work email verification service.*

---

## 📈 Improvements Required for Production Readiness

1.  **Database**: Implement Redis caching for the "Deals" listing to reduce DB load.
2.  **Testing**: Add Unit Tests (Jest/Supertest) for the backend and E2E tests (Cypress/Playwright) for the frontend.
3.  **Security**: Implement Refresh Tokens for better session management.
4.  **Logging**: Replace `console.log` with a structured logger like Winston/Pino.

---

## 🎨 UI & Performance Considerations

-   **Animations**: Used `framer-motion` for hardware-accelerated animations (transform/opacity) to ensure 60fps performance.
-   **LCP (Largest Contentful Paint)**: Images use Next.js `priority` attribute where applicable.
-   **CLS (Cumulative Layout Shift)**: Skeleton loaders and fixed-height cards prevent layout shifts during data fetching.

---

## 🏃‍♂️ Getting Started

### 1. Backend
```bash
cd backend
npm install
# Create a .env file with:
# NODE_ENV=development
# PORT=8000
# MONGO_URI=mongodb://localhost:27017/startup-benefits
# JWT_SECRET=your_super_secret_key

npm run seed  # Populates data
npm run dev   # Runs on port 8000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev   # Runs on port 3000
```
