const request = require("supertest");
const app = require("./app"); // Use app.js for testing
const db = require("../models/sequelize");
const path = require("path");


beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe("Block API Tests", () => {
  //Get the Empty Array
  //   test("GET /blocks - should return empty array initially", async () => {
  //     const res = await request(app).get("/blocks");
  //     expect(res.statusCode).toBe(200);
  //     expect(res.body.rows).toEqual(expect.any(Array));
  //     expect(res.body.rows.length).toBe(0);
  //   });


  //   test("POST /upload - should upload and parse DXF file", async () => {
  //     const res = await request(app)
  //       .post("/upload")
  //       .attach("file", path.resolve(__dirname, "files/sample.dxf"));


  //     expect(res.statusCode).toBe(200);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toMatch(/Blocks saved|extracted/i);
  //   });

  // test("GET /blocks - should return blocks", async () => {
  //   const res = await request(app).get("/blocks");

  //   // Log the response body to inspect its structure
  //   console.log(res.body);

  //   // Ensure that count is a number and is correctly returned
  //   expect(res.body.count).toBeDefined(); // check if count exists
  //   expect(typeof res.body.count).toBe('number'); // check if count is a number
  // });

  // test("GET /blocks/:id - should return a single block", async () => {
  //   const blockId = 1; // Make sure this matches a real block in your database
  //   const res = await request(app).get(`/blocks/${blockId}`);

  //   expect(res.status).toBe(200);
  //   expect(res.body).toHaveProperty('id', blockId);
  // });


  //   test("GET /blocks/search/:name - should search for a block by name", async () => {
  //     const all = await request(app).get("/blocks");
  //     const name = all.body[0].name;
  //     const res = await request(app).get(`/blocks/search/${name}`);

  //     expect(res.statusCode).toBe(200);
  //     expect(res.body[0].name.toLowerCase()).toContain(name.toLowerCase());
  //   });

  //   test("GET /blocks/:id - should return 404 if block not found", async () => {
  //     const res = await request(app).get("/blocks/99999");
  //     expect(res.statusCode).toBe(404);
  //     expect(res.body).toHaveProperty("message");
  //   });
});
