# Doctor App Backend

Node.js + Express + MongoDB backend for Doctor App.

## Features

- User authentication (JWT)
- Password hashing with bcrypt
- Separate routes for patients and doctors
- MongoDB database integration
- Input validation
- Error handling
- CORS enabled

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/doctorapp
JWT_SECRET=your_secret_key
NODE_ENV=development
```

3. Make sure MongoDB is running on your machine

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (Protected)
- `GET /api/users` - Get all users

### Doctors
- `GET /api/doctors` - Get all doctors (with filters)
- `GET /api/doctors/:id` - Get doctor by ID
- `PUT /api/doctors/:id` - Update doctor (Protected)
- `DELETE /api/doctors/:id` - Delete doctor (Protected)

## Query Parameters for GET /api/doctors

- `specialization` - Filter by specialization
- `location` - Filter by location
- `available` - Filter by availability (true/false)
