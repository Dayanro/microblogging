
const { async } = require("regenerator-runtime");
import * as NoteRepository from "../../../src/repositories/note";
import * as noteService from "../../../src/services/note";
import { fakeNoteModel } from "../../mocks/notes";
import { fakeUserId } from "../../mocks/authentications";
import { BadRequestError } from "../../../src/errors/badRequestError";
import { LIMIT_ITEMS, MISSING_PAGINATION } from "../../../src/utils/constants";


describe("Notes service", () => {
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


  describe("retrieveNotes", () => {
    it(`should determine the max limit ${LIMIT_ITEMS} in case that provided number would be greater than`, async () => {
      const spyRepository = jest
        .spyOn(NoteRepository, "findNotes")
        .mockResolvedValueOnce([]);

      const result = await noteService.retrieveNotes(1, 10);

      expect(spyRepository).toHaveBeenCalledWith(10, 0);
      expect(result).toStrictEqual([]);
    });

    it("should throw an error if a pararameter is not provided", async () => {
      try {
        await noteService.retrieveNotes("", "");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error.message).toBe(MISSING_PAGINATION);
      }
    });

    it("Should throw an error if something goes wrong when retrieving the notes", async () => {
      const spyRepository = jest
        .spyOn(NoteRepository, "findNotes")
        .mockResolvedValueOnce(new Error());
      try {
        await noteService.retrieveNotes(10,1);
      } catch (error) {
        expect(spyRepository).toHaveBeenCalledWith(fakeNoteModel);
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  
});
