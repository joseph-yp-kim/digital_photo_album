import * as express from "express";

import apiRouter from "./routes";
import * as database from "./database/database";

const app = express();

app.use(express.static("public"));
apiRouter(app);

const PORT = process.env.PORT || 3000;

(async () => {
  await database.connect();
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
})();
