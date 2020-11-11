import { MISSING_PARAM } from "../utils/constants";
import {
  findUserByIdAndAddFavorites,
  findUserByIdAndDeleteFavorites,
} from "../repositories";
import { BadRequestError} from "../errors";

export const addFavoriteNote = async (userId, noteId) => {
  try {
    if (!userId || !noteId) throw new BadRequestError(MISSING_PARAM);
    await findUserByIdAndAddFavorites(userId, noteId);
  } catch (error) {
    throw error;
  }
};

export const deleteFavoriteNote = async (userId, noteId) => {
  try {
    if (!userId || !noteId) throw new BadRequestError(MISSING_PARAM);
    await findUserByIdAndDeleteFavorites(userId, noteId);
  } catch (error) {
    throw error;
  }
};
