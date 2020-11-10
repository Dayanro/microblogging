export class BaseError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode || 500;
    this.message = message || "Internal error";
  }
}
