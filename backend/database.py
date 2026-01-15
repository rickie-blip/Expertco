"""Database connection pool management"""
import mysql.connector
from mysql.connector import pooling
from config import DB_POOL_CONFIG, logger

# Initialize connection pool
db_pool = None

def init_db_pool():
    """Initialize database connection pool"""
    global db_pool
    try:
        db_pool = pooling.MySQLConnectionPool(**DB_POOL_CONFIG)
        logger.info("Database connection pool initialized")
    except mysql.connector.Error as e:
        logger.error(f"Failed to create connection pool: {e}")
        raise

def get_db_connection():
    """Get a database connection from the pool"""
    global db_pool
    if db_pool is None:
        init_db_pool()
    try:
        return db_pool.get_connection()
    except mysql.connector.Error as e:
        logger.error(f"Database connection error: {e}")
        raise

def check_db_connection():
    """Check if database connection is available"""
    try:
        conn = get_db_connection()
        conn.close()
        return True
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        return False

