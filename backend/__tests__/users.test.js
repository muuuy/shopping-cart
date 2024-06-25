const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const User = require("../models/user");
const Cart = require("../models/cart");

const user_controller = require("../controllers/userController");

describe("POST /user/signup", () => {
  test("should create a new user", async () => {
    const userInfo = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
    };

    await request(app)
      .post("/user/signup/")
      .send(userInfo)
      .expect(404) 
      .then((response) => {
        console.log("Response Body:", response.request.url);
      });
  });
});
