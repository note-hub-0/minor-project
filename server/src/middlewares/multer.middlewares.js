import multer from "multer"
import path from "path"
import fs from "fs"

const tempPath = path.join(process.cwd(), "public", "temp");


if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath, { recursive: true });
}
const storage = multer.diskStorage({
    destination : function(req,file,cd){
        cd(null,tempPath)
    },
    filename: function(req,file,cd){
        cd(null,file.originalname)
    }
})

export const upload = multer({storage})