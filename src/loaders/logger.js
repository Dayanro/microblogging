const logger = require("pino")({
  prettyPrint: {
    levelFirst: true,
    translateTime: "SYS:HH:MM:ss",
    ignore: "hostname,pid",
  },
});

global.logger = logger;
