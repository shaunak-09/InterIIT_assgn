const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
const cors=require("cors");
const bodyParser=require("body-parser")
const routes=require("./routes")
const port=process.env.Port||8000;
const mongodb=process.env.Database_Url||""

app.use(bodyParser.json());
app.use(cors({
    origin:'*'
}))

// mongoose.connect('mongodb://localhost:27017/newsDB', 
// { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/api",routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});