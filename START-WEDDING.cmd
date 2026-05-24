@echo off
cd /d "%~dp0"
echo.
echo Starting Yomna ^& Ahmed wedding invitation...
echo.
call npm.cmd run build
if errorlevel 1 (
  echo.
  echo Build failed. Please check the error above.
  pause
  exit /b 1
)
echo.
call npm.cmd run serve:dist
pause
