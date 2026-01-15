@echo off
echo Starting Expertco Frontend Server...
cd frontend
python -m http.server 8000
pause

