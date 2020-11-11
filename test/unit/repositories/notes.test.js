const { async } = require("regenerator-runtime");

import { NoteModel } from "../../../src/models";
import { fakeNote } from "../../mocks/notes";
import * as noteRepository from "../../../src/repositories/note";
jest.mock("../../../src/models/note");

describe("Create note", () => {
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

});
