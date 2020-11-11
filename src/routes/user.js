import express from "express";
import { addFavorite, deleteFavorite } from "../controllers";
import { authValidation } from "../middleware";

const router = express.Router();

router.post("/:userId/notes/:noteId/favorite", authValidation, addFavorite);
router.delete(
  "/:userId/notes/:noteId/favorite",
  authValidation,
  deleteFavorite
);

export const userRoute = { path: "/users", router };
