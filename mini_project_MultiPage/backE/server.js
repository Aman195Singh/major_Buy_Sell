const express = require('express');
const router = express.Router();
const User = require('./models/User.model');
const mongoose = require('mongoose')
const cors=require('cors')
const PORT =3000;
const app =express();

const connectDB = require("./database/db")
const authRoutes = require("./routes/auth.routes")

app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoutes);

connectDB().then(()=>{
    app.listen(PORT , ()=>{
        console.log(`server is running on http://localhost:${PORT}`)
    })
})
.catch((err)=>{
    console.error("Failed to connect to the database, server not started:", err);
    process.exit(1);
});


