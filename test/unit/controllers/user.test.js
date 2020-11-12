import "core-js/stable";
import "regenerator-runtime/runtime";

import httpMock from "node-mocks-http";
import { fakeNoteId } from "../../mocks/notes";
import { fakeUserId } from "../../mocks/authentications";
import * as userService from "../../../src/services/user";
import * as userController from "../../../src/controllers/user";

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

  describe("Add and delete notes to favorites", () => {
  beforeEach(() => {
     req.params = {noteId: fakeNoteId };
    req.user = { _id: fakeUserId };
  });


    it("should call addFavoriteNote service", async () => {
      const spyAddFavorite = jest
        .spyOn(userService, "addFavoriteNote")
        .mockResolvedValueOnce();
     
      await userController.addFavorite(req, res, next);

      expect(spyAddFavorite).toHaveBeenCalledWith(
        req.user._id, req.params.noteId
      );
    });

    it("should return status 200 if the note is added", async () => {
      jest.spyOn(userService, "addFavoriteNote").mockResolvedValueOnce();

      await userController.addFavorite(req, res, next);

      expect(res.statusCode).toBe(200);
    });

    it("should call next if something wrong happens", async () => {
      jest
        .spyOn(userService, "addFavoriteNote")
        .mockRejectedValueOnce(new Error());

      try {
        await userController.addFavorite(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(next).toHaveBeenCalledWith(error);
      }
    });
  });

  describe("delete notes to favorites", () => {
  beforeEach(() => {
    req.params = { noteId: fakeNoteId };
    req.user = { _id: fakeUserId };
  });

    it("should call deleteFavoriteNote service", async () => {
      const spyDeleteFavorite = jest
        .spyOn(userService, "deleteFavoriteNote")
        .mockResolvedValueOnce();
   

      await userController.deleteFavorite(req, res, next);

      expect(spyDeleteFavorite).toHaveBeenCalledWith(
        req.user._id,
        req.params.noteId
      );
    });

    it("should return status 204 if the note is deleted", async () => {
      jest.spyOn(userService, "deleteFavoriteNote").mockResolvedValueOnce();

      await userController.deleteFavorite(req, res, next);

      expect(res.statusCode).toBe(204);
    });

    it("should call next if something wrong happens", async () => {
      jest
        .spyOn(userService, "deleteFavoriteNote")
        .mockRejectedValueOnce(new Error());

      try {
        await userController.deleteFavorite(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(next).toHaveBeenCalledWith(error);
      }
    });
  });

  describe("Get favorites by user", () => {
  beforeEach(() => {
    req.params = { noteId: fakeNoteId };
    req.user = { _id: fakeUserId };
  });

    it("should call getfavoriteNotes service", async () => {
      const spygetFavorite = jest
        .spyOn(userService, "getfavoriteNotes")
        .mockResolvedValueOnce();
     

      await userController.getFavorite(req, res, next);

      expect(spygetFavorite).toHaveBeenCalledWith(req.user._id);
    });

    it("should return status 200 if retrieves the favorite notes", async () => {
      jest.spyOn(userService, "getfavoriteNotes").mockResolvedValueOnce();

      await userController.getFavorite(req, res, next);

      expect(res.statusCode).toBe(200);
    });

    it("should call next if something wrong happens", async () => {
      jest
        .spyOn(userService, "deleteFavoriteNote")
        .mockRejectedValueOnce(new Error());

      try {
        await userController.getFavorite(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(next).toHaveBeenCalledWith(error);
      }
    });
  });
});
