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
                wallet_balance DECIMAL(10, 2) DEFAULT 0.00,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS issues (
                id SERIAL PRIMARY KEY,
                repo_id VARCHAR(255) NOT NULL,
                issue_number INTEGER NOT NULL,
                title VARCHAR(255) NOT NULL,
                difficulty VARCHAR(50),
                bounty_amount DECIMAL(10, 2) DEFAULT 0.00,
                status VARCHAR(50) DEFAULT 'OPEN',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(repo_id, issue_number)
            );

            CREATE TABLE IF NOT EXISTS bounties (
                id SERIAL PRIMARY KEY,
                issue_id INTEGER REFERENCES issues(id),
                sponsor_id INTEGER REFERENCES users(id),
                amount DECIMAL(10, 2) NOT NULL,
                currency VARCHAR(10) DEFAULT 'USD',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
            'ALTER TABLE users ADD COLUMN IF NOT EXISTS wallet_balance DECIMAL(10, 2) DEFAULT 0.00',
            'ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT',
            'ALTER TABLE users ADD COLUMN IF NOT EXISTS portfolio_url TEXT',
            'ALTER TABLE users ADD COLUMN IF NOT EXISTS twitter_handle TEXT'
        ];

        for (const query of alterQueries) {
            await db.query(query);
        }

        console.log('Tables created and schema verified successfully');
    } catch (err) {
        console.error('Error creating tables', err);
    }
};

module.exports = { createTables };
