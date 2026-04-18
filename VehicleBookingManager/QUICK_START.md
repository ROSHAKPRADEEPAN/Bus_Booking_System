# 🚀 Quick Start Guide - VehicleBookingManager

## 5-Minute Setup

### Prerequisites Checklist
- [ ] Java 21 installed (`java -version`)
- [ ] Node.js 18+ installed (`node -v`)
- [ ] PostgreSQL running and accessible
- [ ] Maven installed (`mvn -v`)

---

## Step 1: Database Setup (2 minutes)

```bash
# Open PostgreSQL
psql -U postgres

# Create database and user
CREATE DATABASE vehiclebookingdb;
CREATE USER postgres WITH PASSWORD 'pass';
GRANT ALL PRIVILEGES ON DATABASE vehiclebookingdb TO postgres;

# Exit
\q
```

---

## Step 2: Backend Setup & Run (2 minutes)

```bash
# Navigate to project root
cd VehicleBookingManager

# Build backend
cd backend
mvn clean install

# Run backend (keeps running)
mvn spring-boot:run
```

**✅ Backend Ready**: `http://localhost:8090`

Leave this terminal running.

---

## Step 3: Frontend Setup & Run (1 minute)

Open a **new terminal** in project root:

```bash
# Install dependencies
npm install

# Run frontend development server
npm run dev
```

**✅ Frontend Ready**: `http://localhost:5173`

---

## Step 4: Test the Application

### Option A: Web Browser
1. Open `http://localhost:5173`
2. Click "Register" to create a user account
3. Login with your credentials
4. Browse vehicles and test booking flow

### Option B: Terminal Commands
```bash
# Register user
curl -X POST http://localhost:8090/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@test.com",
    "password": "password123",
    "phone": "9876543210"
  }'

# Login
curl -X POST http://localhost:8090/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "password123"
  }'

# Get vehicles
curl http://localhost:8090/api/vehicles
```

---

## Troubleshooting Quick Fixes

### Backend won't start
```bash
# Check if port 8090 is in use
# Change port in: backend/src/main/resources/application.properties
server.port=8081
```

### Database connection fails
```bash
# Verify PostgreSQL is running
pg_isready -h localhost -p 5432

# Check credentials in application.properties
spring.datasource.username=postgres
spring.datasource.password=pass
spring.datasource.url=jdbc:postgresql://localhost:5432/vehiclebookingdb
```

### Frontend can't reach backend
- Ensure backend is running on port 8090
- Check browser console for CORS errors
- Frontend expects backend at: `http://localhost:8090`

### npm install fails
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## Project Structure

```
VehicleBookingManager/
├── backend/              # Spring Boot application
│   ├── src/main/java/   # Java source code
│   ├── pom.xml          # Maven dependencies
│   └── target/          # Build output
├── client/              # React frontend
│   ├── src/            # React components & pages
│   └── index.html      # Entry point
├── server/             # Express.js server (dev routing)
├── shared/             # Shared TypeScript schemas
└── package.json        # Frontend dependencies
```

---

## Key Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/register-owner` - Register vehicle owner
- `POST /api/auth/login-owner` - Owner login

### Vehicles
- `GET /api/vehicles` - All vehicles
- `GET /api/vehicles/city/{city}` - Vehicles by city
- `GET /api/vehicles/{id}` - Vehicle details

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/{id}` - Booking details
- `GET /api/bookings/user/{email}` - User bookings

### Payments
- `POST /api/payment/create-order/{bookingId}` - Create payment order
- `POST /api/payment/success/{bookingId}` - Confirm payment

---

## Frontend Routes

| Route | Purpose |
|-------|---------|
| `/` | Home page |
| `/vehicles` | Vehicle listing |
| `/calculator` | Cost calculator |
| `/user/register` | User registration |
| `/user/login` | User login |
| `/owner/register` | Owner registration |
| `/owner/login` | Owner login |
| `/booking/:vehicleId` | Booking form |
| `/owner/dashboard` | Owner dashboard |
| `/dashboard` | User dashboard |

---

## Common Tasks

### Build for Production
```bash
# Backend
cd backend
mvn clean package
# Output: backend/target/vehiclebooking-1.0.0.jar

# Frontend
npm run build
# Output: dist/ directory
```

### View Backend Logs
```bash
# If using mvn spring-boot:run, logs appear in same terminal
# Or check: backend/target/logs/ (if configured)
```

### Enable Debug Mode
Add to `backend/src/main/resources/application.properties`:
```properties
logging.level.root=INFO
logging.level.com.vehiclebooking=DEBUG
```

### Change Ports
```properties
# Backend (application.properties)
server.port=8081

# Frontend (package.json)
"dev": "vite --port 3000"
```

---

## Next Steps After Running

1. ✅ Create test accounts (user & owner)
2. ✅ Browse available vehicles
3. ✅ Create test bookings
4. ✅ Test payment flow (Razorpay - uses test keys)
5. ✅ Check email notifications (if configured)
6. ✅ Review owner dashboard
7. ✅ Customize application settings

---

## Getting Help

### Check Logs
1. **Backend**: Terminal running `mvn spring-boot:run`
2. **Frontend**: Browser DevTools (F12) → Console tab
3. **Database**: Check PostgreSQL logs

### Enable Verbose Logging
```bash
# Backend
mvn spring-boot:run -X

# Frontend
npm run dev -- --debug
```

### Verify Services
```bash
# Backend health
curl http://localhost:8090/api/auth/health

# Frontend accessibility
curl http://localhost:5173
```

---

## Summary

- ✅ Database: `vehiclebookingdb` on localhost:5432
- ✅ Backend: `http://localhost:8090/` (Spring Boot)
- ✅ Frontend: `http://localhost:5173/` (React + Vite)
- ✅ Ready for development and testing
- ✅ Production build ready

**Time to first run**: ~5 minutes ⏱️

**Status**: 🟢 All systems operational

For detailed setup, see `SETUP_AND_RUN_GUIDE.md`
For list of all fixes, see `FIXES_AND_CHANGES.md`
