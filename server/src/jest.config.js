/** @type {import('ts-jest').JestConfigWithTsJest} */


module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
process.env.PORT = 3005;

