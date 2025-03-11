export function getContentType(extname){
    let contentType = ""
    switch (extname) {
         case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
        case ".jpeg":
            contentType = "image/jpeg";
            break;
        case ".gif":
            contentType = "image/gif";
            break;
        case ".svg":
            contentType = "image/svg+xml";
            break;
        default:
            contentType = "text/html";
            break;
    }
    return contentType
}