import request from "supertest";
import app from "./index";
const mock = fs.readFileSync("mockData.json", "utf-8");

describe("Test of the endpoints", () => {
  it("GET /Send an array of meals", async () => {
    const response = await request(app).get("/meals");
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("GET /meals/:id send back a specific meal", async () => {
    const response = await request(app).get("/meals/1");
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("title", "Test");
  });

  // it("POST /ai-generate génère un repas avec l'IA", async () => {
  //   const response = await request(app).post("/ai-generate");
  //   expect(response.status).toEqual(200);
  //   expect(response.body).toHaveProperty("name");
  //   expect(response.body).toHaveProperty("description");
  //   expect(response.body).toHaveProperty("price");
  // });

  // Testez également les autres endpoints de votre application
});
