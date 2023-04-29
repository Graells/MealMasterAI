/** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
process.env.PORT = 3005;
// process.env.DATABASE_URL =
//   'postgresql://raulbarros:@localhost:5432/mealmasteraitest?schema=public';
