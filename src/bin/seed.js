require("dotenv").config({ path: require("find-config")(".env") });
import { mongoConnection, mongoDisconnect }  from "../utils/dbConnection"
import { UserModel } from "../models/user";
import "core-js/stable";
import "regenerator-runtime/runtime";

const user = [
  {
    username: "Admin",
    password: "Admin123",
  },
  {
    username: "User",
    password: "User123",
  }
];

const createUsers = async () => {
  try {
    const db = await mongoConnection;
    UserModel.collection.drop();
    await UserModel.create(user);
  } catch (error) {
    console.error({ error });
  } finally {
    mongoDisconnect();
  }
};

createUsers();
