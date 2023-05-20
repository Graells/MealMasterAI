import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";

export const createMockContext = () => {
  return {
    prisma: mockDeep(),
  };
};
