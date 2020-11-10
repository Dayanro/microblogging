import "core-js/stable";
import "regenerator-runtime/runtime";

import {connectDB } from "../../../src/loaders";
import mongoose from "mongoose";
import { async } from "regenerator-runtime";

const DATABASE = "microblogging";
const CONNECTION = {
  connections: [{ db: { databaseName: DATABASE } }],
};

describe("MongoDB connection", () => {
  beforeEach(() => {
    mongoose.connect = jest.fn().mockResolvedValueOnce(CONNECTION);
 
    global.logger.info = jest.fn();
    global.logger.error = jest.fn();
  });

  it("should create a connection with database", async () => {
    const spyMongooseConnect = jest
      .spyOn(mongoose, "connect");

    await connectDB();

    expect(spyMongooseConnect).toHaveBeenCalled();
  });

  it("should throw an error when there is a connection error", async () => {
    const spyError = jest.spyOn(global.logger, "error");
    const spyMongoose = jest
      .spyOn(mongoose, "connect")
      .mockRejectedValueOnce(new Error());
    try {
      await connectDB();
    } catch (error) {
      expect(spyMongoose).toHaveBeenCalled();
      expect(spyError).toHaveBeenCalled();
      expect(error).toBeInstanceOf(Error);
    }
  });
});
