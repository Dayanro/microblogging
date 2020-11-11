import * as routes from "../routes";
import { PREFIX_API_URL } from "../utils/constants";

export const router = (app) => {
  Object.values(routes).forEach((route) => {
    app.use(PREFIX_API_URL + route.path, route.router);
  });
};
