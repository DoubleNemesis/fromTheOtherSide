import path from "path";
import fs from "fs/promises";
import { getContentType } from "./getContentType.js";
import { sendJSONResponse } from "./sendJSONResponse.js";

export async function serveStaticFile(req, res, baseDir) {
    
  const publicDir = path.join(baseDir, "public");
  const filePath = path.join(
    publicDir,
    req.url === "/" ? "index.html" : req.url
  );
  const extname = path.extname(filePath);
  const contentType = getContentType(extname);

  try {
    const content = await fs.readFile(filePath);
    sendJSONResponse(res, 200, contentType, content);
  } catch (err) {
    // console.log(err)
    if (err.code === "ENOENT") {
      const content = await fs.readFile(path.join(publicDir, "404.html"));
      sendJSONResponse(res, 404, "text/html", content);
    } else {
      sendJSONResponse(res, 500, "text/html", `Server Error: ${err.code}`);
    }
  }
}
