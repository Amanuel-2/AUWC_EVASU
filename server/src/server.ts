import app from "./app.js";
import { config } from "./config.js";
import { getDb } from "./db.js";

// Vercel imports the app as a serverless function. Keep the listener for local use only.
export default app;

if (!process.env.VERCEL) {
  await getDb();
  app.listen(config.PORT, () => console.log(`AUWC ECSF API listening on port ${config.PORT}`));
}
