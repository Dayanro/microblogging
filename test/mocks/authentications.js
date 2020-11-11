import { UserModel } from "../../src/models/user";

export const fakeUserId = "5fa07908c11f664b7d0cbb65";
export const fakeUsername = "Dayan";
export const fakePassword = "dayan123";
let data = `${fakeUsername}:${fakePassword}`;
let buff = new Buffer(data);
let base64data = buff.toString("base64");
export const fakeAuthHeader = `Basic ${base64data}`;

export const fakeUser = {
  username: fakeUsername,
  password: fakePassword
};

export const fakeUserExtract = { fakeUser };

export const fakeUserModel = new UserModel(fakeUser);