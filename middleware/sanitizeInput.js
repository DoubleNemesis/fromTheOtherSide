import sanitizeHtml from 'sanitize-html'
 
function sanitizeFields(data) {
    return Object.keys(data).reduce((acc, key) => {
        if (typeof data[key] === 'string') {
            acc[key] = sanitizeHtml(data[key], {
                allowedTags: [], // No HTML allowed at all
                allowedAttributes: {} //check this
            })
        } else {
            acc[key] = data[key]; // Keep non-string values as is
        }
        return acc;
    }, {});
}

export function sanitizeInput(req, res, next) {
    console.log('sanitization started')
        try {
            req.body = sanitizeFields(req.body);
            next(); // Pass to next middleware or route
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Invalid JSON format' }));
        }
}