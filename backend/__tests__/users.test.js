const Cart = require("../models/cart");
const User = require("../models/user");

const sinon = require("sinon");
const request = require("supertest");
const app = require("../app");

describe("POST /user/", () => {
  test("should create a new user", async () => {
    const mockCartSave = sinon.stub(Cart.prototype, "save").resolves();
    const mockUserSave = sinon.stub(User.prototype, "save").resolves();

    const mockReqBody = {
      username: "testuser",
      password: "testpassword",
      email: "testuser@example.com",
    };

    const res = await request(app).post("/user/signup/").send(mockReqBody);

    expect(res.status).toBe(404);
    expect(res.header.location).toBe("http://localhost:5173/");

    sinon.assert.calledOnce(mockCartSave);
    sinon.assert.calledOnce(mockUserSave);

    mockCartSave.restore();
    mockUserSave.restore();
  });
});
