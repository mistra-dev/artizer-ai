import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './src/routes/index.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 4215;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
// ============================================================================
app.use('/', router);
app.use((err, res) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'An error occurred on the server'
    });
});

// ============================================================================
app.use((res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// ============================================================================
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

export default app;