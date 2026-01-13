const db = require('../config/db');
const axios = require('axios');

exports.getAllIssues = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM issues');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createIssue = async (req, res) => {
    const { repo_id, issue_number, title, difficulty } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO issues (repo_id, issue_number, title, difficulty) VALUES ($1, $2, $3, $4) RETURNING *',
            [repo_id, issue_number, title, difficulty]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.convertIssue = async (req, res) => {
    const { repo_id, issue_number, title, html_url, comments, labels } = req.body;

    // Fetch repo details to get star count
    let starCount = 0;
    // repo_id is expected to be "owner/repo"
    try {
        // We can use a public token or just public access (rate limited)
        // Ideally we should use the user's token if available in req.user
        const token = req.user && req.user.access_token ? req.user.access_token : null;
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

        const repoRes = await axios.get(`https://api.github.com/repos/${repo_id}`, { headers });
        starCount = repoRes.data.stargazers_count;
    } catch (fetchErr) {
        console.error('Failed to fetch repo stars:', fetchErr.message);
        // Fallback: assume 0 or passed value if we decided to keep it
    }

    // 1. Calculate Difficulty & XP Heuristic
    let difficulty = 'Rookie';
    let xp_reward = 250;

    // const starCount = parseInt(stars || 0);

    if (starCount > 25000) {
        difficulty = 'Architect';
        xp_reward = 5000;
    } else if (starCount > 10000) {
        difficulty = 'Expert';
        xp_reward = 2500;
    } else if (starCount > 1000) {
        difficulty = 'Specialist';
        xp_reward = 1000;
    } else if (starCount > 100) {
        difficulty = 'Contributor';
        xp_reward = 500;
    }

    // 2. Generate Tags
    // Use labels if available, otherwise just use difficulty
    let tags = labels && labels.length > 0 ? labels.map(l => l.name) : ['Bug'];

    try {
        // Check if already exists to avoid duplicates
        const check = await db.query('SELECT * FROM issues WHERE repo_id = $1 AND issue_number = $2', [repo_id, issue_number]);
        if (check.rows.length > 0) {
            return res.status(200).json({ message: 'Issue already exists', issue: check.rows[0] });
        }

        // 3. Insert into DB
        const { rows } = await db.query(
            `INSERT INTO issues 
            (repo_id, issue_number, title, difficulty, xp_reward, tags, html_url, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, 'OPEN') 
            RETURNING *`,
            [repo_id, issue_number, title, difficulty, xp_reward, tags, html_url]
        );

        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('Error converting issue:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.getIssueById = async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid Issue ID' });
    }
    try {
        const { rows } = await db.query('SELECT * FROM issues WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
