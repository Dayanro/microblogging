import "core-js/stable";
import "regenerator-runtime/runtime";

import * as userRepository from "../../../src/repositories/user";
import * as userService from "../../../src/services/user";
import { fakeNoteModel, fakeNoteId } from "../../mocks/notes";
import { fakeUserId } from "../../mocks/authentications";
import { BadRequestError } from "../../../src/errors/badRequestError";


describe("favorite service", () => {
  describe("Add Favorite", () => {
    it("should throw an error if a pararameter is not provided", async () => {
      try {
        await userService.addFavoriteNote(fakeUserId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });
    it("Should throw an error if something goes wrong when saving the favorite", async () => {
      const spyRepository = jest
        .spyOn(userRepository, "findUserByIdAndAddFavorites")
        .mockResolvedValueOnce(new Error());
      try {
        await userService.addFavoriteNote(fakeUserId, fakeNoteId);
      } catch (error) {
        expect(spyRepository).toHaveBeenCalledWith(fakeUserId, fakeNoteId);
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe("Delete favorite", () => {
    it("should throw an error if a pararameter is not provided", async () => {
      try {
        await userService.deleteFavoriteNote(fakeUserId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });

    it("Should throw an error if something goes wrong when delete the favorite", async () => {
      const spyRepository = jest
        .spyOn(userRepository, "findUserByIdAndDeleteFavorites")
        .mockResolvedValueOnce(new Error());
      try {
        await userService.deleteFavoriteNote(fakeUserId, fakeNoteId);
      } catch (error) {
        expect(spyRepository).toHaveBeenCalledWith(fakeUserId, fakeNoteId);
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

describe("get favorites", () => {
  it("should throw an error if a pararameter is not provided", async () => {
    try {
      await userService.getfavoriteNotes(null);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
    }
  });

  it("Should throw an error if something goes wrong when retrieve the favorite", async () => {
    const spyRepository = jest
      .spyOn(userRepository, "findUserByIdAndDeleteFavorites")
      .mockResolvedValueOnce(new Error());
    try {
      await userService.getfavoriteNotes(fakeUserId, fakeNoteId);
    } catch (error) {
      expect(spyRepository).toHaveBeenCalledWith(fakeUserId, fakeNoteId);
      expect(error).toBeInstanceOf(Error);
    }
  });
});

});
