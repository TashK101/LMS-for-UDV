@echo off
wsl sudo docker compose up -d
wsl echo "Please do not close this terminal. Docker containers are running."
wsl bash -c "read -p 'if you still want to close, press Enter...'"