import express from "express";
import { createNote } from "../controllers";
import { authValidation } from "../middleware";

const router = express.Router();

router.post("/", authValidation, createNote);

export const noteRoute = { path: "/notes", router };
