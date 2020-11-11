import { addNote, retrieveNotes } from "../services";

export const createNote = async (req, res, next) => {
  try {
    const { id } = req.user;
    const note = await addNote(id, req.body);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const notes = await retrieveNotes(Number(page), Number(limit));
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
}