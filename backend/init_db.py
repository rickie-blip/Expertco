"""Database initialization script"""
import mysql.connector
from config import DB_CONFIG, logger

def init_database():
    """Initialize database and create tables"""
    try:
        # Connect without database to create it
        conn = mysql.connector.connect(
            host=DB_CONFIG['host'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password']
        )
        cursor = conn.cursor()
        
        # Create database
        cursor.execute("CREATE DATABASE IF NOT EXISTS expertco_db")
        logger.info("Database 'expertco_db' created or already exists")
        
        # Use the database
        cursor.execute("USE expertco_db")
        
        # Create contacts table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS contacts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                company VARCHAR(255),
                phone VARCHAR(50),
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        logger.info("Table 'contacts' created or already exists")
        
        conn.commit()
        cursor.close()
        conn.close()
        
        logger.info("Database initialization completed successfully")
        return True
        
    except mysql.connector.Error as e:
        logger.error(f"Database initialization failed: {e}")
        return False

if __name__ == '__main__':
    if init_database():
        print("✓ Database initialized successfully")
    else:
        print("✗ Database initialization failed. Check logs for details.")
