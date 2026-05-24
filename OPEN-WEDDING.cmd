@echo off
cd /d "%~dp0"
echo.
echo Building Yomna ^& Ahmed wedding invitation...
echo.
call npm.cmd run build
if errorlevel 1 (
  echo.
  echo Build failed. Please check the error above.
  pause
  exit /b 1
)
echo.
echo Opening the invitation directly. No server needed.
start "" "%~dp0dist\index.html"
echo.
pause
