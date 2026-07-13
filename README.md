# AI-Powered Food App 🍔🤖

Welcome to the **AI-Powered Food App**, a modern, full-stack food ordering and delivery application enhanced with artificial intelligence capabilities. This application offers a seamless user experience for ordering food, while providing admins with robust catalog management, order processing tools, and AI-driven insights for restaurants and menus.

---

## 🌟 Key Features

### 👤 User Features
- **Authentication**: Secure Signup, Login, and Logout flows powered by JWT (JSON Web Tokens) with profile picture uploading managed by Cloudinary.
- **Restaurant Browsing**: View available restaurants with filtering (e.g., Pure Veg) and sorting (by average ratings or review volume).
- **Interactive Menus**: Browse restaurant menu categories, add items to the cart, update quantities, and track cart status in real-time.
- **Stripe Payment Gateway**: Seamless payment checkout using Stripe's hosted checkout sessions.
- **Order Tracking**: Detailed order history for users to check order status, delivery information, paid totals, and item details.
- **Reviews & AI summaries**: Read restaurant reviews and load an AI-generated summary of customer sentiments on-demand.

### 🛡️ Admin Features
- **Restaurant Management**: Add new restaurants (with address, coordinates, and images) and delete existing ones.
- **Menu Management**: Add categories and upload new dishes directly to the store menu.
- **Order Dashboard**: A system-wide "All Orders" management panel displaying all processing and completed customer orders.
- **Order Status Updates**: Update order states from "Processing" to "Delivered" via the order details panel.

### 🤖 AI Capabilities (Groq LLM Integration)
1. **AI Description & Metadata Generator**:
   - Automatically generates appetizing dish descriptions, allergen lists, serving recommendations, and tag categorizations based only on the dish name and price.
2. **AI Reviews Sentiment Analyzer**:
   - Aggregates all customer reviews in real-time, outputs a collective sentiment rating (positive/negative/mixed), summarizes key takeaways into bullets, and extracts top hashtag mentions on-demand.

---

## 🛠️ Technology Stack

### Backend
- **Node.js** & **Express** (API framework)
- **MongoDB** & **Mongoose** (Database & ODM)
- **Stripe SDK** (Payment processing)
- **Cloudinary SDK** (Image hosting)
- **Groq SDK** (AI processing via `llama-3.1-8b-instant`)
- **Nodemailer** (Email notification system)
- **Pug** (HTML email templating engine)

### Frontend
- **React.js** & **Vite** (Build tool & UI library)
- **Redux Toolkit** (Centralized state management)
- **React Router DOM** (Client-side routing)
- **React Toastify** (Dynamic toast notifications)
- **Bootstrap** & **FontAwesome** (Layout & styling)

---

## 📂 Project Structure

```
├── backend/
│   ├── config/              # Database connection and environment config files
│   ├── controllers/         # Request handling logic (Auth, AI, Cart, Order, Stores)
│   ├── data/                # Seed/mock data
│   ├── middlewares/         # Express middlewares (Errors, Auth checks)
│   ├── models/              # Mongoose schemas (User, Store, Order, Cart)
│   ├── routes/              # Express API endpoints
│   ├── services/            # AI generation and external integration services
│   ├── utils/               # Utility classes (APIFeatures, email sender, token helpers)
│   ├── view/                # Pug email templates
│   ├── server.js            # Node backend Entry Point
│   └── app.js               # Express application initialization
│
├── frontend/
│   ├── public/              # Static assets (images, logos)
│   ├── src/
│   │   ├── assets/          # Static media assets
│   │   ├── components/      # UI components (Home, Cart, Menu, User, Layout)
│   │   ├── redux/           # Redux Toolkit store, slices, and action creators
│   │   ├── utils/           # Centralized API setup and configurations
│   │   ├── App.jsx          # React app routes and layouts
│   │   └── main.jsx         # React application entry point
│   ├── index.html           # Main SPA HTML file
│   └── vite.config.js       # Vite build configurations and proxy targets
│
└── .gitignore               # Root git ignore settings
```

---

## ⚙️ Environment Configurations

### Backend Setup (`backend/config/config.env`)
Create a `config.env` file under `backend/config/` with the following variables:

```ini
PORT=8080
MODE=DEVELOPMENT
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_signing_secret
JWT_EXPIRES=90d
JWT_EXPIRE=90d
JWT_EXPIRES_TIME=90

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_private_key
STRIPE_API_KEY=your_stripe_public_key

EMAIL_USERNAME=smtp_username
EMAIL_PASSWORD=smtp_password
EMAIL_HOST=smtp_host
EMAIL_PORT=smtp_port
EMAIL_FROM=noreply@foodapp.com

GROQ_API_KEY=your_groq_api_key
```

---

## 🚀 Running the App Locally

### Prerequisites
- Install [Node.js](https://nodejs.org/) (v18 or higher recommended).
- Set up a MongoDB cluster (Atlas or Local).
- Obtain API keys for Stripe, Cloudinary, and Groq.

### 1. Start the Backend Server
```bash
cd backend
npm install
npm run dev     # Starts the server in development mode with nodemon/watch
```
The server will start on port `8080`.

### 2. Start the Frontend Dev Server
```bash
cd ../frontend
npm install     # or bun install
npm run dev     # Starts Vite development server
```
The Vite client will launch on `http://localhost:5173`. All backend calls starting with `/api` are automatically proxied to the backend at `http://localhost:8080`.

---

## 📦 Ready for Deployment

This repository is optimized for deployment to cloud hosting providers (like Render, Heroku, or Vercel):
- **Relative APIs**: The frontend's API client uses relative base paths (`/api`), which proxy locally in development and automatically point to the production host domain in production.
- **Git Safety**: The root `.gitignore` is pre-configured to ignore all local packages, builds, and credential keys, keeping your secrets safe from public git hubs.
