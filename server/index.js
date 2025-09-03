import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRouter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;
const MONGO_URI  = process.env.MONGO_URI;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET","POST","PUT","PATCH","DELETE"],
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json());

app.use("/api/auth",authRoutes)


const server = app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})

mongoose.connect(MONGO_URI)
.then(()=>console.log('DB Connection Successful'))
.catch(err=> console.log("ERROR!!!"))
