import "core-js/stable";
import "regenerator-runtime/runtime";

import httpMock from "node-mocks-http";
import { fakeAuthHeader, fakeUserExtract } from "../../mocks/authentications";
import * as authService from "../../../src/services/auth";
import { LoginAuth } from "../../../src/middleware/validation";

describe("Middleware Login Auth", () => {
  let res, req, next;
  beforeEach(() => {
    res = httpMock.createResponse();
    req = httpMock.createRequest();
    req.headers.authorization = fakeAuthHeader;
    next = jest.fn((error) => {
      res.status(500);
      res.send(error);
    });
    jest.clearAllMocks();
  });
  it("should call next if authorization is not provided", () => {
    req.headers.authorization = "";
    LoginAuth(req, res, next);

    expect(next).toHaveBeenCalled();
  });
  it("should catch an error is something is wrong", () => {
    const spyLoginAuth = jest
      .spyOn(authService, "login")
      .mockImplementationOnce(() => {
        throw new Error();
      });
    try {
      LoginAuth(req, res, next);
    } catch (error) {
      expect(spyLoginAuth).toBeCalled();
      expect(error).toBeInstanceOf(Error);
    }
  });
  it("if authorization its provided it should call Login and assign the info to req.user ", async () => {
    const spyLoginAuth = jest
      .spyOn(authService, "login")
      .mockResolvedValueOnce(fakeUserExtract);

    await LoginAuth(req, res, next);

    expect(req.user.fakeUser).toHaveProperty("username");
  });
});
