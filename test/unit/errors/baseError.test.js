import { AuthenticationError } from "../../../src/errors";
import { INVALID_CREDENTIALS } from "../../../src/utils/constants";

describe("AuthenticationError", () => {
  const authenticationError = new AuthenticationError();
  it("should throw an 'Invalid Credentials' if a message is not provided", () => {
    expect(authenticationError.message).toBe(INVALID_CREDENTIALS);
  });
  it("should assign message if it is provided", () => {
    const errorMessage = new AuthenticationError("ERROR");
    expect(errorMessage.message).toBe("ERROR");
  });
});
