// server/auth.js - Place this in your backend service
// This runs separately from your React frontend (Node.js/Express example)

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
    // Store user profile in session
    return done(null, profile)
  }
))

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

// Your frontend hits this endpoint
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// Google redirects here after auth
app.get('/api/auth/google/callback',
  passport.authenticate('google', { 
    successRedirect: 'https://hrahra.org/dashboard',
    failureRedirect: 'https://hrahra.org/' 
  })
)

app.get('/api/auth/logout', (req, res) => {
  req.logout()
  res.redirect('https://hrahra.org/')
})

app.get('/api/auth/user', (req, res) => {
  res.json(req.user || null)
})

app.listen(8080, () => {
  console.log('Auth server running on port 8080')
})
