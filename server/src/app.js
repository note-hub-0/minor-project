import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routers/user.routers.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())

app.use("/api/v1/user",userRouter)
export { app };
