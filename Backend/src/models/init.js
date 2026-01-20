const db = require('../config/db');

const createTables = async () => {
    try {
        const queryText = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                github_id VARCHAR(255) UNIQUE NOT NULL,
                username VARCHAR(255),
                email VARCHAR(255),
                avatar_url TEXT,
                access_token TEXT,
                xp INTEGER DEFAULT 0,
                rank VARCHAR(50) DEFAULT 'Rookie',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS problems (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                difficulty VARCHAR(50) NOT NULL,
                xp_reward INTEGER NOT NULL,
                time_limit INTEGER DEFAULT 2000, -- ms
                memory_limit INTEGER DEFAULT 128, -- MB
                test_cases JSONB,
                hidden_test_cases JSONB,
                expected_complexity_time VARCHAR(255),
                expected_complexity_space VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS duels (
                id SERIAL PRIMARY KEY,
                player1_id INTEGER REFERENCES users(id),
                player2_id INTEGER REFERENCES users(id),
                problem_id INTEGER REFERENCES problems(id),
                winner_id INTEGER REFERENCES users(id),
                status VARCHAR(50) DEFAULT 'MATCHMAKING',
                player1_score DECIMAL(10, 2) DEFAULT 0.00,
                player2_score DECIMAL(10, 2) DEFAULT 0.00,
                started_at TIMESTAMP,
                ended_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS submissions (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                problem_id INTEGER REFERENCES problems(id),
                duel_id INTEGER REFERENCES duels(id),
                code TEXT NOT NULL,
                language VARCHAR(50) NOT NULL,
                status VARCHAR(50) DEFAULT 'PENDING',
                execution_time INTEGER, -- ms
                memory_usage INTEGER, -- KB
                score DECIMAL(10, 2) DEFAULT 0.00,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS badges (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                icon_url TEXT,
                type VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS user_badges (
                user_id INTEGER REFERENCES users(id),
                badge_id INTEGER REFERENCES badges(id),
                earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, badge_id)
            );
        `;

        await db.query(queryText);

        // Ensure columns exist in case table was created with an older schema
        const alterQueries = [
            'ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(255)',
            'ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT',
            'ALTER TABLE users ADD COLUMN IF NOT EXISTS access_token TEXT',
            'ALTER TABLE users ADD COLUMN IF NOT EXISTS xp INTEGER DEFAULT 0',
            'ALTER TABLE users ADD COLUMN IF NOT EXISTS rank VARCHAR(50) DEFAULT \'Rookie\'',
            'ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT',
            'ALTER TABLE users ADD COLUMN IF NOT EXISTS portfolio_url TEXT',
            'ALTER TABLE users ADD COLUMN IF NOT EXISTS twitter_handle TEXT'
        ];

        for (const query of alterQueries) {
            await db.query(query);
        }

        // Seed sample problems
        const problemCount = await db.query('SELECT COUNT(*) FROM problems');
        if (parseInt(problemCount.rows[0].count) === 0) {
            const sampleProblems = [
                {
                    title: 'Two Sum',
                    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
                    difficulty: 'Easy',
                    xp_reward: 30,
                    time_limit: 2000,
                    memory_limit: 128,
                    test_cases: JSON.stringify([{ input: '[2,7,11,15], 9', output: '[0,1]' }]),
                    hidden_test_cases: JSON.stringify([{ input: '[3,2,4], 6', output: '[1,2]' }]),
                    expected_complexity_time: 'O(n)',
                    expected_complexity_space: 'O(n)'
                },
                {
                    title: 'Reverse Linked List',
                    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
                    difficulty: 'Easy',
                    xp_reward: 30,
                    time_limit: 2000,
                    memory_limit: 128,
                    test_cases: JSON.stringify([{ input: '[1,2,3,4,5]', output: '[5,4,3,2,1]' }]),
                    hidden_test_cases: JSON.stringify([{ input: '[1,2]', output: '[2,1]' }]),
                    expected_complexity_time: 'O(n)',
                    expected_complexity_space: 'O(1)'
                }
            ];

            for (const p of sampleProblems) {
                await db.query(
                    'INSERT INTO problems (title, description, difficulty, xp_reward, time_limit, memory_limit, test_cases, hidden_test_cases, expected_complexity_time, expected_complexity_space) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
                    [p.title, p.description, p.difficulty, p.xp_reward, p.time_limit, p.memory_limit, p.test_cases, p.hidden_test_cases, p.expected_complexity_time, p.expected_complexity_space]
                );
            }
            console.log('Sample problems seeded');
        }

        console.log('Tables created and schema verified successfully');
    } catch (err) {
        console.error('Error creating tables', err);
    }
};

module.exports = { createTables };
