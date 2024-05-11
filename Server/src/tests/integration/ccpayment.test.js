const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app-debug");
require("dotenv").config();

beforeEach(async () => {
    await mongoose
        .connect(process.env.MONGO_DATABASE_UNIT)
        .then(() => console.log('Connected to MongoDB UNIT Successfull!'))
        .catch((error) => (console.error(error)))
})

afterEach(async () => {
    await mongoose.connection.close();
})

let objectId
const add = Math.floor(Math.random() * 999)
const ccPaymentCreated = {
    "ccreference": "CC" + Math.floor(Math.random() * 100000),
    "ccName": "USER CC " + add,
    "ccNumber": "4111555588886666",
    "cclevel": "VISA",
    "ccMonthExp": Math.floor(Math.random() * 12),
    "ccYearExp": Math.floor(Math.random() * (30 - 23) + 23),
    "ccSecurityCode": add,
    "ccPayDate": "2023-12-25",
    "ccDues": Math.floor(Math.random() * 48),
    "ccuserEmail": "USER" + add + "@test.com",
    "ccamount": Math.floor(Math.random() * (1000000 - 3000) + 3000),
    "cccellphone": "57" + Math.floor(Math.random() * 100000000)
  }

const ccPaymentToUpdate = {
    "ccuserEmail": "USER" + add + "@test.com",
    "cccellphone": "57" + Math.floor(Math.random() * 100000000)
}

describe("GET all credit card payments", () => {
    it("should return all credit card payments", async () => {
        const res = await request(app)
            .get("/api/v1/credit-card-payments")
        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body.results)).toBe(true)
    })
})

describe("POST credit card payments", () => {
    it("should create a credit card payment", async () => {
        const res = await request(app)
            .post("/api/v1/credit-card-payment")
            .send(ccPaymentCreated)
        expect(res.statusCode).toBe(201)
        expect(res.body.ccreference).toBe(ccPaymentCreated.ccreference)
        expect(res.body._id).not.toBe(null)
        objectId = res.body._id
    })

    it("should not create acredit card card payment for object null", async () => {
        const res = await request(app)
            .post("/api/v1/credit-card-payment")
            .send(null)
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe("Body cannot be empty")

    })
})

describe("GET a credit card payment", () => {
    it("should get a credit card payment", async () => {
        const res1 = await request(app)
            .get("/api/v1/credit-card-payment/" + objectId)
        expect(res1.statusCode).toBe(200)
        expect(res1.body.result.ccreference).toBe(ccPaymentCreated.ccreference)
    })

    it("should not get a credit card payment", async () => {
        const res2 = await request(app)
            .get("/api/v1/credit-card-payment/65162a3d7d4fd87140e3b588")
        expect(res2.statusCode).toBe(204)
        //expect(res2.body.message).toBe("Credit card payment not found")
    })
})

describe("PUT a credit card payment", () => {
    it("should update a credit card payment", async () => {
        const res = await request(app)
            .put("/api/v1/credit-card-payment/" + objectId)
            .send(ccPaymentToUpdate)
        expect(res.statusCode).toBe(201)
        expect(res.body.idUpdated).toBe(objectId)
        expect(res.body.result.modifiedCount).toBe(1)
    })

    it("should not update a credit card payment", async () => {
        const res = await request(app)
            .put("/api/v1/credit-card-payment/65162a3d7d4fd87140e3b513")
            .send(ccPaymentToUpdate)
        expect(res.statusCode).toBe(204)
        //expect(res.body.message).toBe("Credit card payment not found")
    })

    it("should not update a credit card payment for object null", async () => {
        const res = await request(app)
            .put("/api/v1/credit-card-payment/6511ed11d1dfd8f1c1d25598")
            .send(null)
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe("Body cannot be empty")
    })

})