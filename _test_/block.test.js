process.env.NODE_ENV = 'test'; // important before anything
require('dotenv').config({ path: '.env.test' });
const request = require("supertest");
const app = require("./server");
const path = require("path");

console.log(app);


describe("Block API Tests", () => {

  test("POST /upload - should upload and parse DXF file", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("file", path.resolve(__dirname, "files/sample.dxf"));


    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toMatch(/Blocks saved|extracted/i);
  });

  test("GET /blocks - should return blocks", async () => {
    const res = await request(app).get("/blocks");
    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBeDefined(); // check if count exists
    expect(typeof res.body.count).toBe('number'); // check if count is a number
  });


  test("GET /blocks/:id - should return 404 if block not found", async () => {
    const res = await request(app).get("/blocks/99999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
