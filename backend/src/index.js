import express from "express";
import helmet from "helmet";
import cors from "cors";
import { PORT } from "./config/serverConfig.js";
// import { corsOptions } from "./config/corsConfig.js";
import apiV1Routes from "./routes/index.js";
import connectDB from "./config/db.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", apiV1Routes);

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer();
