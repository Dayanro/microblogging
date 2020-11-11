import express from "express";
import { createNote, getNotes } from "../controllers";
import { authValidation } from "../middleware";

const router = express.Router();

router.post("/", authValidation, createNote);
router.get("/", authValidation, getNotes);

export const noteRoute = { path: "/notes", router };
