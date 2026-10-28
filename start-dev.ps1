# Start both Server and Client in separate PowerShell windows
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm start"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; npm run dev"
Write-Host "Scheme Saathi server and client launched in separate windows!" -ForegroundColor Green
Write-Host "Open http://localhost:5173 in your browser." -ForegroundColor Cyan
