const { getUsers, editUser, deleteUser } = require("./usersController");
const User = require("../../DB/models/user");

jest.mock("../../DB/models/user");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

let req;
beforeEach(() => {
  req = {
    userData: {
      id: 1,
    },
  };
});

describe("Given the getUsers function", () => {
  describe("When it receives a res object", () => {
    test("Then it should call the method json with status 200", async () => {
      const res = mockResponse();
      const expectedReturn = [
        { id: 2, name: "test" },
        { id: 3, name: "test2" },
      ];
      const expectedStatus = 200;

      User.find = jest.fn().mockResolvedValue(expectedReturn);
      await getUsers(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedReturn);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a error", () => {
    test("Then it should call the next function with the expected error", async () => {
      const next = jest.fn();
      const error = new Error("Error loading the users");

      User.find = jest.fn().mockRejectedValue();
      await getUsers(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given the editUser function", () => {
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
    test("Then it should call the next function with the expected error and status 500", async () => {
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

describe("Given the deleteUser function", () => {
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

      User.findByIdAndDelete = jest.fn().mockResolvedValue(expectedReturn);
      await deleteUser(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedReturn);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives the req object with a wrong user", () => {
    test("Then it should call the next function with expected error and status 404", async () => {
      const next = jest.fn();
      const expectedError = new Error("User to delete not found");
      const expectedStatus = 404;

      User.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      await deleteUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedStatus);
    });
  });

  describe("When it receives the req object with a rejected promise", () => {
    test("Then it should call the next function with expected error and status 500", async () => {
      const next = jest.fn();
      const expectedError = new Error("Error deleting the user");
      const expectedStatus = 500;

      User.findByIdAndDelete = jest.fn().mockRejectedValue();
      await deleteUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedStatus);
    });
  });
});
