import "core-js/stable";
import "regenerator-runtime/runtime";

import httpMock from "node-mocks-http";
import { fakeNoteModel, fakePage, fakeLimit } from "../../mocks/notes";
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

  describe("getNotes", () => {
    beforeEach(() => {
      req.query = { page: fakePage, limit: fakeLimit };
    });
    it("should call retrieveNotes with page and limit", async () => {
      const spyGetNotes = jest
        .spyOn(noteService, "retrieveNotes")
        .mockResolvedValueOnce([]);

      await noteController.getNotes(req, res, next);

      expect(spyGetNotes).toHaveBeenCalledWith(fakePage, fakeLimit);
    });

    it("should return status 200 if the notes are retrieved", async () => {
      jest.spyOn(noteService, "retrieveNotes").mockResolvedValueOnce([]);

      await noteController.getNotes(req, res, next);

      expect(res.statusCode).toBe(200);
    });

    it("should send the response of retrieveNotes", async () => {
      jest.spyOn(noteService, "retrieveNotes").mockResolvedValueOnce([]);

      await noteController.getNotes(req, res, next);

      expect(res._getJSONData()).toStrictEqual([]);
    });

    it("should pass error to the next middleware", async () => {
      jest
        .spyOn(noteService, "retrieveNotes")
        .mockRejectedValueOnce(new Error());

      try {
        await noteController.getNotes(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(next).toHaveBeenCalledWith(error);
      }
    });
  });

});
