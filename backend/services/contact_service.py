"""Contact form service for handling contact submissions"""
from datetime import datetime
import mysql.connector
from database import get_db_connection
from config import logger

def validate_contact_data(data):
    """
    Validate contact form data
    
    Args:
        data: Dictionary containing contact form data
        
    Returns:
        tuple: (is_valid, error_message, validated_data)
    """
    if not data:
        return False, "No data provided", None
    
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()
    company = data.get('company', '').strip() or None
    phone = data.get('phone', '').strip() or None
    
    # Validation
    if not name or len(name) < 2:
        return False, "Name must be at least 2 characters", None
    
    if not email or '@' not in email:
        return False, "Valid email is required", None
    
    if not message or len(message) < 10:
        return False, "Message must be at least 10 characters", None
    
    validated_data = {
        'name': name,
        'email': email,
        'message': message,
        'company': company,
        'phone': phone
    }
    
    return True, None, validated_data

def save_contact_submission(contact_data):
    """
    Save contact form submission to database
    
    Args:
        contact_data: Dictionary containing validated contact data
        
    Returns:
        bool: True if successful, False otherwise
    """
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        query = """
        INSERT INTO contacts (name, email, company, phone, message, created_at)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        
        cursor.execute(query, (
            contact_data['name'],
            contact_data['email'],
            contact_data['company'],
            contact_data['phone'],
            contact_data['message'],
            datetime.now()
        ))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        logger.info(f"Contact form submitted: {contact_data['name']} ({contact_data['email']})")
        return True
        
    except mysql.connector.Error as e:
        logger.error(f"Database error: {e}")
        if conn:
            conn.rollback()
            conn.close()
        raise
    except Exception as e:
        logger.error(f"Unexpected error saving contact: {e}")
        if conn:
            conn.rollback()
            conn.close()
        raise

