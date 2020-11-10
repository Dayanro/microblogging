import { findUserByUsernameWithPassword } from "../repositories";
import { BadRequestError, AuthenticationError } from "../errors";

export const login = async (username, password) => {
  try {
    if (!username || !password) throw new BadRequestError();

    const user = await findUserByUsernameWithPassword(username);
    if (!user || !user.validatePassword(password))
      throw new AuthenticationError();

    return user;
  } catch (error) {
    throw error;
  }
};
