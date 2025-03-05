import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractContent } from '../services/contentExtractor.js';
import { analyzeWithGemini } from '../services/geminiAnalyzer.js';
import { isValidUrl } from '../utils/urlValidator.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.use(express.static(path.join(__dirname, '../../public')));


router.get('', (req, res) => {
    if (req.url === '/favicon.ico') {
        res.status(204).end();
        return;
    }
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});


router.get('/:url(*)', async (req, res) => {
    if (req.params.url === 'favicon.ico') {
        res.status(204).end();
        return;
    }

    try {
        const url = req.params.url;
        
        if (!url) {
            return res.status(400).json({ error: 'URL diperlukan' });
        }

        const articleData = await extractContent(url);
        const analysis = await analyzeWithGemini(articleData);

        res.json({
            success: true,
            url: url,
            analysis: analysis.aiAnalysis,
            rawContent: analysis.rawContent
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.post('/analyze', apiLimiter, async (req, res) => {
    try {
        const { url, analysisType, language, customPrompt } = req.body;
        
        if (!isValidUrl(url)) {
            throw new Error('URL tidak valid');
        }
        
        const articleData = await extractContent(url);
        const result = await analyzeWithGemini(articleData, analysisType, language, customPrompt);
        
        res.json({
            success: true,
            analysis: result.aiAnalysis
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Terjadi kesalahan saat memproses artikel'
        });
    }
});

export default router; 