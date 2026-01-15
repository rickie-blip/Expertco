"""Contact form routes"""
from flask import Blueprint, request, jsonify
from services.contact_service import validate_contact_data, save_contact_submission
from config import logger
import mysql.connector

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/api/contact/info', methods=['GET'])
def get_contact_info():
    """Return company contact information"""
    return jsonify({
        "success": True,
        "data": {
            "company": "EXPERTCO LTD",
            "phone": "+254 732 271 731",
            "email": "faith@expertco.com",
            "address": "P.O Box 190 Sarit Center Nairobi, Kenya",
            "website": "www.expertco.com",
            "social_media": {
                "facebook": "",
                "twitter": "",
                "linkedin": "",
                "instagram": ""
            }
        }
    }), 200

@contact_bp.route('/api/contact', methods=['POST'])
def submit_contact_form():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        # Validate data
        is_valid, error_message, validated_data = validate_contact_data(data)
        if not is_valid:
            return jsonify({"success": False, "message": error_message}), 400
        
        # Save to database
        save_contact_submission(validated_data)
        
        return jsonify({
            "success": True,
            "message": "Thank you for your message. We'll get back to you within 24 hours."
        }), 200
        
    except mysql.connector.Error as e:
        logger.error(f"Database error: {e}")
        return jsonify({
            "success": False,
            "message": "Database error. Please try again later."
        }), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An error occurred. Please try again later."
        }), 500

