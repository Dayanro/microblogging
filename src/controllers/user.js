import {
  addFavoriteNote,
  deleteFavoriteNote,
  getfavoriteNotes,
} from "../services";

export const addFavorite = async (req, res, next) => {
    try { 
      const { noteId } = req.params;
       const userId = req.user._id;
        await addFavoriteNote(userId, noteId);
        res.status(200).send();
    } catch (error) {
        next(error)
    }
}


export const deleteFavorite = async (req, res, next) => {
  try {
          const { noteId } = req.params;
          const userId = req.user._id;
     await deleteFavoriteNote(userId, noteId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getFavorite = async (req, res, next) => {
  try {
    const userId = req.user._id
    const favorites = await getfavoriteNotes(userId);
    res.status(200).json(favorites);
  } catch (error) {
    next(error)
  }
}