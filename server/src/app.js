import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routers/user.routers.js"
import noteRouter from "./routers/note.routers.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/notes",noteRouter)



export { app };
