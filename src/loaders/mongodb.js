import { mongoConnection } from "../utils/dbConnection";

export const mongodb = async () => {
  try {
    const db = await mongoConnection;
    const databaseName = db.connections[0].name;
    logger.info(`Connected to Mongo! Database name: ${databaseName}`);
  } catch (error) {
    logger.error(
      `Error connecting to mongo database, Error description: ${error}`
    );
  }
};
