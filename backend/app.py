"""Flask application entry point"""
from flask import Flask, jsonify, send_from_directory
from config import PORT, FLASK_DEBUG, logger
from database import init_db_pool
from routes.contact import contact_bp
from routes.health import health_bp
import os

app = Flask(__name__, static_folder='../frontend', static_url_path='')

# Serve frontend
@app.route('/')
@app.route('/<path:path>')
def serve_frontend(path='index.html'):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

# Register API blueprints
app.register_blueprint(contact_bp)
app.register_blueprint(health_bp)

@app.route('/api')
def api_root():
    return jsonify({
        "message": "Expertco API is running",
        "version": "1.0.0"
    })

# Initialize database pool when app starts
try:
    init_db_pool()
    logger.info("Database pool initialized successfully")
except Exception as e:
    logger.warning(f"Could not initialize database pool: {e}")
    logger.warning("Run 'python init_db.py' to initialize the database")

if __name__ == '__main__':
    # Development server only - use Gunicorn for production
    logger.warning("Running Flask development server. Use Gunicorn for production!")
    app.run(host='0.0.0.0', port=PORT, debug=FLASK_DEBUG)

