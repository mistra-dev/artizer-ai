import axios from 'axios';
import { prompts } from '../config/prompts.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// Configuration setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const configPath = join(__dirname, '../../config.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));
const { apiKey, apiUrl } = config.gemini;

/**
 * Analyzes article content using Google's Gemini AI API
 * 
 * @param {Object} articleData - The article data to be analyzed
 * @param {string} articleData.content - The main content of the article
 * @param {string} [analysisType='complete'] - Type of analysis to perform:
 *   - 'complete': Full detailed analysis
 *   - 'summary': Brief summary
 *   - 'advanced': In-depth analysis
 *   - 'custom': Custom prompt analysis
 * @param {string} [language='id'] - Language for the analysis output:
 *   - 'id': Indonesian
 *   - 'en': English
 * @param {string} [customPrompt=''] - Custom prompt to use when analysisType is 'custom'
 * 
 * @returns {Promise<Object>} Analysis result
 * @property {string} aiAnalysis - The AI-generated analysis
 * @property {string} rawContent - The original article content
 * 
 * @throws {Error} When API request fails or invalid parameters are provided
 * 
 * @example
 * // Complete analysis in Indonesian
 * const result = await analyzeWithGemini(
 *   { content: "Article content here" },
 *   'complete',
 *   'id'
 * );
 * 
 * // Custom analysis in English
 * const result = await analyzeWithGemini(
 *   { content: "Article content here" },
 *   'custom',
 *   'en',
 *   'Analyze this article focusing on economic impact'
 * );
 */
export async function analyzeWithGemini(
    articleData, 
    analysisType = 'complete', 
    language = 'id', 
    customPrompt = ''
) {
    try {
        // Determine which prompt to use
        let prompt;
        if (analysisType === 'custom' && customPrompt) {
            prompt = customPrompt + (language === 'en' ? '\n\nANSWER IN ENGLISH' : '');
        } else {
            // Validate analysis type
            if (!prompts[analysisType]) {
                throw new Error(`Invalid analysis type: ${analysisType}`);
            }
            // Validate language
            if (!prompts[analysisType][language]) {
                throw new Error(`Invalid language: ${language}`);
            }
            prompt = prompts[analysisType][language];
        }

// ============================================================================
// Append article content to prompt
// ============================================================================
        prompt += `\n\nKonten artikel untuk dianalisis:\n${articleData.content}`;

// ============================================================================
// Make API request
// ============================================================================
        const response = await axios.post(
            `${apiUrl}?key=${apiKey}`,
            {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

// ============================================================================
// Return analysis results
// ============================================================================
        return {
            aiAnalysis: response.data.candidates[0].content.parts[0].text,
            rawContent: articleData.content
        };
    } catch (error) {
        console.error('Error analyzing with Gemini:', error);
        throw new Error(
            error.response?.data?.error?.message || 
            error.message || 
            'Failed to analyze content'
        );
    }
} 