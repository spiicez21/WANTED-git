const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email', 'read:user'] }));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect to frontend dashboard.
        res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000/dashboard');
    }
);

router.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.json({ message: 'Logged out successfully' });
    });
});

module.exports = router;
