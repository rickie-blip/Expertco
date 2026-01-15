# Deployment Guide

This guide covers deploying the Integrated Expertco project to production.

## Prerequisites

- Python 3.8+
- MySQL 5.7+ or MySQL 8.0+
- Web server (Nginx, Apache, or similar)
- Domain name (optional but recommended)
- SSL certificate (for HTTPS)

## Deployment Options

### Option 1: Traditional VPS/Server Deployment

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python and MySQL
sudo apt install python3 python3-pip python3-venv mysql-server nginx -y
```

#### 2. Database Setup

```bash
# Secure MySQL installation
sudo mysql_secure_installation

# Create database
sudo mysql -u root -p < database/schema.sql

# Or manually:
sudo mysql -u root -p
```

```sql
CREATE DATABASE IF NOT EXISTS expertco_db;
CREATE USER 'expertco_user'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON expertco_db.* TO 'expertco_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### 3. Backend Deployment

```bash
# Clone or upload project
cd /var/www
sudo mkdir expertco
sudo chown $USER:$USER expertco
cd expertco

# Upload project files here, or clone from repository

# Create virtual environment
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
nano .env
```

Add to `.env`:
```env
DB_HOST=localhost
DB_USER=expertco_user
DB_PASSWORD=strong_password_here
DB_NAME=expertco_db
DB_POOL_SIZE=10
PORT=5000
FLASK_DEBUG=False
LOG_LEVEL=INFO
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

#### 4. Run with Gunicorn

```bash
# Test Gunicorn
gunicorn -c gunicorn_config.py app:app

# Create systemd service for auto-start
sudo nano /etc/systemd/system/expertco-api.service
```

Add to service file:
```ini
[Unit]
Description=Expertco API Gunicorn daemon
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/expertco/backend
Environment="PATH=/var/www/expertco/backend/venv/bin"
ExecStart=/var/www/expertco/backend/venv/bin/gunicorn -c gunicorn_config.py app:app

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable expertco-api
sudo systemctl start expertco-api
sudo systemctl status expertco-api
```

#### 5. Frontend Deployment

```bash
# Copy frontend files to web server directory
sudo cp -r frontend/* /var/www/html/expertco/

# Or use Nginx to serve static files
sudo nano /etc/nginx/sites-available/expertco
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Frontend static files
    root /var/www/html/expertco;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy
    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/expertco /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 6. Update Frontend API Configuration

Edit `frontend/js/config.js` to use your production API URL, or configure it to use the `/api` path if using Nginx proxy.

### Option 2: Cloud Platform Deployment

#### Heroku

1. **Install Heroku CLI** and login
2. **Create `Procfile`** in backend directory:
```
web: gunicorn -c gunicorn_config.py app:app
```
3. **Add Heroku MySQL addon**:
```bash
heroku addons:create cleardb:ignite
```
4. **Set environment variables**:
```bash
heroku config:set DB_HOST=your_host
heroku config:set DB_USER=your_user
heroku config:set DB_PASSWORD=your_password
heroku config:set DB_NAME=your_database
heroku config:set ALLOWED_ORIGINS=https://your-app.herokuapp.com
```
5. **Deploy backend**:
```bash
cd backend
git init
git add .
git commit -m "Initial commit"
heroku create your-app-name
git push heroku main
```
6. **Deploy frontend** to static hosting (Netlify, Vercel, etc.) and configure API URL

#### AWS (EC2 + RDS)

1. Launch EC2 instance
2. Create RDS MySQL instance
3. Follow VPS deployment steps above
4. Configure security groups for database access
5. Use Elastic Beanstalk or ECS for easier management

#### DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build settings:
   - Backend: Python, `pip install -r requirements.txt`, `gunicorn -c gunicorn_config.py app:app`
   - Frontend: Static site, point to `frontend/` directory
3. Add MySQL database component
4. Set environment variables
5. Deploy

## Security Checklist

- [ ] Use HTTPS (SSL/TLS certificate)
- [ ] Set strong database passwords
- [ ] Configure CORS to only allow your domain
- [ ] Use environment variables for secrets
- [ ] Enable firewall (only allow necessary ports)
- [ ] Keep dependencies updated
- [ ] Use connection pooling (already implemented)
- [ ] Set up regular database backups
- [ ] Configure rate limiting (consider adding Flask-Limiter)
- [ ] Enable security headers in web server

## Monitoring

### Logs

```bash
# Backend logs
sudo journalctl -u expertco-api -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Health Check

The API includes a health endpoint:
```bash
curl http://localhost:5000/api/health
```

## Backup Strategy

```bash
# Database backup script
#!/bin/bash
mysqldump -u expertco_user -p expertco_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Add to crontab for daily backups
0 2 * * * /path/to/backup-script.sh
```

## Troubleshooting

### Backend won't start
- Check database connection: `mysql -u expertco_user -p expertco_db`
- Verify environment variables: `cat backend/.env`
- Check logs: `sudo journalctl -u expertco-api -n 50`

### CORS errors
- Verify `ALLOWED_ORIGINS` in `.env` includes your frontend domain
- Check browser console for exact error
- Ensure frontend API URL is correct

### Database connection errors
- Verify MySQL is running: `sudo systemctl status mysql`
- Check user permissions: `SHOW GRANTS FOR 'expertco_user'@'localhost';`
- Test connection: `mysql -u expertco_user -p expertco_db`

## Performance Optimization

1. **Enable Gzip compression** in Nginx
2. **Use CDN** for static assets
3. **Implement caching** for static files
4. **Database indexing** (already on primary key)
5. **Connection pooling** (already implemented)

## Scaling

- Use load balancer for multiple backend instances
- Consider Redis for session storage
- Use read replicas for database
- Implement caching layer (Redis/Memcached)

