const db = require('../config/db');

exports.createClaim = async (req, res) => {
    const { issue_id } = req.body;
    const user_id = req.user ? req.user.id : null;

    if (!user_id) {
        return res.status(401).json({ error: 'Unauthorized. Please login.' });
    }

    try {
        // Check if already claimed by this user
        const check = await db.query('SELECT * FROM claims WHERE issue_id = $1 AND user_id = $2', [issue_id, user_id]);
        if (check.rows.length > 0) {
            return res.status(400).json({ error: 'You have already claimed this bounty.' });
        }

        const { rows } = await db.query(
            'INSERT INTO claims (issue_id, user_id, status) VALUES ($1, $2, $3) RETURNING *',
            [issue_id, user_id, 'IN_PROGRESS']
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('Error creating claim:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.getMyClaims = async (req, res) => {
    const user_id = req.user ? req.user.id : null;

    if (!user_id) {
        return res.status(401).json({ error: 'Unauthorized. Please login.' });
    }

    try {
        const query = `
            SELECT c.id as claim_id, c.status as claim_status, c.created_at as claim_date,
                   i.id as issue_id, i.repo_id, i.title, i.xp_reward, i.difficulty, i.html_url
            FROM claims c
            JOIN issues i ON c.issue_id = i.id
            WHERE c.user_id = $1
            ORDER BY c.created_at DESC
        `;
        const { rows } = await db.query(query, [user_id]);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching claims:', err);
        res.status(500).json({ error: err.message });
    }
};
