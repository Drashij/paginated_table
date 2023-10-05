const express = require("express");
const db = require("./models/app");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || "3000";
const EmployeeRouter = require("./routes/routes");
app.use("/", EmployeeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
