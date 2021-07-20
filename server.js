const express = require("express");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const db = require("./models/index");
const userRoute = require("./server/routes/userRoute");
const categoryRoute = require("./server/routes/categoryRoute");
const productsRoute = require("./server/routes/productsRoute");
db.sequelize.sync();
//import the route and initialize
const app = express();

//middlewares for parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//these are response header we pass in each res to the client
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type"
  );

  res.header("Access-Control-Allow-Methods", "GET, PUT,POST,DELETE");

  next();
});

app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use("/api/v1", userRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", productsRoute);
app.get("/", (req, res) => {
  res.json({ message: `Welcome to my application.${process.env.PORT}` });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
