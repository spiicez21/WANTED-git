const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email', 'read:user'] }));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        console.log('GitHub Callback Reached. User authenticated:', req.isAuthenticated());
        // Successful authentication, redirect to frontend profile page.
        res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000/profile');
    }
);

router.get('/me', (req, res) => {
    console.log('Session Me Check. Authenticated:', req.isAuthenticated());
    if (req.isAuthenticated()) {
        console.log('User found in session:', req.user.username);
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
