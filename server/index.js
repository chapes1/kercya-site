const express = require("express");
require("dotenv").config({ quiet: true });
const app = express();
const config = require("./config/config.js");

app.use(config());

app.use("/api", require("./routes/index"));

app.listen(process.env.PORT, () => console.log(`Running apllication`));
