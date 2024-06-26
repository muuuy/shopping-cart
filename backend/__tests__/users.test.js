const users = require("../routes/users");

const request = require("supertest");
const app = require("../app");
const express = require("express");

const user_controller = require("../controllers/userController");

app.use(express.urlencoded({ extended: false }));
app.use("/", users);

describe("POST /user/signup", () => {
  test("should create a new user", async () => {
    const userInfo = {
      username: "testuser",
      password: "testpassword",
      verifyPassword: "testpassword",
      email: "test@example.com",
    };

    await request(app)
      .post("/users/signup/")
      .send(userInfo)
      .expect(200)
      .then((response) => {
        console.log("Response Body:", response.request.url);
      });
  });
});
