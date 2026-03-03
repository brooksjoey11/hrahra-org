#!/bin/bash
set -e

echo "🚀 Deploying HRAHRA Portal"

# Install dependencies
npm ci

# Build application
npm run build

# Copy to OpenResty directory (assuming this script is run from the project root)
sudo rm -rf /opt/1panel/apps/openresty/openresty/www/sites/hrahra.org/index/*
sudo cp -r dist/* /opt/1panel/apps/openresty/openresty/www/sites/hrahra.org/index/

# Set permissions
sudo chown -R www-data:www-data /opt/1panel/apps/openresty/openresty/www/sites/hrahra.org/index/

# Reload OpenResty
sudo openresty -s reload

echo "✅ Deployment complete"
