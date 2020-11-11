import { addFavoriteNote, deleteFavoriteNote} from "../services"

export const addFavorite = async (req, res, next) => {
    try { 
        const { userId, noteId } = req.params
        await addFavoriteNote(userId, noteId);
        res.status(200).send();
    } catch (error) {
        next(error)
    }
}


export const deleteFavorite = async (req, res, next) => {
  try {
    const { userId, noteId } = req.params;
     await deleteFavoriteNote(userId, noteId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};