const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const ingestionRoutes = require('./routes/ingestion');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const db = require('./config/db');
const { createTables } = require('./models/init');
const passport = require('./config/passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5050; // Use 5050 to avoid conflict with "Audit Service" on 5000

// Initialize DB
createTables();

// Middleware
// app.use(helmet()); // Temporarily disabled for debugging NetworkError
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.FRONTEND_URL,
            'http://localhost:3000',
            'http://localhost:3001',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:3001'
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Must be false for local http dev
        httpOnly: true,
        sameSite: 'lax', // Use 'lax' for local dev cross-origin redirects
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// Health Check (Priority)
app.get('/health', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.status(200).json({ status: 'OK', database: 'Connected' });
    } catch (err) {
        console.error('Health check failed', err);
        res.status(500).json({ status: 'ERROR', database: 'Disconnected', error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('WANTED Backend is running on port 5000');
});

// Routes
app.use('/auth', authRoutes);
app.use('/ingest', ingestionRoutes);
app.use('/api', apiRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
