
const { async } = require("regenerator-runtime");
import * as NoteRepository from "../../../src/repositories/note";
import * as noteService from "../../../src/services/note";
import { fakeNoteModel } from "../../mocks/notes";
import { fakeUserId } from "../../mocks/authentications";
import { BadRequestError } from "../../../src/errors/badRequestError";


describe("Create notes", () => {
  describe("addNote", () => {
    it("should assign author to the notes and send a object to saveNote", async () => {
      const spyRepository = jest
        .spyOn(NoteRepository, "saveNote")
        .mockResolvedValueOnce();

      await noteService.addNote(fakeUserId, fakeNoteModel);

      expect(spyRepository).toHaveBeenCalledWith(fakeNoteModel);
    });
    it("should throw an error if a pararameter is not provided", async () => {
      try {
        await noteService.addNote(fakeUserId, {});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });
    it("Should throw an error if something goes wrong when saving the notes", async () => {
      const spyRepository = jest
        .spyOn(NoteRepository, "saveNote")
        .mockResolvedValueOnce(new Error());
      try {
        await noteService.addNote(fakeUserId, fakeNoteModel);
      } catch (error) {
        expect(spyRepository).toHaveBeenCalledWith(fakeNoteModel);
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  
});
