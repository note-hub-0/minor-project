import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    file : {
        type : String,
        required : true
    },
    thumbnail: {
        type : String,
        required : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    }
},{timestamps: true})

export const Note = mongoose.model("Note",noteSchema)