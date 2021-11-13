const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");
const { checkUser, getUsers } = require("./usersControllers");

jest.mock("../../database/models/user");

describe("Given a User", () => {
  describe("When it receives a wrong username", () => {
    test("Then it should summon the function checkUser with an error and a 401 code", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      const req = {
        body: {
          username: "Davidgg",
          password: "1234abcd",
          name: "David",
          photo: "qwe",
          bio: "qwe",
        },
      };
      const next = jest.fn();
      const expectedError = new Error("Authentication failed");
      expectedError.code = 401;

      await checkUser(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("message");
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });

  describe("When it receives a correct username and a wrong password", () => {
    test("Then it should summon the function checkUser with an error and a 401 code", async () => {
      const req = {
        body: {
          username: "Davidgg",
          password: "1234abcd",
          name: "David",
          photo: "qwe",
          bio: "qwe",
        },
      };
      User.findOne = jest.fn().mockResolvedValue(req.body.username);
      const next = jest.fn();
      const expectedError = new Error("Authentication failed");
      expectedError.code = 401;
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await checkUser(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("message");
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });

  describe("When it receives a correct username and a right password", () => {
    test("Then it should summon the function checkUser with res.json and a token", async () => {
      const req = {
        body: {
          username: "Davidgg",
          password: "1234abcd",
          name: "David",
          photo: "qwe",
          bio: "qwe",
        },
      };
      const expectedToken = {
        token: "Token",
      };
      const res = {
        json: jest.fn(),
      };
      User.findOne = jest.fn().mockResolvedValue(req.body.username);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue("Token");

      await checkUser(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedToken);
    });
  });
});

describe("Given the getUsers function ", () => {
  describe("When its called", () => {
    test("Then it should summon the res.json with all the users", async () => {
      const users = ["efdvs", "efrdvf"];
      const req = {
        body: {
          users,
        },
      };
      User.find = jest.fn().mockResolvedValue(users);
      const res = {
        json: jest.fn().mockResolvedValue(),
      };

      await getUsers(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When its called wrong", () => {
    test("Then it should summon with and error and code 400 ", async () => {
      const req = {
        body: {
          username: "Davidgg",
          password: "1234abcd",
          name: "David",
          photo: "qwe",
          bio: "qwe",
        },
      };
      User.find = jest.fn().mockResolvedValue(null);
      const next = jest.fn();
      const expectedError = new Error("Can't find the users");
      expectedError.code = 400;

      await getUsers(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Can't find the users"
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });
});
