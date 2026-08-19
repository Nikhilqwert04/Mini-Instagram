
# 📸 Mini-Instagram

A lightweight, full-stack social media platform with a decoupled architecture combining a Node.js/Express backend with a React 19 frontend. Features include secure authentication, real-time chat, and cloud-based image hosting.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/node-%3E%3D%2018.0.0-emerald)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-v19.0-blue)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/tailwind-v4.0-38bdf8)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/vite-v8.0-646cff)](https://vite.dev)

---

## 📖 Table of Contents

1. [Overview](#-overview)  
2. [Features](#-features)  
3. [Tech Stack](#-tech-stack)  
4. [Getting Started](#-getting-started)  
5. [Usage](#-usage)  
6. [API Endpoints](#-api-endpoints)  
7. [Security](#-security)  
8. [Deployment](#-deployment)  
9. [Troubleshooting](#-troubleshooting)  
10. [License](#-license)

---

## 🔍 Overview

Mini-Instagram is a social media platform with:
- **Dual-portal architecture**: Separate user and admin interfaces
- **Optimized media delivery**: ImageKit CDN integration for real-time image processing
- **Secure authentication**: JWT + HttpOnly cookies with XSS/CSRF protection

**Architecture Diagram**:
```
React SPA (Vite/Tailwind) ↔ Express API (Node.js) ↔ MongoDB
                             ↘ ImageKit CDN ↗
```

---

## ✨ Features

### 👤 User Features
- **Secure Authentication**: Signup, signin, and secure token management (`accessToken`, `adminToken`).
- **Dynamic Feed & Profiles**: Custom user profiles, banners, and post counts.
- **Post Creation**: Drag-and-drop image uploader with captioning and visibility controls (Public/Private).
- **Real-Time Chat**: Socket.io-powered messaging with a responsive layout that toggles between chat list and active conversation on mobile.
- **Responsive Dark-Themed UI**: Fully optimized for desktop, tablet, and mobile devices with dedicated top headers and bottom navigation bars.

### 🛡️ Admin Features
- **Admin Authentication Portal**: Dedicated secure login for platform administrators.
- **User Management Dashboard**: 
  - Search users dynamically by username or full name.
  - Moderate accounts with real-time block/unblock actions.
  - View user post counts and profile details.
  - Responsive card-based list view for mobile and structured table view for desktop.
- **Platform Analytics Overview**: High-level insights and statistics.

---
## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19 + Vite, Tailwind CSS, React Router, Axios, Socket.io |
| **Backend** | Node.js, Express, MongoDB (Mongoose), ImageKit, Nodemailer |
| **Security** | JWT, HttpOnly cookies, CORS, Socket.io middleware |
| **Build Tools** | Vite, PM2 (production), Webpack (dev) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- ImageKit account
- SMTP credentials for email verification

### Installation
```bash
git clone https://github.com/Nikhilqwert04/Mini-Instagram.git
cd Mini-Instagram

# Backend
cd Backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```

**Access at**:
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000/api/v1](http://localhost:3000/api/v1)

---

## 💻 Usage

### Start Development

#### 1. Run the Backend Server
bash
cd Backend
npm install
npm run dev


#### 2. Run the Frontend App
bash
cd frontend
npm install
npm run dev


---
# Backend
cd Backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```

**Access at**:
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000/api/v1](http://localhost:3000/api/v1)

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/auth/signup` | User registration |
| POST   | `/auth/signin` | User login |
| GET    | `/auth/current-user` | Get authenticated user |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/post/create` | Create post with image |
| GET    | `/post/feed` | Get user feed |
| DELETE | `/post/:id` | Delete post |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/admin/overview` | Platform analytics |
| GET    | `/admin/users` | List all users |
| DELETE | `/admin/user/:id` | Delete user |

---

## 🔐 Security

- **Authentication**: JWT + HttpOnly cookies with `SameSite=None; Secure`
- **CORS**: Configurable origins with credentials support
- **Socket.io**: Secure WebSocket connections with middleware
- **Validation**: Request validation via Joi schemas
- **Email Verification**: Nodemailer + Mailgen for transactional emails

---

## 📦 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect to Vercel
3. Use provided `vercel.json` for SPA routing

### Backend (Render/Heroku)
1. Set environment variables (such as `CORS_ORIGIN` to configure allowed origins; `https://insta.nikhilverse.pro` and `http://localhost:5173` are allowed by default)
2. Deploy with PM2:
bash
npm install pm2 -g
pm2 start server.js --no-daemon

## ❓ Troubleshooting

**Common Issues**:
- **CORS Errors**: Ensure `CORS_ORIGIN` matches frontend URL
- **Image Upload Failures**: Verify ImageKit credentials
- **MongoDB Connection**: Check IP whitelisting and URL encoding

---

## 🗺️ Roadmap

- [ ] Direct messaging enhancements
- [ ] Post likes/comments
- [ ] 24-hour story mode
- [ ] Theme toggle (dark/light)

---

## 📄 License & Credits

Licensed under [ISC License](LICENSE).

**Credits**:
- Developer: [Nikhil](https://github.com/Nikhilqwert04)
- Image Hosting: [ImageKit.io](https://imagekit.io)
- UI Assets: [Heroicons](https://heroicons.com)