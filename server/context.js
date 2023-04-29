const { PrismaClient } = require("@prisma/client");
const { mockDeep } = require("jest-mock-extended");

export const createMockContext = () => {
  return {
    prisma: mockDeep(),
  };
};
