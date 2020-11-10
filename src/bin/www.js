#!/usr/bin/env node
import "core-js/stable";
import "regenerator-runtime/runtime";
import app from "../app";
import http from "http";

const PORT = process.env.PORT || 3000

const server = http.createServer(app);

server.on('error', error => {
  if (error.syscall !== 'listen') { throw error }

  switch (error.code) {
    case 'EACCES':
      logger.error(`Port ${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`Port ${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.listen(PORT, () => {
  logger.info(`Server running and listening on port:${PORT}`);
});



