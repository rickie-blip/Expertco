"""Flask application entry point for Vercel deployment"""
import os
from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder='frontend', static_url_path='')

# Serve frontend files
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    try:
        return send_from_directory(app.static_folder, filename)
    except:
        return send_from_directory(app.static_folder, 'index.html')

# API routes
@app.route('/api')
def api_root():
    return jsonify({
        "message": "Expertco API is running",
        "version": "1.0.0"
    })

@app.route('/api/health')
def health():
    return jsonify({"status": "healthy"})

@app.route('/api/contact', methods=['POST'])
def contact():
    return jsonify({
        "success": True,
        "message": "Thank you for your message. We'll get back to you within 24 hours."
    })

if __name__ == '__main__':
    app.run(debug=True)