"""Configuration management for the application"""
import os
import logging

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    logging.warning("python-dotenv not installed. Using system environment variables only.")

# Configure logging
log_level = os.getenv('LOG_LEVEL', 'INFO').upper()
logging.basicConfig(
    level=getattr(logging, log_level, logging.INFO),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Database configuration
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'expertco_db'),
    'autocommit': False,
    'charset': 'utf8mb4',
    'collation': 'utf8mb4_unicode_ci'
}

# Connection pool configuration
DB_POOL_CONFIG = {
    **DB_CONFIG,
    'pool_name': 'expertco_pool',
    'pool_size': int(os.getenv('DB_POOL_SIZE', '5')),
    'pool_reset_session': True
}

# CORS configuration
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', '*').split(',')

# Server configuration
PORT = int(os.getenv('PORT', 5000))
FLASK_DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() in ['true', '1']

