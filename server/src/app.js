import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routers/user.routers.js"
import noteRouter from "./routers/note.routers.js"
import adminRouter from "./routers/admin.routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin : "https://minor-project-backend-wopb.onrender.com",
    credentials: true
}))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/notes",noteRouter)
app.use("/api/v1/admin",adminRouter)



export { app };
