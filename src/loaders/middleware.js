import * as allMiddlewares from "../middleware";

export const middlewares = (app) => {
  Object.values(allMiddlewares).forEach((middleware) => app.use(middleware));
};
