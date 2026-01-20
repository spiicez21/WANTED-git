const db = require('../config/db');

exports.getActivityHeatmap = async (req, res) => {
    const userId = req.query.userId || (req.user ? req.user.id : null);

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Query to get daily counts of submissions and duels for the last year
        const queryText = `
            WITH RECURSIVE days AS (
                SELECT CURRENT_DATE - INTERVAL '1 year' + INTERVAL '1 day' AS day
                UNION ALL
                SELECT day + INTERVAL '1 day' FROM days WHERE day < CURRENT_DATE
            ),
            activity AS (
                -- Submissions activity
                SELECT DATE(created_at) as activity_date, COUNT(*) as count
                FROM submissions
                WHERE user_id = $1 AND created_at >= CURRENT_DATE - INTERVAL '1 year'
                GROUP BY 1
                
                UNION ALL
                
                -- Duels activity
                SELECT DATE(created_at) as activity_date, COUNT(*) as count
                FROM duels
                WHERE (player1_id = $1 OR player2_id = $1) AND created_at >= CURRENT_DATE - INTERVAL '1 year'
                GROUP BY 1
            ),
            aggregated_activity AS (
                SELECT activity_date, SUM(count) as total_count
                FROM activity
                GROUP BY 1
            )
            SELECT 
                days.day as date,
                COALESCE(aggregated_activity.total_count, 0) as count
            FROM days
            LEFT JOIN aggregated_activity ON days.day = aggregated_activity.activity_date
            ORDER BY days.day ASC;
        `;

        const result = await db.query(queryText, [userId]);

        // Transform the flat results into the "weeks" structure expected by the frontend
        const weeks = [];
        let currentWeek = { contributionDays: [] };
        let totalContributions = 0;

        result.rows.forEach((row, index) => {
            const count = parseInt(row.count);
            totalContributions += count;

            currentWeek.contributionDays.push({
                date: row.date.toISOString().split('T')[0],
                contributionCount: count,
                color: '' // Color logic moved to frontend
            });

            // Every 7 days (or at the end), push the week
            if (currentWeek.contributionDays.length === 7 || index === result.rows.length - 1) {
                weeks.push(currentWeek);
                currentWeek = { contributionDays: [] };
            }
        });

        res.json({
            totalContributions,
            weeks
        });
    } catch (err) {
        console.error('Error fetching activity heatmap:', err);
        res.status(500).json({ error: 'Failed to fetch activity heatmap data' });
    }
};
