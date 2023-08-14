import path from "path";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT, NODE_ENV } from "./config/serverConfig.js";
// import { corsOptions } from "./config/corsConfig.js";
import apiV1Routes from "./routes/index.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api", apiV1Routes);

const __dirname = path.resolve();
app.use("/src/uploads", express.static(path.join(__dirname, "/uploads")));

if (NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // any route that's not api will be redirected to index.html
  console.log(path.resolve(__dirname, "frontend", "build", "index.html"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}
// Error Handler
app.use(notFound);
app.use(errorHandler);

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer();
