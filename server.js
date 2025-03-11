import { createServer } from "http";
import path from "path";
import { sendResponse } from "./utils/sendResponse.js";
import { getContentType } from "./utils/getContentType.js";
import { fileURLToPath } from "url";
import logger from "./middleware/logger.js";
import sanitizeInput from "./middleware/sanitizeInput.js";
import fs from "fs/promises";
import { getData } from "./utils/getData.js";
import { addNewSighting } from "./utils/addNewSighting.js";
import { parseJSONBody } from "./utils/parseJSON.js";

console.log(typeof JSON.stringify({ error: "err.message" })) 

const PORT = 8002;

const server = createServer(async (req, res) => {
  logger(req, res, async () => {
    if (req.url === "/api" && req.method === "GET") {
      const data = await getData();
      const content = JSON.stringify(data)
      sendResponse(res, 200, "application/json", content);
    } else if (req.url === "/api/submit" && req.method === "POST") {
      req.body = await parseJSONBody(req);
      try {
        sanitizeInput(req, res, async () => {
          await addNewSighting(req.body);
          const content = JSON.stringify(req.body)
          sendResponse(res, 201, "application/json", content); 
        });
      } catch (err) {
        sendResponse(res, 400, "application/json", JSON.stringify({ error: err.message }));
      }
    } else {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const publicDir = path.join(__dirname, "public");
      let filePath = path.join(
        publicDir,
        req.url === "/" ? "index.html" : req.url
      );
      const extname = path.extname(filePath);
      const contentType = getContentType(extname);
      try {
        const content = await fs.readFile(filePath);
        sendResponse(res, 200, contentType, content);
      } catch (err) {
        if (err.code === "ENOENT") {
          const content = await fs.readFile(path.join(publicDir, "404.html"));
          sendResponse(res, 404, "text/html", content);
        } else {
          sendResponse(res, 500, "text/html", `Server Error: ${err.code}`);
        }
      }
    }
  });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
