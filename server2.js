import { createServer } from "http";
import path from "path";
import { sendResponse } from "./utils/sendResponse.js";
import { getContentType } from "./utils/getContentType.js";
import { fileURLToPath } from "url";
import logger from "./middleware/old-logger.js";
import sanitizeInput from "./middleware/sanitizeInput.js";
import fs from "fs/promises";
import { getData } from "./utils/getData.js";
import { addNewSighting } from "./utils/addNewSighting.js";
import { parseJSONBody } from "./utils/parseJSON.js";

const PORT = 8002;

const server = createServer(async (req, res) => {
  logger(req, res, async () => {
    if (req.url === "/api" && req.method === "GET") {
      const data = await getData();
      // res.setHeader("Content-Type", "application/json");
      // res.statusCode = 200;
      // res.end(JSON.stringify(data));
      const content = JSON.stringify(data)
      sendResponse(res, 200, "application/json", content);
    } else if (req.url === "/api/submit" && req.method === "POST") {
      req.body = await parseJSONBody(req);
      console.log('req.body: ', req.body)
      sanitizeInput(req, res, () => {
        // res.statusCode = 201;
        // res.end(JSON.stringify(req.body));
        const content = JSON.stringify(req.body)
        sendResponse(res, 201, "application/json", content);
        addNewSighting(req.body);
      });
    } else {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const publicDir = path.join(__dirname, "public"); //"./public if it fails"
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
