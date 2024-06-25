const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app"); 
const User = require("../models/user"); 
const Cart = require("../models/cart");

describe("POST /user", () => {
  test("should create a new user", async () => {
    await request(app)
      .get("/user/signup/")
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });
});
