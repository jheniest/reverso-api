const Reverso = require('../src/reverso');

let reverso;
try {
    reverso = new Reverso();
} catch (error) {
    console.error('Error loading Reverso module:', error.message);
}

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { text, from, to } = req.query;
    
    if (!text || !from || !to) {
        return res.status(400).json({
            error: 'Missing required parameters: text, from, to'
        });
    }

    if (!reverso) {
        return res.status(500).json({
            error: 'Reverso module failed to load'
        });
    }

    try {
        reverso.getTranslation(text, from, to, (err, response) => {
            if (err) {
                return res.status(500).json({
                    error: 'Translation failed',
                    message: err.message
                });
            }
            res.json(response);
        });
    } catch (error) {
        res.status(500).json({
            error: 'Translation failed',
            message: error.message
        });
    }
}
