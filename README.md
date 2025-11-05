
# DoctorMap - Setup Guide

DoctorMap is a full-stack web application that helps patients find and connect with doctors in Mumbai.

---

## Project Links

**Live Frontend:** https://doctormap.netlify.app/  
**Backend API:** https://doctormap-backend.onrender.com/  
**GitHub Repository:** https://github.com/RAHULJADHAV-07/DocterMap

---

## Requirements

- Node.js (v16 or higher)  
- MongoDB (local or MongoDB Atlas)  
- Git

---

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/RAHULJADHAV-07/DocterMap.git
cd DoctorMap
````

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a file named `.env` inside the backend folder and add:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/doctorapp
JWT_SECRET=your_secret_key
NODE_ENV=development
```

(Optional) To add sample doctor data:

```bash
node seedDoctors.js
```

Start the backend:

```bash
npm run dev
```

Backend will run at: **[http://localhost:3001](http://localhost:3001)**

---

### 3. Frontend Setup

```bash
cd my-app
npm install --legacy-peer-deps
```

Create a file named `.env` inside the my-app folder and add:

```env
VITE_API_URL=http://localhost:3001
```

Start the frontend:

```bash
npm run dev
```

Frontend will run at: **[http://localhost:5173](http://localhost:5173)**

---

## Demo Accounts

**Patient Account:**
Email: [demo@patient.com](mailto:demo@patient.com)
Password: Demo@123

**Doctor Account:**
Email: [demo@doctor.com](mailto:demo@doctor.com)
Password: Demo@123

---

## Author

**Rahul Jadhav**
Email: [rahuljadhav0417@gmail.com](mailto:rahuljadhav0417@gmail.com)
GitHub: [https://github.com/RAHULJADHAV-07](https://github.com/RAHULJADHAV-07)

```


