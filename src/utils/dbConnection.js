require("dotenv").config({ path: require("find-config")(".env") });
import mongoose from "mongoose";
const {
  PROTOCOL,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOSTNAME,
  DB_NAME,
} = process.env;

const databaseUrl = `${PROTOCOL}//${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}/${DB_NAME}`;

export const mongoConnection = mongoose.connect(databaseUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

export const mongoDisconnect = () => mongoose.connection.close();
