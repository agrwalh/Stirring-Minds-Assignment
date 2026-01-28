# Startup Benefits Platform - Backend

## Overview
This is the backend service for the Startup Benefits Platform, allowing startup founders to access exclusive deals on SaaS products.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript (CommonJS)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)

## Setup & Installation

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the `backend` root:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/startup-benefits
   JWT_SECRET=your_super_secret_key
   ```

3. **Run Seeder (Optional)**
   Populates the database with sample deals.
   ```bash
   npm run seed
   # To destroy data:
   # npm run seed:destroy
   ```

4. **Start Server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user (Auto-verifies users with `@startup.com` emails)
- `POST /api/v1/auth/login` - Login user

### Deals
- `GET /api/v1/deals` - Get all deals (Supports `?pageNumber=X`, `?keyword=X`, `?category=X`, `?isLocked=true/false`)
- `GET /api/v1/deals/:id` - Get single deal details

### Claims
- `POST /api/v1/claims` - Claim a deal (Requires Auth, Checks Eligibility)
- `GET /api/v1/claims` - Get user's claimed deals

## Business Logic
- **Verification**: Users with emails ending in `@startup.com` or `@innovate.io` are automatically marked as "Verified".
- **Locked Deals**: Only "Verified" users can claim deals where `isLocked` is true.
