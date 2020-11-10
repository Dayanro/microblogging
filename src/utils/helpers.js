// Decode basic auth from base64
export const basicAuth = (authorization) => {
  const base64Credentials = authorization.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");
  return { username, password };
};
