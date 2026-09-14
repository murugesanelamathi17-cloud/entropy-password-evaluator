@echo off
title Entropy-Based Password Evaluation System
echo ======================================================================
echo   ENTROPY-BASED PASSWORD EVALUATION SYSTEM
echo   Under the guidance of Dr. K. Senbagam
echo   Presented by: Hariharan P, Harini R M, Madhesh Kumar D
echo ======================================================================
echo.
echo Starting local application server...
echo.
start "" "http://localhost:5173"
call npm.cmd run dev -- --open
pause
