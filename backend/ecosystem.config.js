module.exports = {
  apps: [{
    name: 'hrahra-auth',
    script: 'auth.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      SESSION_SECRET: process.env.SESSION_SECRET
    }
  }]
}
