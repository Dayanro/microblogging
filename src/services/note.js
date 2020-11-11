import { saveNote} from "../repositories";
import { BadRequestError } from "../errors";

export const addNote = async (id, note) => {
  const { content, date } = note;
  try {
    if (!content || !date || !id) throw new BadRequestError();
    note.author = id;
    return await saveNote(note);
  } catch (error) {
    throw error;
  }
};
