import { Schema, model } from "mongoose";

const NoteSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const NoteModel = model("Note", NoteSchema);
