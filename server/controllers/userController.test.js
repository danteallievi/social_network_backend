const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, loginUser } = require("./userController");
const User = require("../../DB/models/user");

jest.mock("../../DB/models/user");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Given the createUser function", () => {
  describe("When it receives the req res objects and the promise resolves", () => {
    test("Then it should invoke the method json and status", async () => {
      const req = {
        body: {
          name: "toto",
          username: "toto",
          password: "toto",
          age: 10,
        },
      };
      const res = mockResponse();

      const expectedStatus = 201;
      User.create = jest.fn().mockResolvedValue(req.body);
      await createUser(req, res, () => {});

      expect(res.json).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives the req object , the next function, and the promise rejects", () => {
    test("Then it should invoke the method json", async () => {
      const req = {
        body: {
          name: "toto",
          username: "toto",
          password: "toto",
          age: 10,
        },
      };

      const next = jest.fn();
      const error = new Error("Error creating the user");

      User.create = jest.fn().mockRejectedValue();
      await createUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
