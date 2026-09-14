@echo off
title Push Entropy Password Evaluator to GitHub
echo ======================================================================
echo   PUSH CODE TO GITHUB REPOSITORY
echo ======================================================================
echo.
echo 1. Go to https://github.com/new and create a new repository
echo    (e.g., named "entropy-password-evaluator", Public)
echo 2. Copy your repository URL
echo    (e.g., https://github.com/your-username/entropy-password-evaluator.git)
echo.
set /p REPO_URL="Enter your GitHub Repository URL: "

if "%REPO_URL%"=="" (
    echo No URL provided. Aborting.
    pause
    exit /b
)

echo.
echo Setting up remote and pushing to %REPO_URL%...
"%LOCALAPPDATA%\Programs\MinGit\cmd\git.exe" remote remove origin 2>nul
"%LOCALAPPDATA%\Programs\MinGit\cmd\git.exe" remote add origin %REPO_URL%
"%LOCALAPPDATA%\Programs\MinGit\cmd\git.exe" branch -M main
"%LOCALAPPDATA%\Programs\MinGit\cmd\git.exe" push -u origin main

echo.
echo ======================================================================
echo   DONE! Your code is permanently published at your GitHub link.
echo ======================================================================
pause
