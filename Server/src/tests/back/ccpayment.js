require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app-debug");

let mongoServer;
let CreditCardPayment;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  CreditCardPayment = mongoose.model('CreditCardPayment', new mongoose.Schema({
    ccreference: String,
    ccName: String,
    ccNumber: String,
    cclevel: String,
    ccMonthExp: Number,
    ccYearExp: Number,
    ccSecurityCode: Number,
    ccPayDate: String,
    ccDues: Number,
    ccuserEmail: String,
    ccamount: Number,
    cccellphone: String
  }));
  
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await CreditCardPayment.create({
    ccreference: "CC" + Math.floor(Math.random() * 100000),
    ccName: "USER CC " + Math.floor(Math.random() * 999),
    ccNumber: "4111555588886666",
    cclevel: "VISA",
    ccMonthExp: Math.floor(Math.random() * 12),
    ccYearExp: Math.floor(Math.random() * (30 - 23) + 23),
    ccSecurityCode: Math.floor(Math.random() * 999),
    ccPayDate: "2023-12-25",
    ccDues: Math.floor(Math.random() * 48),
    ccuserEmail: "USER" + Math.floor(Math.random() * 999) + "@test.com",
    ccamount: Math.floor(Math.random() * (1000000 - 3000) + 3000),
    cccellphone: "57" + Math.floor(Math.random() * 100000000)
  });
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

const ccPaymentCreated = {
  ccreference: "CC" + Math.floor(Math.random() * 100000),
  ccName: "USER CC " + Math.floor(Math.random() * 999),
  ccNumber: "4111555588886666",
  cclevel: "VISA",
  ccMonthExp: Math.floor(Math.random() * 12),
  ccYearExp: Math.floor(Math.random() * (30 - 23) + 23),
  ccSecurityCode: Math.floor(Math.random() * 999),
  ccPayDate: "2023-12-25",
  ccDues: Math.floor(Math.random() * 48),
  ccuserEmail: "USER" + Math.floor(Math.random() * 999) + "@test.com",
  ccamount: Math.floor(Math.random() * (1000000 - 3000) + 3000),
  cccellphone: "57" + Math.floor(Math.random() * 100000000)
};

const ccPaymentToUpdate = {
  ccuserEmail: "USER" + Math.floor(Math.random() * 999) + "@test.com",
  cccellphone: "57" + Math.floor(Math.random() * 100000000)
};

let objectId;

describe("GET all credit card payments", () => {
  it("should return all credit card payments", async () => {
    const res = await request(app).get("/api/v1/credit-card-payments");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.results)).toBe(true);
  });
});

describe("POST credit card payments", () => {
  it("should create a credit card payment", async () => {
    const res = await request(app).post("/api/v1/credit-card-payment").send(ccPaymentCreated);
    expect(res.statusCode).toBe(201);
    expect(res.body.ccreference).toBe(ccPaymentCreated.ccreference);
    expect(res.body._id).not.toBe(null);
    objectId = res.body._id;
  });

  it("should not create a credit card payment for object null", async () => {
    const res = await request(app).post("/api/v1/credit-card-payment").send(null);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Body cannot be empty");
  });
});

describe("GET a credit card payment", () => {
  it("should get a credit card payment", async () => {
    const res1 = await request(app).get("/api/v1/credit-card-payment/" + objectId);
    expect(res1.statusCode).toBe(200);
    expect(res1.body.result.ccreference).toBe(ccPaymentCreated.ccreference);
  });

  it("should not get a credit card payment", async () => {
    const res2 = await request(app).get("/api/v1/credit-card-payment/66453e93fff7372dc8e11333");
    expect(res2.statusCode).toBe(204);
  });
});

describe("PUT a credit card payment", () => {
  it("should update a credit card payment", async () => {
    const res = await request(app).put("/api/v1/credit-card-payment/" + objectId).send(ccPaymentToUpdate);
    expect(res.statusCode).toBe(201);
    expect(res.body.idUpdated).toBe(objectId);
    expect(res.body.result.modifiedCount).toBe(1);
  });

  it("should not update a credit card payment", async () => {
    const res = await request(app).put("/api/v1/credit-card-payment/66453e93fff7372dc8e11338").send(ccPaymentToUpdate);
    expect(res.statusCode).toBe(204);
  });

  it("should not update a credit card payment for object null", async () => {
    const res = await request(app).put("/api/v1/credit-card-payment/66453e93fff7372dc8e11331").send(null);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Body cannot be empty");
  });
});
