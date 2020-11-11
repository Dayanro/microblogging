import express from "express";
import { createNote, getNotes, getNote} from "../controllers";
import { authValidation } from "../middleware";

const router = express.Router();

router.post("/", authValidation, createNote);
router.get("/", authValidation, getNotes);
router.get("/:id", authValidation, getNote);

export const noteRoute = { path: "/notes", router };
