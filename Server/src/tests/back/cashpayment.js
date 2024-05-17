require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app-debug");

let mongoServer;
let CashPayment;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  CashPayment = mongoose.model('CashPayment', new mongoose.Schema({
    cashreference: String,
    cashuserEmail: String,
    cashcollectorCash: String,
    cashamount: Number,
    cashcellphone: String
  }));
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await CashPayment.create({
    cashreference: "CASH" + Math.floor(Math.random() * 100000),
    cashuserEmail: "USER" + Math.floor(Math.random() * 9999) + "@test.com",
    cashcollectorCash: "Efecty",
    cashamount: Math.floor(Math.random() * 1000000),
    cashcellphone: "57" + Math.floor(Math.random() * 100000000)
  });
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

const cashPaymentCreated = {
  cashreference: "CASH" + Math.floor(Math.random() * 100000),
  cashuserEmail: "USER" + Math.floor(Math.random() * 9999) + "@test.com",
  cashcollectorCash: "Efecty",
  cashamount: Math.floor(Math.random() * 1000000),
  cashcellphone: "57" + Math.floor(Math.random() * 100000000)
};

const cashPaymentToUpdate = {
  cashuserEmail: "USER" + Math.floor(Math.random() * 9999) + "@test.com",
  cashcellphone: "57" + Math.floor(Math.random() * 100000000)
};

let objectId;

describe("GET all cash payments", () => {
  it("should return all cash payments", async () => {
    const res = await request(app).get("/api/v1/cash-payments");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.results)).toBe(true);
  });
});

describe("POST cash payments", () => {
  it("should create a cash payment", async () => {
    const res = await request(app).post("/api/v1/cash-payment").send(cashPaymentCreated);
    expect(res.statusCode).toBe(201);
    expect(res.body.cashreference).toBe(cashPaymentCreated.cashreference);
    expect(res.body._id).not.toBe(null);
    objectId = res.body._id;
  });

  it("should not create a cash payment for object null", async () => {
    const res = await request(app).post("/api/v1/cash-payment").send(null);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Body cannot be empty");
  });
});

describe("GET a cash payment", () => {
  it("should get a cash payment", async () => {
    const res1 = await request(app).get("/api/v1/cash-payment/" + objectId);
    expect(res1.statusCode).toBe(200);
    expect(res1.body.result.cashreference).toBe(cashPaymentCreated.cashreference);
  });

  it("should not get a cash payment", async () => {
    const res2 = await request(app).get("/api/v1/cash-payment/66453e8bfff7372dc8e1132g");
    expect(res2.statusCode).toBe(204);
  });
});

describe("PUT a cash payment", () => {
  it("should update a cash payment", async () => {
    const res = await request(app).put("/api/v1/cash-payment/" + objectId).send(cashPaymentToUpdate);
    expect(res.statusCode).toBe(201);
    expect(res.body.idUpdated).toBe(objectId);
    expect(res.body.result.modifiedCount).toBe(1);
  });

  it("should not update a cash payment", async () => {
    const res = await request(app).put("/api/v1/cash-payment/66453e8bfff7372dc8e11328").send(cashPaymentToUpdate);
    expect(res.statusCode).toBe(204);
  });

  it("should not update a cash payment for object null", async () => {
    const res = await request(app).put("/api/v1/cash-payment/66453e8bfff7372dc8e1132f").send(null);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Body cannot be empty");
  });
});
