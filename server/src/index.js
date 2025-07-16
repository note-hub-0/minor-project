import dotenv from "dotenv"

dotenv.config()

import {app} from './app.js'
import { connectDB } from "./db/index.js"

connectDB()
.then(() => {
    app.listen(process.env.PORT,() => {
        console.log(`⚙️ Server Is Runnig Succesfully`);
        
    })
})
.catch((err) => {
    console.log(err);
    console.log("falied to connect server and DB");
})