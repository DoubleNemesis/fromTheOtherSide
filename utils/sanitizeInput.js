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

export function sanitizeInput(body) {
    if (!body || typeof body !== 'object') {
      throw new Error('Invalid input')
    }
    return sanitizeFields(body);
  }