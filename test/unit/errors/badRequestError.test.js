import { BadRequestError } from "../../../src/errors";
import { BAD_REQUEST } from "../../../src/utils/constants";

describe("BadRequestError", () => {
  const badRequestError = new BadRequestError();
  it("should throw an 'Invalid request missing data' if a message is not provided", () => {
    expect(badRequestError.message).toBe(BAD_REQUEST);
  });
  it("should assign message if it is provided", () => {
    const errorMessage = new BadRequestError("ERROR");
    expect(errorMessage.message).toBe("ERROR");
  });
});
