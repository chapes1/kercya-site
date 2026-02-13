const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const database = require("./database");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

module.exports = () => {
  app.use(express.json());
  app.use(
    cors({
      origin: [
        `http://localhost:${process.env.PORT}`,
        `http://127.0.0.1:${process.env.PORT}`,
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  );
  app.use(
    helmet({
      contentSecurityPolicy: false, // se tiver problemas com frontend
    }),
  );
  app.use(
    process.env.NODE_ENV === "production" ? morgan("combined") : morgan("dev"),
  );
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      legacyHeaders: false,
    }),
  );
  app.use("/public", express.static("public"));
  app.disable("x-powered-by");

  return app;
};
