import "dotenv/config"
import express from "express"
import * as loaders from "./loaders";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

loaders.connectDB();
loaders.router(app);
loaders.middlewares(app);

export default app;