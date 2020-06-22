const logger = {
  error: (...params) => {
    console.error(...params);
  },

  info: (...params) => {
    console.log(...params);
  },
};

module.exports = logger;
