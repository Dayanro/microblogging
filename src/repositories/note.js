import { async } from "regenerator-runtime";
import { NoteModel } from "../models";

export const saveNote = async (note) => {
  try {
    return await NoteModel.create(note);
  } catch (error) {
    throw error;
  }
};

export const findNotes = async (pageSize, documenToSkip) => {
  try {
    return await NoteModel.find()
      .populate("author")
      .limit(pageSize)
      .skip(documenToSkip);
  } catch (error) {
    throw error;
  }
};
