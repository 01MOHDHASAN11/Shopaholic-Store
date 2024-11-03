require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const Products = require("./models/productsSchema");
const cookieParser = require("cookie-parser")



const DefaultData = require("./defaultdata")
const cors = require("cors");
const router = require("./routes/router")

app.use(express.json());
app.use(cookieParser(""))
app.use(cors());
app.use(router);

const port = 8005;

app.listen(port,()=>{
    console.log(`server is running on port number ${port}`);
});

DefaultData();










































// const express =require("express");
// const app = express();
// const mongoose = require("mongoose");
// const uri = "mongodb+srv://mohdhasan:01faraz11@cluster0.lpiwjqs.mongodb.net/?retryWrites=true&w=majority"

// async function connect() {
//     try {
//         await mongoose.connect(uri);
//         console.log("Connected to MongoDB");
//     } catch(error) {
//         console.log(error);
//     }
// }

// connect();

// app.listen(8000,()=>{
//     console.log("Server started on port 8000");
// });

