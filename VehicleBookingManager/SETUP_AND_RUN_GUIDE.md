# VehicleBookingManager - Setup & Run Guide

## Project Overview
This is a full-stack vehicle booking application with:
- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Backend**: Spring Boot 3.3.4 (Java 21) + PostgreSQL
- **Node.js Server**: Express.js for development/API routing
- **Database**: PostgreSQL with Drizzle ORM

---

## Prerequisites

### System Requirements
- **Java 21+** (for Spring Boot backend)
- **Node.js 18+** (for frontend and Express server)
- **PostgreSQL 12+** (for database)
- **Maven 3.8+** (for building Java backend)

### Installation

#### 1. Install Java 21
```bash
# Windows (Chocolatey)
choco install openjdk21

# macOS (Homebrew)
brew install openjdk@21

# Linux (Ubuntu/Debian)
sudo apt-get install openjdk-21-jdk
```

#### 2. Install Node.js
Download from https://nodejs.org/ (LTS version recommended)

#### 3. Install PostgreSQL
- **Windows**: Use PostgreSQL installer
- **macOS**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql`

#### 4. Install Maven (if not included with Java)
```bash
# macOS
brew install maven

# Linux
sudo apt-get install maven
```

---

## Database Setup

### 1. Create PostgreSQL Database
```bash
# Open PostgreSQL command line
psql -U postgres

# Create database
CREATE DATABASE vehiclebookingdb;

# Create user
CREATE USER postgres WITH PASSWORD 'pass';
GRANT ALL PRIVILEGES ON DATABASE vehiclebookingdb TO postgres;

# Exit
\q
```

### 2. Update application.properties
Located at: `backend/src/main/resources/application.properties`

Ensure these values match your PostgreSQL setup:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/vehiclebookingdb
spring.datasource.username=postgres
spring.datasource.password=pass
```

### 3. Initialize Tables (Optional)
The backend will auto-create tables on first run due to Hibernate auto-schema generation.

---

## Backend Setup & Run

### Directory
```bash
cd VehicleBookingManager/backend
```

### 1. Build the Project
```bash
mvn clean install
```

**Expected Output**: `[INFO] BUILD SUCCESS`

### 2. Run Spring Boot Application
```bash
mvn spring-boot:run
```

Or run the JAR file:
```bash
java -jar target/vehiclebooking-1.0.0.jar
```

### 3. Verify Backend is Running
- **API Base URL**: `http://localhost:8090`
- **Test Example**: 
  ```bash
  curl http://localhost:8090
/api/auth/login
  ```

### Available Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/register-owner` - Register vehicle owner
- `POST /api/auth/login-owner` - Owner login
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/city/{city}` - Get vehicles by city
- `POST /api/bookings` - Create booking
- `POST /api/payment/create-order/{bookingId}` - Create Razorpay order
- `POST /api/payment/success/{bookingId}` - Confirm payment

---

## Frontend Setup & Run

### Directory
```bash
cd VehicleBookingManager
```

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

**Expected Output**: 
```
Local:   http://localhost:5173/
```

### 3. Access the Application
- **URL**: `http://localhost:5173` or `http://localhost:3000` (depending on dev setup)
- The frontend will communicate with backend at `http://localhost:8090`

### Available Frontend Routes
- `/` - Home page
- `/vehicles` - Vehicle listing
- `/calculator` - Cost calculator
- `/user/login` - User login
- `/user/register` - User registration
- `/owner/login` - Owner login
- `/owner/register` - Owner registration
- `/booking/:vehicleId` - Booking page
- `/owner/dashboard` - Owner dashboard
- `/dashboard` - User dashboard

---

## Build for Production

### Backend
```bash
cd backend
mvn clean package
# JAR file: target/vehiclebooking-1.0.0.jar
```

### Frontend
```bash
npm run build
# Output directory: dist/
```

---

## Environment Variables

### Backend (application.properties)
```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/vehiclebookingdb
spring.datasource.username=postgres
spring.datasource.password=pass

# Email (Gmail)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password

# JWT
jwt.secret=vehiclebooking_super_secret_key_1234567890

# Razorpay
razorpay.key.id=rzp_test_S9kPIXdbBkqZJa
razorpay.key.secret=Ontpf5GbmrMbR7OsrqIGixAb
```

### Frontend
No environment variables needed for development. Backend URL is hardcoded to `http://localhost:8090`

---

## Common Issues & Solutions

### Issue 1: "Connection refused" to PostgreSQL
**Solution**: 
1. Ensure PostgreSQL is running: `pgctl -D /usr/local/var/postgres start`
2. Verify database exists: `psql -U postgres -l`
3. Check connection string in `application.properties`

### Issue 2: Spring Boot fails to start
**Solution**:
1. Ensure Java 21 is installed: `java -version`
2. Check logs for specific error
3. Rebuild: `mvn clean install`

### Issue 3: Frontend can't connect to backend
**Solution**:
1. Ensure backend is running on `http://localhost:8090`
2. Check CORS settings in `SecurityConfig.java`
3. Check browser console for network errors

### Issue 4: "Maven not found"
**Solution**: 
- Add Maven to PATH or use `./mvnw` (Maven Wrapper)

### Issue 5: Port already in use
**Solution**:
- Backend (8090): Change in `application.properties`
- Frontend (5173/3000): Change in `package.json` dev script

---

## Testing the Application

### 1. Register a User
```bash
curl -X POST http://localhost:8090/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8090/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Get Vehicles
```bash
curl http://localhost:8090/api/vehicles
```

---

## Technology Stack Details

### Backend
- **Spring Boot 3.3.4** - Framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - ORM
- **PostgreSQL Driver** - Database
- **JWT (io.jsonwebtoken)** - Token-based auth
- **Razorpay** - Payment gateway
- **Lombok** - Code generation
- **Spring Mail** - Email service

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Query** - Data fetching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Framer Motion** - Animations
- **Wouter** - Routing

---

## Troubleshooting Checklist

- [ ] Java 21 is installed
- [ ] Node.js 18+ is installed
- [ ] PostgreSQL is running
- [ ] Database `vehiclebookingdb` exists
- [ ] `application.properties` has correct database credentials
- [ ] Backend runs on port 8090
- [ ] Frontend runs on port 5173/3000
- [ ] No port conflicts
- [ ] All dependencies installed (`npm install`, `mvn install`)
- [ ] Browser DevTools console shows no errors
- [ ] Network requests reach `http://localhost:8090`

---

## Next Steps

1. **Customize Configuration**: Update email, payment gateway, and JWT secret
2. **Add More Vehicle Types**: Insert into `vehicle_types` table
3. **Setup Email Service**: Configure Gmail SMTP credentials
4. **Razorpay Integration**: Update test keys with your actual keys
5. **Deploy**: Use Docker, AWS, Azure, or Vercel for production

---

## Support & Debugging

### Enable Debug Logging
Add to `application.properties`:
```properties
logging.level.root=INFO
logging.level.com.vehiclebooking=DEBUG
logging.level.org.springframework.security=DEBUG
```

### Check Logs
```bash
# Backend logs are printed to console during `mvn spring-boot:run`
# Frontend logs are in browser DevTools Console
```

---

**Last Updated**: February 2026
**Project Status**: Ready for Development & Testing
