import fs from "fs/promises";
import { existsSync } from "fs";
import { dirname } from "path";

const logFilePath = "./logs/server.log";
const logDir = dirname(logFilePath);

// Ensure log directory exists
if (!existsSync(logDir)) {
  fs.mkdir(logDir, { recursive: true }).catch(console.error);
}

export default function logger(req, res, next) {
  const startTime = Date.now();
  const timeStamp = new Date().toISOString();

  const originalEnd = res.end;
  res.end = (...args) => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    const logEntry = `${timeStamp} || ${req.method} ${req.url} || Status: ${statusCode} || ${duration}ms`;
    const prefix = statusCode >= 400 ? "[ERROR] " : "";

    fs.appendFile(logFilePath, prefix + logEntry + "\n").catch(console.error);

    if (statusCode >= 400) {
      console.error(logEntry);
    }

    originalEnd(...args); // ✅ simple and safe
  };

  next();
}


/*
MINIMAL LOGGER
import fs from "fs/promises";

const logFilePath = "./logs/server.log";

export default function logger(req, res, next) {
  const timeStamp = new Date().toISOString();
  const logEntry = `${timeStamp} || ${req.method} ${req.url}`;

  fs.appendFile(logFilePath, logEntry + "\n").catch(console.error);

  next();
}



*/