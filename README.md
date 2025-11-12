# Vue Todo List - Full Stack Application

A modern full-stack Todo List application built with Vue 3, Pinia, Tailwind CSS on the frontend and Laravel 12 with PostgreSQL on the backend. Features JWT authentication, real-time task management, and filtering capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Postman Testing](#postman-testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Frontend (Vue 3)
- ✅ User authentication (Register, Login, Logout)
- ✅ Create, Read, Update, Delete tasks
- ✅ Filter tasks by status (pending, in_progress, completed, cancelled)
- ✅ Filter tasks by priority (low, medium, high, urgent)
- ✅ Responsive UI with Tailwind CSS
- ✅ State management with Pinia
- ✅ JWT token storage and management
- ✅ Real-time data sync with backend

### Backend (Laravel 12)
- ✅ JWT authentication with tymon/jwt-auth
- ✅ RESTful API endpoints
- ✅ PostgreSQL database
- ✅ CORS enabled for frontend communication
- ✅ Request validation and error handling
- ✅ User-specific task management
- ✅ Comprehensive error responses

---

## 🛠 Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Pinia** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Vue Router** - Routing

### Backend
- **Laravel 12** - PHP web framework
- **PostgreSQL** - Database
- **JWT Auth** - JSON Web Token authentication
- **Composer** - PHP dependency manager

### Development Tools
- **Postman** - API testing
- **Git** - Version control
- **npm** - Node package manager

---

## 📁 Project Structure

```
Vue-todoList-test/
├── Vue-test/                          # Frontend (Vue 3)
│   ├── src/
│   │   ├── components/               # Reusable Vue components
│   │   ├── pages/                    # Page components
│   │   ├── stores/                   # Pinia state management
│   │   ├── services/                 # API services
│   │   │   ├── api.js               # Axios instance
│   │   │   ├── authService.js       # Auth API calls
│   │   │   └── taskService.js       # Task API calls
│   │   ├── App.vue                   # Root component
│   │   └── main.js                   # Entry point
│   ├── public/                        # Static assets
│   ├── .env                          # Environment variables
│   ├── package.json                  # Dependencies
│   └── vite.config.js                # Vite configuration
│
└── backend/                           # Backend (Laravel 12)
    ├── app/
    │   ├── Http/
    │   │   └── Controllers/
    │   │       ├── AuthController.php
    │   │       └── TaskController.php
    │   ├── Models/
    │   │   ├── User.php
    │   │   └── Task.php
    │   └── Providers/
    ├── bootstrap/
    │   └── app.php                   # Main application bootstrap
    ├── config/
    │   ├── auth.php                  # Auth configuration
    │   └── cors.php                  # CORS configuration
    ├── database/
    │   ├── migrations/               # Database migrations
    │   └── seeders/                  # Database seeders
    ├── routes/
    │   ├── api.php                   # API routes
    │   └── web.php                   # Web routes
    ├── storage/
    ├── .env                          # Environment variables
    ├── composer.json                 # PHP dependencies
    └── artisan                       # Laravel CLI

```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18+) and npm
- **PHP** (8.2+)
- **Composer** (latest)
- **PostgreSQL** (12+)
- **Git**
- **Postman** (optional, for API testing)

---

## 🚀 Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Vue-todoList-test.git
cd Vue-todoList-test/backend
```

### 2. Install Dependencies

```bash
composer install
```

### 3. Create Environment File

```bash
cp .env.example .env
```

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Generate JWT Secret

```bash
php artisan jwt:secret
```

### 6. Configure Database

Edit `.env` file:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=todo_app
DB_USERNAME=todo_user
DB_PASSWORD=your_secure_password
```

### 7. Create PostgreSQL Database & User

```bash
sudo -u postgres psql

# In PostgreSQL:
CREATE USER todo_user WITH ENCRYPTED PASSWORD 'your_secure_password';
CREATE DATABASE todo_app OWNER todo_user;

\c todo_app

GRANT ALL ON SCHEMA public TO todo_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO todo_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO todo_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO todo_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO todo_user;

\q
```

### 8. Run Migrations

```bash
php artisan migrate
```

### 9. Start Backend Server

```bash
php artisan serve
```

Backend will run on `http://localhost:8000`

---

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd ../Vue-test
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

```bash
cp .env.example .env
```

Or create `.env`:

```env
VITE_API_URL=http://localhost:8000
VITE_PUSHER_APP_KEY=your_key
VITE_PUSHER_APP_CLUSTER=mt1
```

### 4. Start Development Server

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (.env)

```env
APP_NAME="Todo List API"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=todo_app
DB_USERNAME=todo_user
DB_PASSWORD=your_password

JWT_ALGORITHM=HS256
JWT_SECRET=your_jwt_secret_key

CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
VITE_PUSHER_APP_KEY=your_pusher_key
VITE_PUSHER_APP_CLUSTER=mt1
```

---

## ▶️ Running the Application

### Start Both Servers

**Terminal 1 - Backend:**

```bash
cd backend
php artisan serve
```

**Terminal 2 - Frontend:**

```bash
cd Vue-test
npm run dev
```

Then open your browser and navigate to: **`http://localhost:5173`**

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
- **Endpoint:** `POST /api/auth/register`
- **Headers:**
  ```
  Content-Type: application/json
  Accept: application/json
  ```
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St",
    "password": "password123",
    "password_confirmation": "password123"
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "message": "User registered successfully",
    "user": { /* user object */ },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "token_type": "bearer"
  }
  ```

#### Login User
- **Endpoint:** `POST /api/auth/login`
- **Headers:**
  ```
  Content-Type: application/json
  Accept: application/json
  ```
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** `200 OK`
  ```json
  {
    "message": "Logged in successfully",
    "user": { /* user object */ },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "token_type": "bearer"
  }
  ```

#### Get Current User
- **Endpoint:** `GET /api/auth/me`
- **Headers:**
  ```
  Accept: application/json
  Authorization: Bearer {token}
  ```
- **Response:** `200 OK` - User object

#### Logout
- **Endpoint:** `POST /api/auth/logout`
- **Headers:**
  ```
  Accept: application/json
  Authorization: Bearer {token}
  ```
- **Response:** `200 OK`
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

---

### Task Endpoints

All task endpoints require authentication (`Authorization: Bearer {token}`)

#### Get All Tasks
- **Endpoint:** `GET /api/tasks`
- **Query Parameters:**
  - `status` - Filter by status (pending, in_progress, completed, cancelled)
  - `priority` - Filter by priority (low, medium, high, urgent)
- **Example:** `GET /api/tasks?status=pending&priority=high`
- **Response:** `200 OK` - Array of tasks

#### Create Task
- **Endpoint:** `POST /api/tasks`
- **Body:**
  ```json
  {
    "title": "Complete project",
    "description": "Finish the Vue.js project",
    "priority": "high",
    "status": "pending"
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "message": "Task created successfully",
    "data": { /* task object */ }
  }
  ```

#### Get Single Task
- **Endpoint:** `GET /api/tasks/{id}`
- **Response:** `200 OK` - Task object

#### Update Task
- **Endpoint:** `PUT /api/tasks/{id}`
- **Body:**
  ```json
  {
    "title": "Updated title",
    "status": "in_progress",
    "priority": "medium"
  }
  ```
- **Response:** `200 OK`
  ```json
  {
    "message": "Task updated successfully",
    "data": { /* updated task object */ }
  }
  ```

#### Delete Task
- **Endpoint:** `DELETE /api/tasks/{id}`
- **Response:** `200 OK`
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

---

## 🧪 Postman Testing

### Import Collection

1. Download Postman: https://www.postman.com/downloads/
2. Create new collection: `TodoList API`
3. Create environment: `TodoList Local`

### Environment Variables

Set these in your Postman environment:

| Variable | Value |
|----------|-------|
| `base_url` | `http://localhost:8000` |
| `token` | (auto-filled after login) |

### Test Workflow

1. **Register:** POST to `/api/auth/register` → Save token
2. **Get User:** GET `/api/auth/me` with token
3. **Create Task:** POST `/api/tasks` with token
4. **Get Tasks:** GET `/api/tasks` with token
5. **Update Task:** PUT `/api/tasks/{id}` with token
6. **Delete Task:** DELETE `/api/tasks/{id}` with token

See `postman-testing-guide.md` for detailed Postman setup instructions.

---

## 🐛 Troubleshooting

### Backend Issues

#### CORS Error
**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Check `config/cors.php` includes your frontend origin
2. Verify `bootstrap/app.php` has CORS middleware
3. Restart Laravel server: `php artisan serve`

#### Database Connection Error
**Problem:** `SQLSTATE[HY000]`

**Solution:**
1. Verify PostgreSQL is running
2. Check `.env` database credentials
3. Create user with proper permissions (see Backend Setup #7)

#### JWT Secret Missing
**Problem:** `JWT secret not set`

**Solution:**
```bash
php artisan jwt:secret
```

#### Routes Not Found
**Problem:** `404 Route not found`

**Solution:**
1. Verify `bootstrap/app.php` has `api: __DIR__.'/../routes/api.php'`
2. Clear cache: `php artisan route:clear`
3. Restart server

#### Token Expired
**Problem:** `401 Unauthorized`

**Solution:**
1. Login again to get fresh token
2. Check token in `localStorage`
3. Use refresh endpoint if available

---

### Frontend Issues

#### API Not Connecting
**Problem:** Requests not reaching backend

**Solution:**
1. Check `.env` has `VITE_API_URL=http://localhost:8000`
2. Verify backend is running
3. Check `src/services/authService.js` has `USE_MOCK_API = false`
4. Check `src/services/taskService.js` has `USE_MOCK_API = false`

#### Login Not Working
**Problem:** Credentials rejected

**Solution:**
1. Register new account first
2. Verify credentials are correct
3. Check Network tab in DevTools for errors
4. Check backend logs: `storage/logs/laravel.log`

#### Tasks Not Showing
**Problem:** Empty task list

**Solution:**
1. Verify you're logged in
2. Check token is in `localStorage`
3. Create new task via API
4. Check backend database: `select * from tasks;` in PostgreSQL

---

## 📝 Common Commands

### Backend

```bash
# Migrate database
php artisan migrate

# Fresh migration (drops all tables)
php artisan migrate:fresh

# Seed database
php artisan db:seed

# Clear cache
php artisan cache:clear

# Show routes
php artisan route:list

# Tinker shell
php artisan tinker
```

### Frontend

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

**Mohammed**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: mohammed@example.com

---

## 🙏 Acknowledgments

- Vue.js community
- Laravel community
- Tailwind CSS
- PostgreSQL

---

## 📞 Support

For issues and questions, please create an issue on GitHub or contact the author.

---

## 🔗 Useful Links

- [Vue 3 Documentation](https://vuejs.org/)
- [Laravel Documentation](https://laravel.com/docs/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Auth for Laravel](https://github.com/tymondesigns/jwt-auth)

---

**Last Updated:** November 12, 2025

Happy Coding! 🚀
