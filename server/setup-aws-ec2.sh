#!/bin/bash
# ==============================================================================
# SHAYDHA TECHNOLOGIES — AWS Free Tier EC2 Setup & Deployment Script
# Target: Ubuntu 22.04 / 24.04 LTS on AWS EC2 (t2.micro / t3.micro)
# ==============================================================================

set -e

echo ">>> [1/5] Updating packages and system dependencies..."
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install -y curl git nginx ufw

echo ">>> [2/5] Installing Node.js 20 LTS and PM2..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

echo ">>> [3/5] Setting up Project Directory..."
APP_DIR="/var/www/shaydha-backend"
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

# Check if repo exists or copy files
if [ ! -f "$APP_DIR/package.json" ]; then
  echo "Copying server files to $APP_DIR..."
  cp -r ./* $APP_DIR/ || true
fi

cd $APP_DIR

echo ">>> [4/5] Installing dependencies and building TypeScript..."
npm install
npm run build

echo ">>> [5/5] Starting application via PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup | tail -n 1 | sudo bash || true

echo ">>> Configuring NGINX reverse proxy..."
sudo tee /etc/nginx/sites-available/shaydha-backend > /dev/null <<EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/shaydha-backend /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo ">>> Opening Firewall Ports..."
sudo ufw allow 80/tcp || true
sudo ufw allow 443/tcp || true
sudo ufw allow 22/tcp || true

echo "=============================================================================="
echo "✅ SHAYDHA TECHNOLOGIES Backend is LIVE on AWS Free Tier EC2!"
echo "📡 Test it with: curl http://localhost/api/health"
echo "=============================================================================="
