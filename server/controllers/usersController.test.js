const { getUsers, editUser } = require("./usersController");
const User = require("../../DB/models/user");

jest.mock("../../DB/models/user");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Given the getUsers function", () => {
  describe("When it receives a res object", () => {
    test("Then it should call the method json with status 200", async () => {
      const res = mockResponse();
      const expectedReturn = [
        { id: 1, name: "test" },
        { id: 2, name: "test2" },
      ];
      const expectedStatus = 200;

      User.find = jest.fn().mockResolvedValue(expectedReturn);
      await getUsers(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedReturn);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a error", () => {
    test("Then it should call the next function with the expected error", async () => {
      const next = jest.fn();
      const error = new Error("Error loading the users");

      User.find = jest.fn().mockRejectedValue();
      await getUsers(null, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given the editUser function", () => {
  let req;
  beforeEach(() => {
    req = {
      userData: {
        id: 1,
      },
    };
  });
  describe("When it receives the res and req objects", () => {
    test("Then it should call the method json with status 200", async () => {
      const res = mockResponse();
      const expectedReturn = {
        id: 1,
        name: "test",
        age: 20,
        password: "test",
        image: "test",
      };
      const expectedStatus = 200;

      User.findByIdAndUpdate = jest.fn().mockResolvedValue(expectedReturn);
      await editUser(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedReturn);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives the req object with a wrong user", () => {
    test("Then it should call the next function with expected error and status 404", async () => {
      const next = jest.fn();
      const expectedError = new Error("User not found");
      const expectedStatus = 404;

      User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
      await editUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedStatus);
    });
  });

  describe("When it receives the req object with a rejected promise", () => {
    test("Then it should call the next function", async () => {
      const next = jest.fn();
      const expectedError = new Error("Error editing the user");
      const expectedStatus = 500;

      User.findByIdAndUpdate = jest.fn().mockRejectedValue();
      await editUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedStatus);
    });
  });
});
