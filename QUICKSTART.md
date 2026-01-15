# Quick Start Guide

## Prerequisites
- Python 3.8+ installed
- MySQL server running (XAMPP, WAMP, or standalone MySQL)

## Setup Steps

### 1. Configure Database
Edit `backend\.env` and set your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=expertco_db
```

### 2. Start Backend
Double-click `start_backend.bat` or run:
```bash
cd backend
python init_db.py  # Initialize database (first time only)
python app.py      # Start server
```

Backend will run at: http://localhost:5000

### 3. Start Frontend
Double-click `start_frontend.bat` or run:
```bash
cd frontend
python -m http.server 8000
```

Frontend will run at: http://localhost:8000

## Troubleshooting

### "Could not connect to database"
- Ensure MySQL is running
- Check credentials in `backend\.env`
- Run `python backend\init_db.py` to create database

### "Module not found"
```bash
cd backend
pip install -r requirements.txt
```

### Port already in use
- Change PORT in `backend\.env`
- Or kill the process using the port

## API Endpoints
- GET  `/` - Health check
- POST `/api/contact` - Submit contact form
- GET  `/api/health` - Database health check
