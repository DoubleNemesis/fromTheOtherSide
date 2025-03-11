import fs from 'fs/promises'

export async function getData() {
  try {
    const data = await fs.readFile('./data/data.json', 'utf8'); // Specify encoding to get a string
    const newData = JSON.parse(data); // Parse the JSON data
    return newData;
  } catch (err) {
    console.error(err);
    return []; // make sure something is returned!
  }
}