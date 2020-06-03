import request from "supertest";
import app from "../src/app";

describe("Sample Test", () => {
  test("It should just pass", async (done) => {
    request(app)
      .get("/")
      .then((resp) => {
        expect(resp.status).toBe(200);
      })
      .then(() => done());
  });
});
