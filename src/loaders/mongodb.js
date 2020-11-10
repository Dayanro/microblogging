import mongoose from "mongoose";
const {
  PROTOCOL,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOSTNAME,
  DB_NAME,
} = process.env;

const databaseUrl = `${PROTOCOL}//${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}/${DB_NAME}`;

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(databaseUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    const databaseName = db.connections[0].name;
    logger.info(`Connected to Mongo! Database name: ${databaseName}`);
  } catch (error) {
    logger.error(
      `Error connecting to mongo database, Error description: ${error}`
    );
  }
};
