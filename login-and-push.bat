@echo off
title Push Entropy Password Evaluator to GitHub
echo ======================================================================
echo   AUTOMATED GITHUB REPOSITORY CREATION AND PUSH
echo ======================================================================
echo.
echo Step 1: Logging into GitHub...
echo (A one-time browser verification window will open)
echo.
"%LOCALAPPDATA%\Programs\gh\bin\gh.exe" auth login --web -h github.com -p https

echo.
echo Step 2: Creating public GitHub repository and pushing code...
"%LOCALAPPDATA%\Programs\gh\bin\gh.exe" repo create entropy-password-evaluator --public --source=. --remote=origin --push

echo.
echo ======================================================================
echo   SUCCESS! Your repository is now live on GitHub!
echo ======================================================================
pause
