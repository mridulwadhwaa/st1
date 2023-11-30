const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./connection/dbConnect");
const movieroutes=require("./routes/movies")
app.use(express.json());
app.use(cors());

db.connectToDb();
app.use("/api",movieroutes) // Call the function to connect to the database

app.listen(3000, () => {
  console.log("Server is connected to port 3000");
});
