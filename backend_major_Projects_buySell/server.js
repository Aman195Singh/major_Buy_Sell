const express = require("express")
const mongoose =require("mongoose")
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors")

const connectDB = require("./DB/db")
const authRoutes =require("./Routes/auth.route")
const productRoutes =require("./Routes/product.route")
app.use(express.json());
app.use(express.cors());

app.use("/api/auth",authRoutes);
// app.use("/api/products",productRoutes);

connectDB().then(()=> {
    app.listen(port, ()=>{
        console.log(`server is running on http://localhost:${port}`);
    })
})
.catch((err) => {
        console.error("Failed to connect to the database, server not started:", err);
        process.exit(1);
    });
