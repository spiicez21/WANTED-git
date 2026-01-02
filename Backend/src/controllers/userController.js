const db = require('../config/db');

exports.getAllUsers = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserByGithubId = async (req, res) => {
    const { github_id } = req.params;
    try {
        const { rows } = await db.query('SELECT * FROM users WHERE github_id = $1', [github_id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    const { github_id, username } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO users (github_id, username) VALUES ($1, $2) RETURNING *',
            [github_id, username]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const { username, bio, portfolio_url, twitter_handle } = req.body;
    const userId = req.user.id;

    try {
        const query = `
            UPDATE users 
            SET username = $1, bio = $2, portfolio_url = $3, twitter_handle = $4
            WHERE id = $5
            RETURNING *
        `;
        const values = [username || req.user.username, bio, portfolio_url, twitter_handle, userId];

        const result = await db.query(query, values);

        // Update user in session
        req.login(result.rows[0], (err) => {
            if (err) {
                console.error('Session update error:', err);
            }
            res.json(result.rows[0]);
        });
    } catch (err) {
        console.error('Profile update error:', err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

exports.getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const { rows } = await db.query('SELECT id, github_id, username, avatar_url, xp, rank, wallet_balance, bio, portfolio_url, twitter_handle FROM users WHERE username = $1', [username]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
