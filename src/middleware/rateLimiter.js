import rateLimit from 'express-rate-limit';

/**
 * Rate limiter middleware configuration
 * Limits API requests to 10 requests per minute per IP
 * Excludes localhost/development environment
 * 
 * @param {Object} req - Express request object
 * @returns {boolean|number} Skip rate limiting for localhost, otherwise return window size
 */
export const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // 10 requests per window
    message: {
        success: false,
        error: 'Too many requests, please try again in a minute.'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    
// ============================================================================
// Skip rate limiting for localhost
// ============================================================================
    skip: (req) => {
     // const ip = req.ip || req.connection.remoteAddress;  - [deprecated] 
        const ip = req.ip || req.socket.remoteAddress;
        return ip === '127.0.0.1' || ip === '::1' || ip === 'localhost';
    },
    
// ============================================================================
// Custom handler for when rate limit is exceeded
// ============================================================================
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: 'Too many requests, please try again in a minute.',
            retryAfter: Math.ceil(req.rateLimit.resetTime / 1000) // Time in seconds
        });
    }
}); 