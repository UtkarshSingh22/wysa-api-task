const express = require("express");
const authRouter = require('./routes/auth')
const peopleRouter = require("./routes/sleepDetails.js");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//db connection
mongoose
    .connect(process.env.DATABASE, {})
    .then(() => {
        console.log("db connected");
    })
    .catch((err) => console.log("db connection failed: " + err));

//middlewares
app.use(cors());
app.use(express.json());

//routers
app.use("/api", authRouter);
app.use("/api", peopleRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
