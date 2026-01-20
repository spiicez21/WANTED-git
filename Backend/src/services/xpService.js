/**
 * XP & Rank Service
 * Manages user progression, XP rewards, and rank thresholds.
 */

const db = require('../config/db');

const RANKS = [
    { name: 'Rookie', minXP: 0 },
    { name: 'Gunslinger', minXP: 200 },
    { name: 'Outlaw', minXP: 800 },
    { name: 'Sheriff', minXP: 2000 },
    { name: 'Legend', minXP: 5000 }
];

const REWARDS = {
    SOLO_SOLVE: 30,
    MEDIUM_BONUS: 15, // Total 45
    HARD_BONUS: 30,   // Total 60
    DUEL_WIN: 120,
    PERFECT_SOLUTION: 40,
    WIN_STREAK_BONUS: 20
};

const PENALTIES = {
    DUEL_LOSS: 20,
    TIMEOUT: 40,
    SPAM: 30,
    CHEATING: 100
};

const calculateRank = (xp) => {
    let currentRank = RANKS[0].name;
    for (const rank of RANKS) {
        if (xp >= rank.minXP) {
            currentRank = rank.name;
        } else {
            break;
        }
    }
    return currentRank;
};

const updateUserXP = async (userId, amount, isPenalty = false) => {
    try {
        const change = isPenalty ? -amount : amount;

        // Fetch current XP
        const userRes = await db.query('SELECT xp FROM users WHERE id = $1', [userId]);
        if (userRes.rows.length === 0) return null;

        let newXP = Math.max(0, userRes.rows[0].xp + change);
        const newRank = calculateRank(newXP);

        // Update user
        await db.query(
            'UPDATE users SET xp = $1, rank = $2 WHERE id = $3',
            [newXP, newRank, userId]
        );

        return { xp: newXP, rank: newRank };
    } catch (err) {
        console.error('Error updating user XP:', err);
        throw err;
    }
};

module.exports = {
    REWARDS,
    PENALTIES,
    calculateRank,
    updateUserXP
};
