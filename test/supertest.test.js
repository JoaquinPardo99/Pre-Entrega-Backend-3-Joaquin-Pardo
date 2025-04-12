import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

let createdUserId = null;
let createdPetId = null;

describe("Users API", () => {
  const testEmail = `testuser${Date.now()}@example.com`;

  it("POST /api/sessions/register → debería registrar un nuevo usuario", async function () {
    this.timeout(5000);
    const res = await request(app).post("/api/sessions/register").send({
      first_name: "Test",
      last_name: "User",
      email: testEmail,
      password: "123456",
    });
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.exist;
    createdUserId = res.body.payload;
  });

  it("POST /api/sessions/register → debería fallar por email duplicado", async function () {
    this.timeout(5000);
    const res = await request(app).post("/api/sessions/register").send({
      first_name: "Test",
      last_name: "User",
      email: testEmail,
      password: "123456",
    });
    expect(res.status).to.equal(400);
    expect(res.body.message || res.body.error).to.include("exists");
  });

  it("POST /api/sessions/register → debería fallar por valores incompletos", async function () {
    this.timeout(5000);
    const res = await request(app).post("/api/sessions/register").send({
      email: "incompleto@example.com",
    });
    expect(res.status).to.equal(400);
    expect(res.body.message || res.body.error).to.include("Incomplete");
  });

  it("GET /api/users → debería obtener todos los usuarios", async function () {
    this.timeout(5000);
    const res = await request(app).get("/api/users");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array");
  });

  it("GET /api/users/:uid → debería obtener un usuario específico", async function () {
    this.timeout(5000);
    const res = await request(app).get(`/api/users/${createdUserId}`);
    expect(res.status).to.equal(200);
    expect(res.body.payload.email).to.equal(testEmail);
  });
});

describe("Pets API", () => {
  it("POST /api/pets → debería crear una nueva mascota", async function () {
    this.timeout(5000);
    const res = await request(app).post("/api/pets").send({
      name: "Firulais",
      specie: "Perro",
      birthDate: "2022-01-01",
    });
    expect(res.status).to.equal(200);
    expect(res.body.payload.name).to.equal("Firulais");
    createdPetId = res.body.payload._id;
  });

  it("POST /api/pets → debería fallar por valores incompletos", async function () {
    this.timeout(5000);
    const res = await request(app).post("/api/pets").send({
      name: "",
      specie: "Perro",
    });
    expect(res.status).to.equal(400);
    expect(res.body.message || res.body.error).to.include("Incomplete");
  });

  it("PUT /api/pets/:pid → debería actualizar la mascota", async function () {
    this.timeout(5000);
    const res = await request(app)
      .put(`/api/pets/${createdPetId}`)
      .send({ name: "Max" });
    expect(res.status).to.equal(200);
  });

  it("DELETE /api/pets/:pid → debería eliminar la mascota", async function () {
    this.timeout(5000);
    const res = await request(app).delete(`/api/pets/${createdPetId}`);
    expect(res.status).to.equal(200);
  });
});
