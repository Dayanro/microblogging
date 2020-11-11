import { saveNote, findNotes, findNote } from "../repositories";
import { BadRequestError } from "../errors";
import { MISSING_PAGINATION, MISSING_PARAM} from "../utils/constants";
import { pageSize, documenToSkip } from "../utils/pagination";

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

export const retrieveNotes = async (page, limit) => {
  try {
    if (!page || !limit) throw new BadRequestError(MISSING_PAGINATION);
    return await findNotes(pageSize(limit), documenToSkip(page, limit));
  } catch (error) {
    throw error;
  }
};

export const retrieveNote = async (noteId) => {
  try {
    if (!noteId) throw new BadRequestError(MISSING_PARAM);
    return await findNote(noteId);
  } catch (error) {
    throw error;
  }
};

