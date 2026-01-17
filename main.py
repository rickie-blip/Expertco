"""Flask application entry point for Vercel deployment"""
from backend.app import app

if __name__ == "__main__":
    app.run()