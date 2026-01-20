const db = require('../config/db');

const getAllProblems = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM problems ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching problems:', err);
        res.status(500).json({ error: 'Failed to fetch problems' });
    }
};

const getProblemById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM problems WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching problem by id:', err);
        res.status(500).json({ error: 'Failed to fetch problem' });
    }
};

module.exports = {
    getAllProblems,
    getProblemById
};
