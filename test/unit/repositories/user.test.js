import "core-js/stable";
import "regenerator-runtime/runtime";

import { UserModel } from "../../../src/models";
import { fakeUserId, fakeUserModel } from "../../mocks/authentications";
import { fakeNoteId, fakeNoteModel } from "../../mocks/notes";
import * as userRepository from "../../../src/repositories/user";
jest.mock("../../../src/models/note");

describe("Favorite Reopositories", () => {
  describe("update Favorites", () => {
    it("should call findByIdAndUpdate method", async () => {
      const spyFindByIdAndUpdate = jest
        .spyOn(UserModel, "findByIdAndUpdate")
        .mockResolvedValueOnce();

      await userRepository.findUserByIdAndAddFavorites(fakeUserId, fakeNoteId);
      expect(spyFindByIdAndUpdate).toHaveBeenCalledWith(fakeUserId, {
        $addToSet: { favorites: fakeNoteId },
      });
    });

    it("should throw an error if something wrong happened", async () => {
      UserModel.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error());

      try {
        await userRepository.findUserByIdAndAddFavorites(
          fakeUserId,
          fakeNoteId
        );
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe("update Favorites- Delete", () => {
    it("should call findByIdAndUpdate method", async () => {
      const spyFindByIdAndUpdate = jest
        .spyOn(UserModel, "findByIdAndUpdate")
        .mockResolvedValueOnce();

      await userRepository.findUserByIdAndDeleteFavorites(
        fakeUserId,
        fakeNoteId
      );
      expect(spyFindByIdAndUpdate).toHaveBeenCalledWith(fakeUserId, {
        $pull: { favorites: fakeNoteId },
      });
    });

    it("should throw an error if something wrong happened", async () => {
      UserModel.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error());

      try {
        await userRepository.findUserByIdAndDeleteFavorites(
          fakeUserId,
          fakeNoteId
        );
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe("Retrieve Favorite by user", () => {
    it("should return an user when is founded", async () => {
      UserModel.findOne = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockResolvedValueOnce({
          ...fakeUserModel,
          favorites: [fakeNoteModel],
        }),
      }));
      const result = await userRepository.findFavoritesByUser(fakeUserId);

      expect(result).toStrictEqual([fakeNoteModel]);
    });

    it("should throw an error if something wrong happened", async () => {
      UserModel.findOne = jest.fn().mockRejectedValue(new Error());

      try {
        await userRepository.findFavoritesByUser(fakeUserId);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
