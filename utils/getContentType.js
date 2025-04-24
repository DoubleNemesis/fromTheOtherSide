export function getContentType(extname) {
    const types = {
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml"
    };
  
    return types[extname.toLowerCase()] || "text/html";
  }