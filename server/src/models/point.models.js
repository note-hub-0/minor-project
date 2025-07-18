import mongoose from "mongoose";

const poitnSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    history: [
      {
        type: {
          type: String,
          enum: ["add", "remove"],
          required: true,
        },
        reason: String,
        value: Number,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

poitnSchema.methods.addPoints = async function(value , reason = ""){
    this.points += value
    this.history.push({type : "add",value,reason})
    return this.save()
}

poitnSchema.methods.removePoints = function(value,reason = "") {
    this.points = Math.max(0,this.points - value)
    this.history.push({type : "remove",value,reason})
    return this.save()
}

export const Points = mongoose.model("Points", poitnSchema);
