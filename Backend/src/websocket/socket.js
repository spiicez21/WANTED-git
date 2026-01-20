const { Server } = require('socket.io');
const db = require('../config/db');
const { updateUserXP, REWARDS, PENALTIES } = require('../services/xpService');
const { evaluateSubmission } = require('../services/judging');

let io;
const matchmakingQueue = [];

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:3001',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('join_matchmaking', async (userData) => {
            console.log('User joining matchmaking:', userData.username);

            // Basic matchmaking: pair immediate next player
            matchmakingQueue.push({ socket, userData });

            if (matchmakingQueue.length >= 2) {
                const player1 = matchmakingQueue.shift();
                const player2 = matchmakingQueue.shift();

                const duelId = await createDuel(player1.userData, player2.userData);

                player1.socket.emit('match_found', { duelId, opponent: player2.userData });
                player2.socket.emit('match_found', { duelId, opponent: player1.userData });

                player1.socket.join(`duel_${duelId}`);
                player2.socket.join(`duel_${duelId}`);

                console.log(`Duel ${duelId} started between ${player1.userData.username} and ${player2.userData.username}`);
            }
        });

        socket.on('submit_code', async (data) => {
            const { duelId, userId, code, problemId } = data;

            // Logic to evaluate submission and notify room
            const problemRes = await db.query('SELECT * FROM problems WHERE id = $1', [problemId]);
            const problem = problemRes.rows[0];

            // Start time would ideally be stored in the duel record
            const duelRes = await db.query('SELECT started_at FROM duels WHERE id = $1', [duelId]);
            const startTime = duelRes.rows[0].started_at;

            const result = await evaluateSubmission(null, code, problem, startTime);

            io.to(`duel_${duelId}`).emit('submission_result', { userId, result });

            // Update DB and XP if correct
            if (result.status === 'ACCEPTED') {
                // Handle duel completion logic
                await completeDuel(duelId, userId, result.score);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            // Remove from queue if present
            const index = matchmakingQueue.findIndex(p => p.socket.id === socket.id);
            if (index !== -1) matchmakingQueue.splice(index, 1);
        });
    });

    return io;
};

const createDuel = async (p1, p2) => {
    // Select a random problem (placeholder logic)
    const probRes = await db.query('SELECT id FROM problems ORDER BY RANDOM() LIMIT 1');
    const problemId = probRes.rows[0]?.id || 1;

    const res = await db.query(
        'INSERT INTO duels (player1_id, player2_id, problem_id, started_at, status) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4) RETURNING id',
        [p1.id, p2.id, problemId, 'IN_PROGRESS']
    );
    return res.rows[0].id;
};

const completeDuel = async (duelId, winnerId, score) => {
    await db.query(
        'UPDATE duels SET winner_id = $1, status = $2, ended_at = CURRENT_TIMESTAMP WHERE id = $3',
        [winnerId, 'COMPLETED', duelId]
    );

    // Reward winner
    await updateUserXP(winnerId, REWARDS.DUEL_WIN);

    // Penalty for loser? (Optional based on requirements)
    const duelRes = await db.query('SELECT player1_id, player2_id FROM duels WHERE id = $1', [duelId]);
    const { player1_id, player2_id } = duelRes.rows[0];
    const loserId = player1_id === winnerId ? player2_id : player1_id;
    await updateUserXP(loserId, PENALTIES.DUEL_LOSS, true);

    io.to(`duel_${duelId}`).emit('duel_completed', { winnerId, score });
};

module.exports = { initSocket };
