import { addNote } from "../services";

export const createNote = async (req, res, next) => {
  try {
    const { id } = req.user;
    const note = await addNote(id, req.body);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};
