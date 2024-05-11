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
const add = Math.floor(Math.random() * 9999)
const psePaymentCreated = {
    "psereference": "PSEO" + Math.floor(Math.random() * 100000),
    "psereferencePse": "PSER" + Math.floor(Math.random() * 100000),
    "pseuserEmail": "USER" + add + "@test.com",
    "psefullNameUser": "USUARIO PSE PAYMENT " + add,
    "pseamount": Math.floor(Math.random() * 1000000),
    "psecellphone": "57" + Math.floor(Math.random() * 100000000)
}

const psePaymentToUpdate = {
    "pseuserEmail": "USER" + add + "@test.com",
    "psecellphone": "57" + Math.floor(Math.random() * 100000000)
}

describe("GET all pse payments", () => {
    it("should return all pse payments", async () => {
        const res = await request(app)
            .get("/api/v1/pse-payments")
        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body.results)).toBe(true)
    })
})

describe("POST pse payments", () => {
    it("should create a pse payments", async () => {
        const res = await request(app)
            .post("/api/v1/pse-payment")
            .send(psePaymentCreated)
        expect(res.statusCode).toBe(201)
        expect(res.body.psereference).toBe(psePaymentCreated.psereference)
        expect(res.body._id).not.toBe(null)
        objectId = res.body._id
    })

    it("should not create a pse payment for object null", async () => {
        const res = await request(app)
            .post("/api/v1/pse-payment")
            .send(null)
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe("Body cannot be empty")

    })
})

describe("GET a pse payment", () => {
    it("should get a pse payment", async () => {
        const res1 = await request(app)
            .get("/api/v1/pse-payment/" + objectId)
        expect(res1.statusCode).toBe(200)
        expect(res1.body.result.psereference).toBe(psePaymentCreated.psereference)
    })

    it("should not get a pse payment", async () => {
        const res2 = await request(app)
            .get("/api/v1/pse-payment/651c476e0acb1ee885cffb07")
        expect(res2.statusCode).toBe(204)
        //expect(res2.body.message).toBe("PSE payment not found")
    })
})

describe("PUT a pse payment", () => {
    it("should update a pse payment", async () => {
        const res = await request(app)
            .put("/api/v1/pse-payment/" + objectId)
            .send(psePaymentToUpdate)
        expect(res.statusCode).toBe(201)
        expect(res.body.idUpdated).toBe(objectId)
        expect(res.body.result.modifiedCount).toBe(1)
    })

    it("should not update a pse payment", async () => {
        const res = await request(app)
            .put("/api/v1/pse-payment/651c476e0acb1ee885cffb07")
            .send(psePaymentToUpdate)
        expect(res.statusCode).toBe(204)
        //expect(res.body.message).toBe("PSE payment not found")
    })

    it("should not update a pse payment for object null", async () => {
        const res = await request(app)
            .put("/api/v1/pse-payment/651c476e0acb1ee885cffb07")
            .send(null)
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe("Body cannot be empty")
    })

})