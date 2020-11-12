import { BAD_REQUEST, MISSING_USERID } from "../utils/constants";
import {
  findUserByIdAndAddFavorites,
  findUserByIdAndDeleteFavorites,
  findFavoritesByUser,
} from "../repositories";
import { BadRequestError } from "../errors";


export const addFavoriteNote = async (userId, noteId) => {
  try {
    if (!userId || !noteId) throw new BadRequestError(BAD_REQUEST);
    await findUserByIdAndAddFavorites(userId, noteId);
  } catch (error) {
    throw error;
  }
};

export const deleteFavoriteNote = async (userId, noteId) => {
  try {
    if (!userId || !noteId) throw new BadRequestError(BAD_REQUEST);
    await findUserByIdAndDeleteFavorites(userId, noteId);
  } catch (error) {
    throw error;
  }
};


export const getfavoriteNotes = async (userId) => {
  try {
    if (!userId) throw new BadRequestError(MISSING_USERID);
    return await findFavoritesByUser(userId);
  } catch (error) { 
    throw error
  }
}