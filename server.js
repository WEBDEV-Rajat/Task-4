const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb+srv://omkarrajat04:pfduXWXUbolusp34@cluster0.g4axzb6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {console.log("Connected")})
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
const productsRouter = require("./routes/products");
app.use("/blogs",productsRouter);

app.listen(3000,() =>{
    console.log("Server connected to port 3000");
})
