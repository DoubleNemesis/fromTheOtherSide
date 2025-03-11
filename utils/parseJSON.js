// export default function parseJSON(body) {
//     try {
//         return JSON.parse(body);
//     } catch (err) {
//         throw new Error('Invalid JSON format');
//     }
// }

// export const parseJSONBody = async (req) => {
//   return new Promise((resolve, reject) => {
//     let body = "";
//     req.on("data", (chunk) => (body += chunk));
//     req.on("end", () => {
//       try {
//         resolve(JSON.parse(body));
//       } catch (err) {
//         reject(new Error("Invalid JSON format"));
//       }
//     });
//     req.on("error", (err) => reject(err)); // Catch stream errors
//   });
// };

export const parseJSONBody = async (req) => {
  let body = "";
  
  for await (const chunk of req) {
    body += chunk;
  }

  try {
    return JSON.parse(body);
  } catch (err) {
    throw new Error(`Invalid JSON format: ${err.message}`);
  }
};
