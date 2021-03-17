const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const port = 4000;

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Här ska docs vara!");
});

app.use("/api", require("./routes/lightRoutes.js"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
