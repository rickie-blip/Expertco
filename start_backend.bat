@echo off
echo ========================================
echo Starting Expertco Backend Server
echo ========================================
echo.

cd /d "%~dp0backend"

echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo Checking dependencies...
pip show flask-cors >nul 2>&1
if errorlevel 1 (
    echo Installing dependencies...
    pip install -r requirements.txt
)

echo.
echo Checking .env file...
if not exist .env (
    echo WARNING: .env file not found
    echo Creating .env from example...
    copy config.example.env .env
    echo.
    echo IMPORTANT: Please edit backend\.env and set your database credentials
    echo Press any key to continue after editing .env file...
    pause
)

echo.
echo Initializing database...
python init_db.py

echo.
echo Starting Flask server...
echo Server will be available at http://localhost:5000
echo Press Ctrl+C to stop the server
echo.
python app.py
