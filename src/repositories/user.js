import { UserModel } from "../models";


export const findUserByUsernameWithPassword = async (username) => {
  try {
    return await UserModel.findOne({ username }).select("+password");
  } catch (error) {
    throw error;
  }
};

export const  findUserByIdAndAddFavorites  = async (userId, noteId) => {
  try { 
    return await UserModel.findByIdAndUpdate(userId, {
      $addToSet: { favorites: noteId },
    });
  } catch (error) {
    throw error
  }

}

export const findUserByIdAndDeleteFavorites = async (userId, noteId) => {
  try {
    return await UserModel.findByIdAndUpdate(userId, {
      $pull: { favorites: noteId },
    });
  } catch (error) {
    throw error;
  }
};

