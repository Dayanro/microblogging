import { INVALID_CREDENTIALS } from "../utils/constants";
import { BaseError } from "./baseError";

export class AuthenticationError extends BaseError {
  constructor(message) {
    super(401, message || INVALID_CREDENTIALS);
  }
}
