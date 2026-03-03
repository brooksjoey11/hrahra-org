// /opt/1panel/apps/openresty/openresty/www/sites/hrahra.org/backend/auth.js
const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const session = require('express-session')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: 'https://hrahra.org',
  credentials: true
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // You can save/update user in database here
    return done(null, profile)
  }
))

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

app.get('/api/auth/google/callback',
  passport.authenticate('google', { 
    successRedirect: 'https://hrahra.org/dashboard',
    failureRedirect: 'https://hrahra.org/' 
  })
)

app.post('/api/auth/logout', (req, res) => {
  req.logout(() => {
    res.json({ success: true })
  })
})

app.get('/api/auth/user', (req, res) => {
  res.json(req.user || null)
})

app.listen(8080, () => {
  console.log('Auth server running on port 8080')
})
