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
    class : {
        type : String,
        required : true
    },
    subject : {
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
    },
    isPremium : {
        type : Boolean,
        default : false
    },
    price : {
        type : Number,
        default : 0
    }

},{timestamps: true})

export const Note = mongoose.model("Note",noteSchema)