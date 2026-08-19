
# 📸 Mini-Instagram

A lightweight, high-performance, full-stack social media web application. Built with a decoupled architecture featuring a robust Node.js/Express REST API and a highly responsive React 19 frontend styled with Tailwind CSS v4.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-emerald)](https://nodejs.org)
[![React Version](https://img.shields.io/badge/react-v19.0-blue)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/tailwind-v4.0-38bdf8)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/vite-v8.0-646cff)](https://vite.dev)

---

## 📖 Table of Contents

1. [Overview](#-overview)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Architecture](#-architecture)
5. [Getting Started](#-getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Configuration](#configuration)
6. [Usage & Development](#-usage--development)
7. [API Documentation](#-api-documentation)
8. [Deployment](#-deployment)
9. [Troubleshooting](#-troubleshooting)
10. [Roadmap](#-roadmap)
11. [License & Credits](#-license--credits)

---

## 🔍 Overview

**Mini-Instagram** is a modern social media platform designed to replicate core Instagram features while introducing a comprehensive administrative control panel. The system is engineered with a strict separation of concerns:

*   **Backend**: A secure Express.js server utilizing MongoDB for data persistence, JWT and HttpOnly cookies for session management, and ImageKit for cloud-based image hosting and optimization.
*   **Frontend**: A single-page application (SPA) built on React 19 and Vite, leveraging Tailwind CSS v4 for a dark-themed, mobile-first user interface.

### Key Value Propositions
*   **Dual-Portal Architecture**: Separate, secure dashboards for standard users and platform administrators.
*   **Optimized Media Delivery**: Direct integration with ImageKit CDN for real-time image resizing, optimization, and fast delivery.
*   **Robust Authentication**: Hybrid authentication mechanism supporting both HttpOnly cookies and Bearer tokens to prevent XSS and CSRF attacks.

---

## ✨ Features

### 👤 User Capabilities
*   **Secure Authentication**: Signup and Signin with password hashing (bcrypt) and email verification capabilities (Nodemailer + Mailgen).
*   **Dynamic Feed & Profiles**: Personalized profile pages, user search, and public profile views.
*   **Post Creation**: Multi-part form uploads supporting image files via Multer, processed and stored securely in ImageKit.
*   **Interactive Navigation**: Persistent, responsive sidebar navigation for seamless transitions between Feed, Search, Post Creation, Profile, and Chat.
*   **Real-Time Chat**: Instant messaging interface powered by Socket.io, featuring a dedicated chat UI with a user sidebar, active chat window, real-time socket middleware integration, and persistent chat user lists saved in local storage.
*   **Interactive 404 Fallback**: A custom, visually engaging "Not Found" page featuring programmatically drawn canvas animations (astronaut visor and floating cord), interactive stars, and quick navigation fallbacks to direct lost users back to safety.

### 🛡️ Administrative Capabilities
*   **Admin Authentication**: Dedicated administrative login gateway.
*   **System Overview**: High-level dashboard displaying platform analytics and user statistics.
*   **User Management**: Complete directory of registered users with search, profile inspection, and moderation capabilities.

---
## 🛠️ Tech Stack

### Frontend
*   **Core Library**: React 19.2 (Concurrent rendering, optimized hooks)
*   **Build Tool**: Vite 8.0 (Lightning-fast HMR)
*   **Routing**: React Router Dom 7.11 (Declarative routing with layout nesting)
*   **Styling**: Tailwind CSS v4.3 + `@tailwindcss/vite` (Utility-first, zero-runtime CSS)
*   **HTTP Client**: Axios 1.19 (Promise-based requests with interceptors)
*   **Real-time Communication**: Socket.io-client 4.8 (Bi-directional event-based communication)

### Backend
*   **Runtime**: Node.js (ES Modules enabled)
*   **Framework**: Express 5.2 (Next-generation routing and middleware support)
*   **Database**: MongoDB via Mongoose 9.7 (ODM with schema validation)
*   **Authentication**: JSON Web Token (JWT) 9.0 & Cookie-Parser 1.4
*   **File Handling**: Multer 2.2 (Memory-storage buffer processing)
*   **Cloud Storage**: ImageKit SDK 6.0 (Image upload and CDN delivery)
*   **Emailing**: Nodemailer 9.0 & Mailgen 2.0 (Transactional emails)
*   **Real-time Server**: Socket.io 4.8 (Websocket server integration)

---
## 📐 Architecture

### High-Level System Flow

```
┌──────────────┐       HTTPS       ┌──────────────┐      Mongoose      ┌──────────────┐
│  React SPA   │ <───────────────> │ Express API  │ <────────────────> │ MongoDB Atlas│
│ (Vite/Tail)  │  JSON / Cookies   │   (Node.js)  │                    └──────────────┘
└──────────────┘                   └──────┬───────┘
                                          │
                                          │ ImageKit SDK
                                          ▼
                                   ┌──────────────┐
                                   │ ImageKit CDN │ (Image Storage)
                                   └──────────────┘
```

### Directory Structure

```
Mini-Instagram/
├── Backend/
│   ├── server.js                 # Application entry point
│   ├── package.json              # Backend dependencies & scripts
│   └── src/
│       ├── app.js                # Express app configuration & middleware
│       ├── controllers/          # Request handlers (Auth, Post, Admin)
│       ├── db/                   # Database connection configuration
│       ├── middlewares/          # Auth guards, validation interceptors
│       ├── models/               # Mongoose Schemas (User, Post)
│       ├── routes/               # Express API route definitions
│       ├── services/             # Business logic & third-party integrations
│       ├── utils/                # Helper functions (API response formatters)
│       └── validates/            # Request payload validation schemas
└── frontend/
    ├── index.html                # SPA Entry HTML
    ├── vite.config.js            # Vite configuration with Tailwind v4 plugin
    ├── package.json              # Frontend dependencies & scripts
    └── src/
        ├── main.jsx              # React DOM mounting
        ├── App.jsx               # Application Router & Layouts
        ├── index.css             # Tailwind directives
        ├── assets/               # Static assets & icons
        └── components/           # UI Components
            ├── AdminDashboard/   # Admin views, sidebars, and user management
            ├── Dashboard/        # User feed, profile, creation, and search
            └── authentication/   # Login, Signup, and Route Guards
```

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed on your local machine:
*   **Node.js** (v18.0.0 or higher)
*   **npm** (v9.0.0 or higher)
*   **MongoDB** (Local instance or MongoDB Atlas URI)

---

### Installation

1.  **Clone the Repository**:
    bash
    git clone https://github.com/Nikhilqwert04/Mini-Instagram.git
    cd Mini-Instagram
    

2.  **Install Backend Dependencies**:
    bash
    cd Backend
    npm install
    

3.  **Install Frontend Dependencies**:
    bash
    cd ../frontend
    npm install
    

---

### Configuration

#### Backend Configuration
Create a `.env` file in the `/Backend` directory:

env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mini-instagram?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
ACCESS_TOKEN_EXPIRY=1d
CORS_ORIGIN=https://mini-instagram-eight.vercel.app,https://another-allowed-origin.com
FRONTEND_URL=http://localhost:5173


> 💡 **Note on CORS_ORIGIN**: You can provide a comma-separated list of allowed origins. The backend dynamically parses, trims trailing slashes, and appends them to the default allowed origins (`http://localhost:5173` and `https://mini-instagram-kqlz.onrender.com`).

#### Frontend Configuration
Create a `.env` file in the `/frontend` directory:

env
VITE_API_BASE_URL=http://localhost:3000


> 🔑 **Authentication Note**: The application uses cross-origin cookie authentication. Axios is configured globally with `withCredentials = true` to automatically send session cookies with every request.

> 💬 **Socket.io Connection**: The real-time chat feature connects to the Socket.io server dynamically using the `VITE_API_BASE_URL` environment variable (defaulting to `http://localhost:3000`) with `withCredentials: true` enabled.
# ImageKit Credentials
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint_id

# SMTP Configuration (Nodemailer)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_FROM_EMAIL=noreply@miniinstagram.com
```

#### Frontend Configuration
Create a `.env` file in the `/frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## 💻 Usage & Development

### Running the Backend Server
From the `/Backend` directory:
bash
npm run dev


### Running the Frontend Client
From the `/frontend` directory:
bash
npm run dev


### Real-time Chat
* The application includes a real-time chat component powered by Socket.io, which utilizes custom socket middleware on the backend and connects dynamically to the backend server (via `VITE_API_BASE_URL` or `http://localhost:3000`) with `withCredentials: true` to handle secure instant messaging.
* Active chat users are persisted locally using `localStorage`, ensuring that your recent conversations remain accessible even after closing or reloading the browser.
# Start the server

bash
npm run dev


*The server will start running on the port specified in your `.env` file (typically `http://localhost:5000`).*

### Running the Frontend Client
From the `/frontend` directory:
bash
npm run dev

# Start the Vite development server
npm run dev
```
*The client will be accessible at `http://localhost:5173`.*

---

## 🔌 API Documentation

The backend exposes a RESTful API under the `/api/v1` prefix.

### Authentication Endpoints (`/api/v1/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/signup` | Register a new user | No |
| `POST` | `/signin` | Authenticate user & issue tokens | No |
| `GET` | `/current-user` | Retrieve authenticated user profile | Yes (JWT/Cookie) |
| `POST` | `/logout` | Clear authentication cookies | Yes |

### Post Endpoints (`/api/v1/post`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/create` | Create a new post (supports multipart image upload) | Yes |
| `GET` | `/feed` | Retrieve global feed | Yes |
| `GET` | `/my-posts` | Retrieve posts created by the current user | Yes |
| `DELETE` | `/:id` | Delete a specific post | Yes (Owner) |

### Admin Endpoints (`/api/v1/admin`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/overview` | Retrieve platform metrics & user counts | Yes (Admin) |
| `GET` | `/users` | Retrieve list of all registered users | Yes (Admin) |
| `DELETE` | `/user/:id` | Suspend/Delete a user account | Yes (Admin) |

---

### Sample Request/Response

#### 1. User Verification (`GET /api/v1/auth/current-user`)

**Headers**:
```http
Authorization: Bearer <your_jwt_token>
```

**Response (200 OK)**:
```json
{
  "success": true,
  "user": {
    "id": "65cb48f1e92a8b34c8a12345",
    "username": "johndoe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "avatar": "https://ik.imagekit.io/mini-insta/avatars/john.jpg",
    "role": "user"
  }
}
```

#### 2. Create Post (`POST /api/v1/post/create`)

**Payload (Multipart Form Data)**:
*   `caption`: "Chasing sunsets in California 🌅"
*   `image`: `[File Binary]`

**Response (201 Created)**:
```json
{
  "success": true,
  "message": "Post created successfully",
  "post": {
    "id": "65cb49f2e92a8b34c8a67890",
    "caption": "Chasing sunsets in California 🌅",
    "imageUrl": "https://ik.imagekit.io/mini-insta/posts/sunset_abc123.jpg",
    "author": "65cb48f1e92a8b34c8a12345",
    "createdAt": "2025-02-15T08:30:00.000Z"
  }
}
```

---

## 🛡️ Security Implementations

### Cross-Origin Cookie Security & Shared CORS Configuration
To support secure cross-origin requests (CORS) and ensure session cookies and real-time WebSocket connections are transmitted safely, the application uses a consolidated CORS configuration shared between the Express app and Socket.io.

The backend dynamically parses allowed origins from the environment configuration, sanitizes trailing slashes, and registers them for both HTTP REST endpoints and WebSocket connections:

javascript
const allowedOrigins = [
  "http://localhost:5173",
  "https://mini-instagram-kqlz.onrender.com",
];

if (process.env.CORS_ORIGIN) {
  process.env.CORS_ORIGIN.split(",").forEach((origin) => {
    let trimmed = origin.trim();
    if (trimmed.endsWith("/")) {
      trimmed = trimmed.slice(0, -1);
    }
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);


Both authentication and administrative controllers issue HTTP-only, secure cookies with the `sameSite: "none"` attribute:

javascript
const option = {
  httpOnly: true,
  secure: true,
  sameSite: "none"
};


This configuration prevents Client-Side Scripting (XSS) access to tokens while allowing credentials to be sent securely across allowed origins for both HTTP REST endpoints and WebSocket connections.

### Protected Routes (Frontend)
The React application utilizes a robust `<ProtectedRoute />` wrapper that intercepts navigation requests, validates the session against the backend API, and handles graceful fallbacks.

jsx
// frontend/src/components/authentication/protectedRoute.jsx
const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

    axios
      .get("/api/v1/auth/current-user", {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((response) => {
        if (response.status === 200 || response.data?.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

## 📦 Deployment

### Production Build & Execution (Frontend)
To compile the React SPA into optimized, static assets:
bash
cd frontend
npm run build


The output will be generated in the `frontend/dist` directory. You can serve the production build locally or in production using the included `serve` script:
bash
npm start

This will serve the static files from the `dist` directory on the specified `$PORT` using the `serve` package.

For hosting on **Vercel**, a `vercel.json` configuration is included in the frontend directory to handle Single Page Application (SPA) routing by rewriting all requests to `index.html`:


{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}


### Production Execution (Backend)
1.  Set `NODE_ENV=production` in your environment variables.
2.  Use a process manager like **PM2** to keep the Node process alive:
    bash
    npm install pm2 -g
    pm2 start server.js --name "mini-instagram-api"
    

---
## ❓ Troubleshooting

### Common Issues

1.  **CORS Errors on Frontend API Calls**
    *   *Symptom*: Requests fail with "Cross-Origin Request Blocked".
    *   *Solution*: Ensure the `origin` array in `Backend/src/app.js` matches your frontend URL exactly.
    ```javascript
    cors({
      origin: "http://localhost:5173", // Must match your frontend port
      credentials: true
    })
    ```

2.  **Image Upload Failures**
    *   *Symptom*: `500 Internal Server Error` when creating a post.
    *   *Solution*: Verify your ImageKit credentials in `Backend/.env`. Ensure that the public key, private key, and URL endpoint are correct and contain no trailing slashes.

3.  **MongoDB Connection Failures**
    *   *Symptom*: Server crashes on startup with `MongoDB connection error`.
    *   *Solution*: Ensure your IP address is whitelisted in your MongoDB Atlas Network Security settings, and verify that the password in your connection string is URL-encoded if it contains special characters.

---

## 🗺️ Roadmap

- [ ] **Direct Messaging**: Real-time chat functionality using WebSockets (Socket.io).
- [ ] **Likes & Comments**: Interactive social features on posts.
- [ ] **Story Mode**: Temporary 24-hour posts with automated expiration.
- [ ] **Dark/Light Mode Toggle**: System-wide theme configuration.

---

## 📄 License & Credits

### License
Distributed under the **ISC License**. See `LICENSE` for more information.

### Credits
*   **Developer**: [Nikhil](https://github.com/Nikhilqwert04)
*   **Image Hosting**: [ImageKit.io](https://imagekit.io)
*   **UI Assets**: Icons sourced from [Heroicons](https://heroicons.com) and SVGs.