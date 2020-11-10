import { BAD_REQUEST } from "../utils/constants";
import { BaseError } from "./baseError";

export class BadRequestError extends BaseError {
  constructor(message) {
    super(400, message || BAD_REQUEST);
  }
}
