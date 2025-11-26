@echo off
echo Starting Micro Coding Challenges...
echo.

echo Installing dependencies...
cd server
call npm install
cd ../client
call npm install
cd ..

echo.
echo Starting servers...
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:3000
echo.

start cmd /k "cd server && npm start"
timeout /t 3 /nobreak > nul
start cmd /k "cd client && npm run dev"

echo.
echo Both servers are starting in separate windows...
echo Press any key to exit this window.
pause > nul
