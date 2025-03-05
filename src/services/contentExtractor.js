import * as cheerio from 'cheerio';
import axios from 'axios';
import { isValidUrl } from '../utils/urlValidator.js';

/**
 * Extracts the main content from a news article URL
 * 
 * @param {string} url - The URL of the news article to extract content from
 * @returns {Promise<Object>} Extracted content object
 * @property {string} content - The cleaned main content of the article
 * 
 * @throws {Error} When URL is invalid or content cannot be extracted
 * 
 * @example
 * // Extract content from a news article
 * const { content } = await extractContent('https://news.example.com/article');
 * 
 * @description
 * This function:
 * 1. Validates the input URL
 * 2. Fetches the webpage content
 * 3. Removes unnecessary elements (ads, navigation, etc.)
 * 4. Attempts to extract main content using common selectors
 * 5. Cleans and formats the extracted content
 * 
 * Supported news sites include:
 * - Detik (.detail__body-text)
 * - Kompas (.itp_bodycontent)
 * - Tribun (.read__content)
 * - And other common article layouts
 */
export async function extractContent(url) {
    try {
        // Validate URL
        if (!isValidUrl(url)) {
            throw new Error('URL tidak valid');
        }

// ============================================================================
// Fetch webpage content
// ============================================================================
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        
        // Remove unnecessary elements
        const elementsToRemove = [
            'nav',
            'script',
            'style',
            'iframe',
            'header',
            'footer',
            '.ads',
            '.social-share',
            '.related-posts',
            '.comments'
        ];
        $(elementsToRemove.join(', ')).remove();

// ============================================================================
// Define possible content selectors
// ============================================================================
        const possibleSelectors = [
            // Generic article selectors
            'article', 
            '.article-content',
            '.post-content',
            '.entry-content',
            '.content-body',
            'main',
            '#main-content',
            
            // Indonesia-specific news sites
            '.detail__body-text',  // Detik
            '.itp_bodycontent',    // Kompas
            '.read__content',      // Tribun
            '.detail-text'         // Other media
        ];

// ============================================================================
// Try to find content using selectors
// ============================================================================
        let content = '';
        for (const selector of possibleSelectors) {
            const element = $(selector);
            if (element.length > 0) {
                content = element.text().trim();
                break;
            }
        }

// ============================================================================
// Fallback to paragraphs if no content found
// ============================================================================
        if (!content) {
            content = $('p')
                .map((_, el) => $(el).text().trim())
                .get()
                .join('\n\n');
        }

// ============================================================================
// Clean and format content
// ============================================================================
        content = content
            // Remove extra whitespace
            .replace(/\s+/g, ' ')
            // Standardize line breaks
            .replace(/\n\s*\n/g, '\n\n')
            // Remove URLs
            .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
            // Remove common Indonesian article phrases
            .replace(/Baca juga:.*$/gm, '')
            .replace(/Baca Juga:.*$/gm, '')
            .replace(/BACA JUGA:.*$/gm, '')
            .trim();

        return { content };
    } catch (error) {
        console.error('Error extracting content:', error);
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            'Failed to extract content from URL'
        );
    }
} 