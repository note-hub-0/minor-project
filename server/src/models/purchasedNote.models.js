import mongoose from "mongoose";

const purchasedNotesSchema = new mongoose.Schema({
    buyer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    notes : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Note",
        required : true
    },
    purchaseDate : {
        type : Date,
        default : Date.now
    }
},{timestamps : true})

export const PurchasedNote = mongoose.model("PurchasedNote",purchasedNotesSchema)