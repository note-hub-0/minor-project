# 📚 NoteHub – A Full Stack Notes Sharing Platform

**NoteHub** is a powerful and user-friendly platform built for students to share and access educational notes. The project encourages collaborative learning and makes study materials more accessible and organized.

---

## 🚀 Features

### 👤 Authentication
- User Sign Up & Login
- Password recovery (via email OTP – planned)
- Session/token-based login security

### 📝 Notes Management
- Upload notes (PDFs, images, docs, etc.)
- Add descriptions, tags, and subject categories
- Browse and view notes from all users

### 📊 Points and Credits System
- Earn points for uploading notes
- Use credits to download premium notes
- Encourage quality contributions

### 🔍 Search and Filters
- Keyword-based search
- Filter notes by subject, semester, uploader, or tags

### 📈 Dashboard
- User profile with uploaded/downloaded notes
- Contribution stats and earned points

### 🌙 Theme Support (Planned)
- Toggle between light and dark modes

---

## 🛠️ Tech Stack

### Frontend:
- HTML5, CSS3, JavaScript (Vanilla or can integrate with React in future)
- Responsive UI (Mobile + Desktop)

### Backend:
- Node.js + Express.js
- REST API-based architecture

### Database:
- MongoDB (with Mongoose ORM)

### Other Tools:
- Cloudinary for file/image storage (optional)
- Nodemailer for OTP & email services
- Git for version control

---

## 📁 Folder Structure

NoteHub/
│
├── public/ # Static assets (logo, icons, etc.)
├── index.js # Main frontend JS entry
├── src/
│ ├── Pages/ # All frontend pages (Home, Upload, Profile, etc.)
│ ├── Styles/ # CSS files
│ ├── Scripts/ # JS logic (frontend only)
│ ├── Utils/ # Reusable utilities
│ ├── script.js
│ └── style.css
│
├── backend/
│ ├── controllers/ # API logic (noteController, userController, etc.)
│ ├── routes/ # All backend API routes
│ ├── models/ # MongoDB schema files
│ ├── middlewares/ # Auth, error handling
│ └── server.js # Entry point
│

├── package.json
└── README.md