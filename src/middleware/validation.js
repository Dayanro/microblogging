import { login } from "../services/auth";
import { basicAuth } from "../utils/helpers";
import { async } from "regenerator-runtime";

export const authValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    try {
      const { username, password } = basicAuth(authorization);
      const user = await login(username, password);
      req.user = user;
    } catch (error) {
      next(error);
    }
  }
  next();
};
