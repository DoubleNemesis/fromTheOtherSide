import { sendJSONResponse } from '../utils/sendJSONResponse.js';
import { parseJSONBody } from '../utils/parseJSON.js';
import { sanitizeInput } from '../middleware/sanitizeInput.js';
import { addNewSighting } from '../utils/addNewSighting.js';
import { getData } from "../utils/getData.js";

export async function handleGet(req, res) {
  const data = await getData();
  const content = JSON.stringify(data)
  sendJSONResponse(res, 200, "application/json", content);
}

export async function handlePost(req, res) {
  req.body = await parseJSONBody(req);
  try {
    sanitizeInput(req, res, async () => {
      await addNewSighting(req.body);
      const content = JSON.stringify(req.body);
      sendJSONResponse(res, 201, "application/json", content);
    });
  } catch (err) {
    sendJSONResponse(res, 400, "application/json", JSON.stringify({ error: err.message }));
  }

}
