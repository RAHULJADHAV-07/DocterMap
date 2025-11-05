# 🏥 DoctorMap - Find Doctors Near You

A modern, full-stack web application that helps patients find and connect with doctors in Mumbai. Built with React, Node.js, Express, and MongoDB, featuring an interactive map powered by Leaflet.

![Doctor Map](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### For Patients
- 🔍 **Smart Doctor Search** - Search by name, specialization, or location
- 🗺️ **Interactive Map View** - View all 500+ doctors on a real Mumbai map with Leaflet
- 📍 **Location-Based Search** - Find doctors in your area using coordinates
- ⭐ **Ratings & Reviews** - See doctor ratings and experience
- 📅 **Appointment Management** - View and manage your appointments
- 🌙 **Dark Mode** - Eye-friendly dark theme support
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop

### For Doctors
- 👨‍⚕️ **Doctor Profile** - Manage your professional profile
- 📊 **Dashboard** - Track appointments and patient inquiries
- ✅ **Availability Status** - Toggle your availability in real-time
- 📍 **Location Management** - Update your clinic location

### Technical Features
- 🔐 **JWT Authentication** - Secure user authentication
- 🔒 **Password Encryption** - bcrypt password hashing
- 🎨 **Modern UI** - Built with Tailwind CSS
- 🚀 **Fast Performance** - Vite for lightning-fast development
- 📦 **RESTful API** - Clean and organized API structure
- 🗄️ **MongoDB Database** - Scalable NoSQL database

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Leaflet & React-Leaflet** - Interactive maps
- **Formik & Yup** - Form handling and validation
- **Lucide React** - Modern icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/RAHULJADHAV-07/DoctorMap.git
cd DoctorMap
\`\`\`

### 2. Backend Setup

\`\`\`bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the following and update with your values:
PORT=3001
MONGODB_URI=mongodb://localhost:27017/doctorapp
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development

# Seed the database with 500 doctors (optional)
node seedDoctors.js

# Start the backend server
npm run dev
\`\`\`

Backend will run on: **http://localhost:3001**

### 3. Frontend Setup

\`\`\`bash
# Open a new terminal
# Navigate to frontend directory
cd my-app

# Install dependencies
npm install --legacy-peer-deps

# Start the development server
npm run dev
\`\`\`

Frontend will run on: **http://localhost:5173**

## 🗄️ Database Seeding

The project includes a script to populate the database with 500 realistic doctor records:

\`\`\`bash
cd backend
node seedDoctors.js
\`\`\`

This will create doctors with:
- ✅ 50+ Mumbai locations (Andheri, Bandra, Borivali, etc.)
- ✅ 20 different specializations
- ✅ Realistic names, phone numbers, and emails
- ✅ Experience ranges (5-40 years)
- ✅ Consultation fees (₹500-₹5000)
- ✅ Ratings (3.5-5.0 stars)
- ✅ GPS coordinates for map display

**Default Password for seeded doctors:** `Doctor@123`

## 📁 Project Structure

\`\`\`
DoctorMap/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── doctorController.js   # Doctor CRUD operations
│   │   └── userController.js     # User authentication
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   └── User.js               # User & Doctor schema
│   ├── routes/
│   │   ├── doctorRoutes.js       # Doctor endpoints
│   │   └── userRoutes.js         # User endpoints
│   ├── utils/
│   │   └── generateToken.js      # JWT token generator
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server
│   ├── seedDoctors.js           # Database seeder
│   └── package.json
│
└── my-app/
    ├── public/
    ├── src/
    │   ├── assets/               # Images and static files
    │   ├── components/
    │   │   ├── DoctorCard.jsx    # Doctor card component
    │   │   ├── DoctorMap.jsx     # Leaflet map component
    │   │   ├── DoctorsMap.jsx    # Doctors list map
    │   │   └── Navbar.jsx        # Navigation bar
    │   ├── context/
    │   │   └── AuthContext.jsx   # Authentication context
    │   ├── pages/
    │   │   ├── Home.jsx          # Landing page
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Registration page
    │   │   ├── DashboardPatient.jsx
    │   │   ├── DashboardDoctor.jsx
    │   │   ├── About.jsx
    │   │   └── Contact.jsx
    │   ├── Validation/
    │   │   ├── LoginValidation.jsx
    │   │   └── RegisterValidation.jsx
    │   ├── api.js                # Axios instance
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # Entry point
    │   └── index.css             # Global styles
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
\`\`\`

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register new user | No |
| POST | `/api/users/login` | Login user | No |
| GET | `/api/users/profile` | Get user profile | Yes |
| GET | `/api/users` | Get all users | No |

### Doctors
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/doctors` | Get all doctors (with filters) | No |
| GET | `/api/doctors/:id` | Get doctor by ID | No |
| PUT | `/api/doctors/:id` | Update doctor profile | Yes (Doctor) |
| DELETE | `/api/doctors/:id` | Delete doctor | Yes (Doctor) |

### Query Parameters for GET `/api/doctors`
- `specialization` - Filter by specialization (e.g., "Cardiology")
- `location` - Filter by location (e.g., "Andheri")
- `available` - Filter by availability (true/false)

**Example:**
\`\`\`
GET /api/doctors?specialization=Cardiology&available=true
\`\`\`

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication:

1. **Register/Login** → Receive JWT token
2. **Token stored** in localStorage
3. **Include token** in Authorization header for protected routes:
   \`\`\`
   Authorization: Bearer <your_token_here>
   \`\`\`

## 🗺️ Map Features

The interactive map (powered by Leaflet) includes:
- 📍 **Custom Markers** - Green (available) and Red (busy) pins
- 🔍 **Zoom Controls** - Zoom in/out to explore areas
- 💬 **Info Popups** - Click markers to view doctor details
- 🎯 **Auto-Fit Bounds** - Automatically centers on all doctors
- 📊 **Statistics** - Live count of total, available, and busy doctors
- 🗺️ **OpenStreetMap** - Free and open-source map tiles

## 🎨 UI Features

- 🌓 **Dark Mode** - Toggle between light and dark themes
- 📱 **Fully Responsive** - Mobile-first design
- 🎭 **Smooth Animations** - Transitions and hover effects
- 🎨 **Modern Design** - Clean and intuitive interface
- ♿ **Accessible** - WCAG compliant

## 📸 Screenshots

*(Add screenshots of your application here)*

## 🧪 Testing

### Register a New Account
1. Go to http://localhost:5173
2. Click "Get Started" or "Sign Up"
3. Fill in the registration form
4. Choose role (Patient or Doctor)
5. Submit

### Login
1. Click "Sign In"
2. Enter email and password
3. Select your role
4. Click "Login"

### View Doctors on Map
1. Login as a patient
2. Go to Dashboard
3. Click "Map View"
4. Explore 500+ doctors on the Mumbai map!

## 🐛 Troubleshooting

### Backend won't start
- Ensure MongoDB is running: `mongod` or start MongoDB service
- Check if port 3001 is already in use
- Verify `.env` file exists with correct values

### Frontend won't start
- Delete `node_modules` and run `npm install --legacy-peer-deps` again
- Clear browser cache
- Check if port 5173 is available

### Map not displaying
- Check browser console for errors
- Ensure Leaflet CSS is loaded in `index.html`
- Verify doctors have valid `latitude` and `longitude` in database

### Doctors not appearing
- Check if backend is running on port 3001
- Verify MongoDB connection
- Run the seeder script: `node seedDoctors.js`
- Check browser network tab for API errors

## 🚀 Deployment

### Backend (Heroku/Render/Railway)
1. Set environment variables
2. Update MONGODB_URI with cloud MongoDB (e.g., MongoDB Atlas)
3. Deploy using Git

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Update API base URL in `api.js` to your backend URL

## 📝 Environment Variables

### Backend `.env`
\`\`\`env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/doctorapp
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rahul Jadhav**
- GitHub: [@RAHULJADHAV-07](https://github.com/RAHULJADHAV-07)
- Email: rahuljadhav0417@gmail.com

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Leaflet](https://leafletjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Email: rahuljadhav0417@gmail.com

---

⭐ **Star this repo if you found it helpful!**

Made with ❤️ by Rahul Jadhav
#   D o c t e r M a p  
 