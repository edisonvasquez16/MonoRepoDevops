require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app-debug");

let mongoServer;
let PsePayment;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  PsePayment = mongoose.model('PsePayment', new mongoose.Schema({
    psereference: String,
    psereferencePse: String,
    pseuserEmail: String,
    psefullNameUser: String,
    pseamount: Number,
    psecellphone: String
  }));
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await PsePayment.create({
    psereference: "PSEO" + Math.floor(Math.random() * 100000),
    psereferencePse: "PSER" + Math.floor(Math.random() * 100000),
    pseuserEmail: "USER" + Math.floor(Math.random() * 9999) + "@test.com",
    psefullNameUser: "USUARIO PSE PAYMENT " + Math.floor(Math.random() * 9999),
    pseamount: Math.floor(Math.random() * 1000000),
    psecellphone: "57" + Math.floor(Math.random() * 100000000)
  });
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

const psePaymentCreated = {
  psereference: "PSEO" + Math.floor(Math.random() * 100000),
  psereferencePse: "PSER" + Math.floor(Math.random() * 100000),
  pseuserEmail: "USER" + Math.floor(Math.random() * 9999) + "@test.com",
  psefullNameUser: "USUARIO PSE PAYMENT " + Math.floor(Math.random() * 9999),
  pseamount: Math.floor(Math.random() * 1000000),
  psecellphone: "57" + Math.floor(Math.random() * 100000000)
};

const psePaymentToUpdate = {
  pseuserEmail: "USER" + Math.floor(Math.random() * 9999) + "@test.com",
  psecellphone: "57" + Math.floor(Math.random() * 100000000)
};

let objectId;

describe("GET all pse payments", () => {
  it("should return all pse payments", async () => {
    const res = await request(app).get("/api/v1/pse-payments");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.results)).toBe(true);
  });
});

describe("POST pse payments", () => {
  it("should create a pse payment", async () => {
    const res = await request(app).post("/api/v1/pse-payment").send(psePaymentCreated);
    expect(res.statusCode).toBe(201);
    expect(res.body.psereference).toBe(psePaymentCreated.psereference);
    expect(res.body._id).not.toBe(null);
    objectId = res.body._id;
  });

  it("should not create a pse payment for object null", async () => {
    const res = await request(app).post("/api/v1/pse-payment").send(null);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Body cannot be empty");
  });
});

describe("GET a pse payment", () => {
  it("should get a pse payment", async () => {
    const res = await request(app).get("/api/v1/pse-payment/" + objectId);
    expect(res.statusCode).toBe(200);
    expect(res.body.result.psereference).toBe(psePaymentCreated.psereference);
  });

  it("should not get a pse payment", async () => {
    const res = await request(app).get("/api/v1/pse-payment/66453e97fff7372dc8e11334");
    expect(res.statusCode).toBe(204);
  });
});

describe("PUT a pse payment", () => {
  it("should update a pse payment", async () => {
    const res = await request(app).put("/api/v1/pse-payment/" + objectId).send(psePaymentToUpdate);
    expect(res.statusCode).toBe(201);
    expect(res.body.result.modifiedCount).toBe(1);
  });

  it("should not update a pse payment", async () => {
    const res = await request(app).put("/api/v1/pse-payment/66453e97fff7372dc8e11338").send(psePaymentToUpdate);
    expect(res.statusCode).toBe(204);
  });

  it("should not update a pse payment for object null", async () => {
    const res = await request(app).put("/api/v1/pse-payment/66453e97fff7372dc8e11333").send(null);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Body cannot be empty");
  });
});
