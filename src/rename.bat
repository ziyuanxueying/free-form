#!/bin/bash
@echo start


for /f "delims=" %%i in ('dir /b /a-d /s "*.js"') do ren "%%i" "%%~ni.ts"


@echo over
