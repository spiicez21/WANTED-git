const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const db = require('./db');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        done(null, result.rows[0]);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email', 'read:user']
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log('GitHub OAuth Success:', profile.username);

            const githubId = profile.id;
            const username = profile.username;
            const email = profile.emails && profile.emails[0] ? profile.emails[0].value : (profile._json && profile._json.email);
            const avatarUrl = profile.photos && profile.photos[0] ? profile.photos[0].value : (profile._json && profile._json.avatar_url);

            console.log('User Data Extracted:', { username, email, avatarUrl });

            // Check if user exists
            let result = await db.query('SELECT * FROM users WHERE github_id = $1', [githubId]);

            if (result.rows.length === 0) {
                console.log('Creating new user...');
                result = await db.query(
                    'INSERT INTO users (github_id, username, email, avatar_url, access_token) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                    [githubId, username, email, avatarUrl, accessToken]
                );
            } else {
                console.log('Updating existing user access token...');
                result = await db.query(
                    'UPDATE users SET access_token = $1, avatar_url = $2, email = $3 WHERE github_id = $4 RETURNING *',
                    [accessToken, avatarUrl, email, githubId]
                );
            }

            return done(null, result.rows[0]);
        } catch (err) {
            console.error('Passport Strategy Error:', err);
            return done(err, null);
        }
    }));

module.exports = passport;
