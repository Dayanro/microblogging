import { async } from "regenerator-runtime";
import { NoteModel } from "../models";

export const saveNote = async (note) => {
  try {
    return await NoteModel.create(note);
  } catch (error) {
    throw error;
  }
};
