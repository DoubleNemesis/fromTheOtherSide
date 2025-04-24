import fs from 'fs/promises'

export async function getData() {
  try {
    const data = await fs.readFile('./data/data.json', 'utf8'); 
    const parsedData = JSON.parse(data); 
    return parsedData;
  } catch (err) {
    console.error("Failed to read or parse data.json:", err);
    return [];
  }
}