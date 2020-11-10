import "core-js/stable";
import "regenerator-runtime/runtime";

import { mongodb } from "../../../src/loaders";
import {mongoConnection} from "../../../src/utils/dbConnection"
import mongoose from "mongoose";

const DATABASE = "microblogging";
const CONNECTION = {
  connections: [{ db: { databaseName: DATABASE } }],
};

describe("MongoDB connection", () => {
  beforeEach(() => {
    mongoose.connect = jest.fn().mockResolvedValue(CONNECTION);
    global.logger.info = jest.fn();
    global.logger.error = jest.fn();
  });

  it("should create a connection with database", () => {
  });

  it("should throw an error when there is a connection error", async () => {
    const spyError = jest.spyOn(global.logger, "error");
    const spyMongoose = jest
      .spyOn(mongoose, "connect")
      .mockRejectedValueOnce(new Error());
    try {
      await mongodb();
    } catch (error) {
      expect(spyMongoose).toHaveBeenCalled();
      expect(spyError).toHaveBeenCalled();
      expect(error).toBeInstanceOf(Error);
    }
  });
});
