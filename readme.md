# 📚 NoteHub – A Full Stack Notes Sharing Platform

**NoteHub** is a full-stack web application designed to let students upload, share, and explore study notes across various subjects and semesters. Built with modern web technologies, it supports seamless sharing, credit-based downloading, and a student-friendly experience.

---

## 🚀 Features

### 👤 Authentication
- Sign Up & Login
- Password recovery (Email OTP – upcoming)
- Secure token/session-based login

### 📝 Notes Management
- Upload notes (PDFs, images, DOCs, etc.)
- Add titles, descriptions, tags, and subject categories
- Browse and view notes uploaded by others

### 🎯 Points & Credit System
- Earn points for uploading notes
- Spend credits to access/download notes
- Leaderboard & motivation to contribute more

### 🔍 Smart Search & Filter
- Keyword-based note search
- Filters by subject, semester, tags, uploader

### 📊 User Dashboard
- Profile view with stats
- Uploaded/downloaded notes list
- Points & activity summary

### 🌙 UI Themes (Coming Soon)
- Light/Dark mode toggle

---

## 🛠 Tech Stack

### Frontend:
- HTML5, CSS3, JavaScript (Vanilla)
- Responsive design (mobile + desktop)

### Backend:
- Node.js, Express.js
- RESTful API architecture

### Database:
- MongoDB (Mongoose ORM)

### Others:
- Cloudinary (for note/image storage)
- Nodemailer (for email OTPs)
- Git & GitHub (version control)

---

## 📁 Folder Structure

<pre> 
NoteHub/
│
├── client/
│ ├── public/
│ │ └── assets/ # Static assets (images, icons, etc.)
│ └── src/
│ ├── pages/ # All frontend pages (Home, Upload, etc.)
│ ├── scripts/ # JavaScript logic
│ ├── styles/ # CSS styling files
│ ├── .gitkeep # Keeps empty styles folder in Git
│ └── index.html # Main frontend HTML
│
├── server/
│ ├── public/ # Public files served by backend (if any)
│ └── src/
│ ├── controllers/ # Route logic (e.g., notes, users)
│ ├── db/ # MongoDB connection setup
│ ├── middlewares/ # Auth, error handler, etc.
│ ├── models/ # Mongoose schemas
│ ├── routers/ # Express route handlers
│ ├── utils/ # Reusable server-side utilities
│ ├── app.js # Main backend entry
│ ├── constaint.js # Constants (if used)
│ └── index.js # Server boot entry (e.g., connect DB & start server)
│
├── .env # Environment config
├── README.md # Project documentation
└── package.json # Project metadata & dependencies


</pre>