import { createServer } from "http";
import logger from "./middleware/logger.js";
import { serveStaticFile } from "./utils/serveStaticFile.js";
import { handleGet, handlePost } from "./handlers/routeHandlers.js";

const PORT = 8002;
const __dirname = import.meta.dirname;

const server = createServer(async (req, res) => {
  logger(req, res, async () => {
    if (req.url === "/api") {
      if (req.method === "GET") {
        return await handleGet(req, res)
      } else if (req.method === "POST") {
        return await handlePost(req, res)
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" })
        res.end("Method Not Allowed")
        return
      }
    } else if (!req.url.startsWith("/api") && req.method === "GET") {
      return await serveStaticFile(req, res, __dirname);
    }
  })
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
