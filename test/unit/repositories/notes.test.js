const { async } = require("regenerator-runtime");

import { NoteModel } from "../../../src/models";
import { fakeNote, fakeNoteModel, fakeNoteId } from "../../mocks/notes";
import * as noteRepository from "../../../src/repositories/note";
jest.mock("../../../src/models/note");

describe("Notes Reopositories", () => {
  describe("Save Note", () => {
    it("should insert one `note` document", async () => {
      const spyCreate = jest
        .spyOn(NoteModel, "create")
        .mockReturnValueOnce(fakeNote);
      await noteRepository.saveNote(fakeNote);
      expect(spyCreate).toHaveBeenCalled();
    });

    it("should throw an error when ther is a problem creating a note document", async () => {
      const spyCreate = jest
        .spyOn(NoteModel, "create")
        .mockReturnValueOnce(new Error());
      try {
        await noteRepository.saveNote(fakeNote);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(spyCreate).toHaveBeenCalled();
      }
    });
  });

  describe("Find Notes", () => {
    it("should return an array of notes", async () => {
      NoteModel.find = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockImplementation(() => ({
          limit: jest.fn().mockImplementation(() => ({
            skip: jest.fn().mockResolvedValueOnce([]),
          })),
        })),
      }));
      const result = await noteRepository.findNotes(5, 0);

      expect(result).toStrictEqual([]);
    });

    it("should throw an error when ther is a problem retrieve the notes", async () => {
      NoteModel.find = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockImplementation(() => ({
          limit: jest.fn().mockImplementation(() => ({
            skip: jest.fn().mockResolvedValueOnce(new Error()),
          })),
        })),
      }));
      try {
        await noteRepository.findNotes(5, 0);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe("Find a Note", () => {
    it("should return a note", async () => {
      NoteModel.findById = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockResolvedValueOnce(fakeNoteModel)
      }));
      const data = await noteRepository.findNote(fakeNoteId);

      expect(data).toStrictEqual(fakeNoteModel);
    });

    it("should throw an error when ther is a problem retrieve the note", async () => {
      NoteModel.findById = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockRejectedValueOnce(new Error())
      }));
      try {
        await noteRepository.findNote("Note");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});

