# Integrated Expertco Project

A modern web application combining the best of both Expertco and SpecDriven projects. Built with HTML/CSS/JavaScript frontend and Python Flask backend with MySQL database.

## Project Structure

```
integrated-expertco/
├── backend/           # Python Flask API
│   ├── app.py        # Main Flask application
│   └── requirements.txt
├── frontend/         # HTML/CSS/JavaScript frontend
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── contact.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── database/          # MySQL schema
│   └── schema.sql
└── README.md
```

## Features

- **Modern Frontend**: Pure HTML, CSS, and JavaScript (no frameworks)
- **RESTful API**: Python Flask backend with MySQL database
- **Contact Form**: Saves submissions to MySQL database
- **Responsive Design**: Mobile-friendly layout
- **Accessibility**: WCAG compliant with skip links and keyboard navigation

## Prerequisites

- Python 3.8 or higher
- MySQL 5.7 or higher
- pip (Python package manager)

## Installation

### 1. Database Setup

1. Start your MySQL server
2. Run the schema file to create the database:

```bash
mysql -u root -p < database/schema.sql
```

Or manually:
```sql
CREATE DATABASE IF NOT EXISTS expertco_db;
USE expertco_db;

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create a `.env` file in the backend directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=expertco_db
PORT=5000
FLASK_DEBUG=False
```

6. Update the `.env` file with your MySQL credentials

### 3. Frontend Setup

The frontend is static HTML/CSS/JS, so no build process is needed. However, you'll need to:

1. Update the API URL in `frontend/js/main.js` if your backend runs on a different port:
```javascript
const API_BASE_URL = 'http://localhost:5000';
```

2. Serve the frontend files using a web server. Options:
   - Use Python's built-in server: `python -m http.server 8000` (from frontend directory)
   - Use any web server (Apache, Nginx, etc.)
   - Open files directly in browser (may have CORS issues with API calls)

## Running the Application

### Start the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Activate your virtual environment (if using one)

3. Run the Flask application:
```bash
python app.py
```

The backend will start on `http://localhost:5000`

### Start the Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Start a simple HTTP server:
```bash
# Python 3
python -m http.server 8000

# Or using Node.js (if installed)
npx http-server -p 8000
```

3. Open your browser and navigate to `http://localhost:8000`

## API Endpoints

### GET `/`
Health check endpoint
- Response: `{"message": "Expertco API is running", "version": "1.0.0"}`

### POST `/api/contact`
Submit a contact form
- Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Corp",
  "phone": "+1234567890",
  "message": "Your message here"
}
```
- Response:
```json
{
  "success": true,
  "message": "Thank you for your message. We'll get back to you within 24 hours."
}
```

### GET `/api/health`
Check API and database health
- Response: `{"status": "healthy", "database": "connected"}`

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python 3, Flask, Flask-CORS, Gunicorn
- **Database**: MySQL with connection pooling
- **Fonts**: Google Fonts (Poppins, Montserrat)

## Production Deployment

**Yes, this project is production-ready!** 

The project includes:
- ✅ Production WSGI server (Gunicorn) configuration
- ✅ Database connection pooling
- ✅ Configurable CORS settings
- ✅ Environment-based configuration
- ✅ Health check endpoints
- ✅ Error handling and logging

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for:
- Traditional VPS/Server (Nginx + Gunicorn)
- Heroku
- AWS (EC2 + RDS)
- DigitalOcean App Platform
- And more...

## Development

### Backend Development

The Flask app uses environment variables for configuration. Make sure to:
- Never commit `.env` files
- Use `.env.example` as a template
- Set `FLASK_DEBUG=True` for development

### Frontend Development

- All styles are in `frontend/css/style.css`
- JavaScript is in `frontend/js/main.js`
- No build process required - edit files directly

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser console:
- Make sure Flask-CORS is installed
- Check that the backend is running
- Verify the API_BASE_URL in `main.js` matches your backend URL

### Database Connection Errors
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure the database exists: `SHOW DATABASES;`
- Verify table exists: `USE expertco_db; SHOW TABLES;`

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using the port:
  - Windows: `netstat -ano | findstr :5000`
  - Linux/Mac: `lsof -i :5000`

## License

This project is for portfolio/educational purposes.

## Contact

For questions or issues, please refer to the contact form on the website.

