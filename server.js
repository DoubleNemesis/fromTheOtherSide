import { createServer } from "http";
// import { sendJSONResponse } from "./utils/sendJSONResponse.js";
import logger from "./middleware/logger.js";
// import sanitizeInput from "./middleware/sanitizeInput.js";
// import { getData } from "./utils/getData.js";
// import { addNewSighting } from "./utils/addNewSighting.js";
// import { parseJSONBody } from "./utils/parseJSON.js";
import { serveStaticFile } from "./utils/serveStaticFile.js";
import { handleRoutes } from "./routes/router.js";

const PORT = 8002;
const __dirname = import.meta.dirname;

const server = createServer(async (req, res) => {
  logger(req, res, async () => {

    if (!await handleRoutes(req, res)) {

      await serveStaticFile(req, res, __dirname);
    }
  });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
