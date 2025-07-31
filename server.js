const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const Reverso = require('./src/reverso');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Reverso
const reverso = new Reverso();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Reverso API Server',
        version: '1.0.0',
        endpoints: {
            translation: '/api/translate',
            context: '/api/context',
            spellcheck: '/api/spellcheck',
            synonyms: '/api/synonyms'
        },
        example: {
            translation: '/api/translate?text=hello&from=english&to=portuguese',
            context: '/api/context?text=good morning&from=english&to=portuguese',
            spellcheck: '/api/spellcheck?text=helo world&lang=english',
            synonyms: '/api/synonyms?text=beautiful&lang=english'
        }
    });
});

// Translation endpoint
app.get('/api/translate', (req, res) => {
    const { text, from, to } = req.query;
    
    if (!text || !from || !to) {
        return res.status(400).json({
            error: 'Missing required parameters: text, from, to'
        });
    }

    reverso.getTranslation(text, from, to, (err, response) => {
        if (err) {
            return res.status(500).json({
                error: 'Translation failed',
                message: err.message
            });
        }
        res.json(response);
    });
});

// Context examples endpoint
app.get('/api/context', (req, res) => {
    const { text, from, to } = req.query;
    
    if (!text || !from || !to) {
        return res.status(400).json({
            error: 'Missing required parameters: text, from, to'
        });
    }

    reverso.getContext(text, from, to, (err, response) => {
        if (err) {
            return res.status(500).json({
                error: 'Context retrieval failed',
                message: err.message
            });
        }
        res.json(response);
    });
});

// Spell check endpoint
app.get('/api/spellcheck', (req, res) => {
    const { text, lang } = req.query;
    
    if (!text || !lang) {
        return res.status(400).json({
            error: 'Missing required parameters: text, lang'
        });
    }

    reverso.getSpellCheck(text, lang, (err, response) => {
        if (err) {
            return res.status(500).json({
                error: 'Spell check failed',
                message: err.message
            });
        }
        res.json(response);
    });
});

// Synonyms endpoint
app.get('/api/synonyms', (req, res) => {
    const { text, lang } = req.query;
    
    if (!text || !lang) {
        return res.status(400).json({
            error: 'Missing required parameters: text, lang'
        });
    }

    reverso.getSynonyms(text, lang, (err, response) => {
        if (err) {
            return res.status(500).json({
                error: 'Synonyms retrieval failed',
                message: err.message
            });
        }
        res.json(response);
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        availableEndpoints: [
            'GET /',
            'GET /api/translate',
            'GET /api/context',
            'GET /api/spellcheck',
            'GET /api/synonyms',
            'GET /health'
        ]
    });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Reverso API Server running on port ${port}`);
    console.log(`📖 API Documentation: http://localhost:${port}/`);
});

module.exports = app;
