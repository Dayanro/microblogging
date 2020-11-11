import "core-js/stable";
import "regenerator-runtime/runtime";

import httpMock from "node-mocks-http";
import { fakeNoteModel} from "../../mocks/notes";
import { fakeUserId } from "../../mocks/authentications";
import * as noteService from "../../../src/services/note";
import * as noteController from "../../../src/controllers/note";


describe("Notes controller", () => {
  let res, req, next;
  beforeEach(() => {
    res = httpMock.createResponse();
    req = httpMock.createRequest();
    next = jest.fn((error) => {
      res.status(500);
      res.send(error.message);
    });
    jest.clearAllMocks();
  });

  describe("Create notes", () => {
    beforeEach(() => {
      req.body = fakeNoteModel;
      req.user = { id: fakeUserId };
    });

    it("should call addNote service", async () => {
      const spyCreateNotes = jest
        .spyOn(noteService, "addNote")
        .mockResolvedValueOnce();

      await noteController.createNote(req, res, next);

      expect(spyCreateNotes).toHaveBeenCalledWith(req.user.id, req.body);
    });

    it("should return status 201 if the note is created", async () => {
      jest.spyOn(noteService, "addNote").mockResolvedValueOnce();

      await noteController.createNote(req, res, next);

      expect(res.statusCode).toBe(201);
    });

    it("should pass error to the next middleware", async () => {
      jest.spyOn(noteService, "addNote").mockRejectedValueOnce(new Error());

      try {
        await noteController.createNote(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(next).toHaveBeenCalledWith(error);
      }
    });
  });

});
