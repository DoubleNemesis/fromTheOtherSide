import { sendResponse } from '../utils/sendResponse.js';
import { parseJSONBody } from '../utils/parseJSON.js';
import { sanitizeInput } from '../utils/sanitizeInput.js';
import { addNewSighting } from '../utils/addNewSighting.js';
import { getData } from "../utils/getData.js";

export async function handleGet(req, res) {
  const data = await getData();
  const content = JSON.stringify(data)
  sendResponse(res, 200, "application/json", content);
}

export async function handlePost(req, res) {
  try {
    const rawBody = await parseJSONBody(req);
    req.body = sanitizeInput(rawBody); 
    await addNewSighting(req.body);
    const content = JSON.stringify(req.body);
    sendResponse(res, 201, "application/json", content);
  } catch (err) {
    sendResponse(res, 400, "application/json", JSON.stringify({ error: err.message }));
  }
}
