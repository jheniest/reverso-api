const Reverso = require('../src/reverso');

let reverso;
try {
    reverso = new Reverso();
} catch (error) {
    console.error('Error loading Reverso module:', error.message);
}

module.exports = async function handler(req, res) {
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
                console.error('Translation error:', err);
                return res.status(500).json({
                    error: 'Translation failed',
                    message: err.message
                });
            }
            
            if (!response || !response.ok) {
                console.error('Invalid translation response:', response);
                return res.status(500).json({
                    error: 'Translation failed',
                    message: 'Invalid response from translation service'
                });
            }
            
            res.json(response);
        });
    } catch (error) {
        console.error('Translation catch error:', error);
        res.status(500).json({
            error: 'Translation failed',
            message: error.message
        });
    }
}
