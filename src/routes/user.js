import express from "express";
import { addFavorite, deleteFavorite, getFavorite } from "../controllers";
import { authValidation } from "../middleware";

const router = express.Router();

router.post("/notes/:noteId/favorite", authValidation, addFavorite);
router.delete("/notes/:noteId/favorite", authValidation, deleteFavorite);
router.get("/notes/favorite", authValidation, getFavorite);


export const userRoute = { path: "/users", router };
