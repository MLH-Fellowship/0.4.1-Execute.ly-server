import request from "supertest";
import app from "../src/app";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
  __dirname,
  "..",
  process.env.GOOGLE_CLOUD_JSON
);

describe("Sample Test", () => {
  test("It should just pass", async (done) => {
    request(app)
      .get("/")
      .then((resp) => {
        expect(resp.status).toBe(200);
      })
      .then(() => done());
  });

  test("check sample OCR target", async (done) => {
    request(app)
      .post("/getText")
      .attach("file", "./__tests__/ocr.jpg")
      .end(function (err, res) {
        expect(res.status).toBe(200);
        done();
      });
  });

  test("check sample code for execution", async (done) => {
    request(app)
      .post("/getOutput")
      .send({
        code:
          '#include<iostream>\n\nusing namespace std;\n\nint main(){\ncout << "fellowship !"  ;\n  return 0;\n}',
        lang_code: "cpp",
        lang_ver: "3",
      })
      .end(function (err, res) {
        expect(res.status).toBe(200);
        done();
      });
  });
});
