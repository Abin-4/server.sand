require('dotenv').config();
require('./db.js'); // Ensure your database connection is set up
const express = require("express");
const cors = require("cors");
const router = require('./router.js'); // Your API routes

const app = express();

// CORS Configuration (Strict for Production)
const allowedOrigins = [
  'https://front-sand-alpha.vercel.app',
  'https://front-sand-alpha.vercel.app/' // Optional: With trailing slash
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200 // Legacy browsers may fail on 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Explicitly handle OPTIONS requests for all routes (Preflight)
app.options('*', cors(corsOptions));

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use( router); // Prefix all routes with '/api' (recommended)

// Health Check Endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
