import { google } from "googleapis";

const decodedCredentials = Buffer.from(
  process.env.GOOGLE_CREDENTIALS!,
  "base64"
).toString("utf8");

const credentialsJson = JSON.parse(decodedCredentials);

const auth = new google.auth.GoogleAuth({
  credentials: credentialsJson,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

export { drive };
