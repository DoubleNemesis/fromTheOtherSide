import fs from "fs/promises";

const logFilePath = "./logs/server.log"; // Path for log storage

export default function logger(req, res, next) {
    const startTime = Date.now();
    const timeStamp = new Date().toISOString();
    
    // Capture request details
    const logEntry = `${timeStamp} || ${req.method} ${req.url}`;
    // console.log(logEntry);

    // Write log to file
    fs.appendFile(logFilePath, logEntry + "\n").catch(console.error);

    // Capture response status and errors
    const originalEnd = res.end;
    res.end = function (chunk, encoding) {
        const duration = Date.now() - startTime;
        const statusCode = res.statusCode;
        
        const logResponse = `${timeStamp} || ${req.method} ${req.url} || Status: ${statusCode} || ${duration}ms`;

        // Log only errors
        if (statusCode >= 400) {
            console.error(logResponse);
            fs.appendFile(logFilePath, "[ERROR] " + logResponse + "\n").catch(console.error);
        } else {
            fs.appendFile(logFilePath, logResponse + "\n").catch(console.error);
        }

        originalEnd.apply(res, [chunk, encoding]); // Call original end method
    };

    next();
}




