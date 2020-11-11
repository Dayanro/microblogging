const { async } = require("regenerator-runtime");

import { NoteModel } from "../../../src/models";
import { fakeNote } from "../../mocks/notes";
import * as noteRepository from "../../../src/repositories/note";
jest.mock("../../../src/models/note");

describe("Notes Reopositories", () => {
  describe("saveNote", () => {
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

  describe("findNotes", () => {
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
});

