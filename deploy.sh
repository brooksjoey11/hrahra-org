#!/bin/bash
# deploy.sh - Production deployment script

set -e

echo "🚀 Deploying HRAHRA Portal"

# Install dependencies
npm ci --production=false

# Run typecheck
npm run typecheck

# Run tests
npm run test:ci

# Build application
npm run build

# Copy to OpenResty directory
sudo rm -rf /opt/1panel/apps/openresty/openresty/www/sites/hrahra.org/index/*
sudo cp -r dist/* /opt/1panel/apps/openresty/openresty/www/sites/hrahra.org/index/

# Set permissions
sudo chown -R www-data:www-data /opt/1panel/apps/openresty/openresty/www/sites/hrahra.org/index/

# Reload OpenResty
sudo openresty -s reload

echo "✅ Deployment complete"
