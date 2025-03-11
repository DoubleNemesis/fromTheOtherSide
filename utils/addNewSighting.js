import { getData } from "./getData.js";
import fs from "fs/promises";

export async function addNewSighting(newSighting) {
  try {
      const sightings = await getData()
      sightings.push(newSighting);
      await fs.writeFile("./data/data.json", JSON.stringify(sightings, null, 2), "utf8"); //neatify the JSON
      console.log("Done writing");
    } catch(err) {
      console.log(err)
    }
  }