"""Health check routes"""
from flask import Blueprint, jsonify
from database import check_db_connection

health_bp = Blueprint('health', __name__)

@health_bp.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        db_connected = check_db_connection()
        if db_connected:
            return jsonify({"status": "healthy", "database": "connected"}), 200
        else:
            return jsonify({"status": "unhealthy", "database": "disconnected"}), 500
    except Exception as e:
        return jsonify({"status": "unhealthy", "error": str(e)}), 500

