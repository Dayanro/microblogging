import { NoteModel } from "../../src/models";
import { fakeUserId } from "./authentications";


export const fakeContent = "fakecontent";
export const fakeNoteId = "12345fdg780hj097";
export const fakedate = new Date();


export const fakeNote = {
  content: fakeContent,
  date: fakedate,
  author: fakeUserId,
};

export const fakeNoteModel = new NoteModel(fakeNote);
