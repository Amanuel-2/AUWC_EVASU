import app from "./app.js";
import { config } from "./config.js";
import { getDb } from "./db.js";

await getDb();
app.listen(config.PORT, () => console.log(`AUWC ECSF API listening on port ${config.PORT}`));
