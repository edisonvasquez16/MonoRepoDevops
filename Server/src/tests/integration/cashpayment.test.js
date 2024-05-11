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
const cashPaymentCreated = {
    "cashreference": "CASH" + Math.floor(Math.random() * 100000),
    "cashuserEmail": "USER" + Math.floor(Math.random() * 9999) + "@test.com",
    "cashcollectorCash": "Efecty",
    "cashamount": Math.floor(Math.random() * 1000000),
    "cashcellphone": "57" + Math.floor(Math.random() * 100000000)
}

const cashPaymentToUpdate = {
    "cashuserEmail": "USER" + Math.floor(Math.random() * 9999) + "@test.com",
    "cashcellphone": "57" + Math.floor(Math.random() * 100000000)
}

describe("GET all cash payments", () => {
    it("should return all cash payments", async () => {
        const res = await request(app)
            .get("/api/v1/cash-payments")
        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body.results)).toBe(true)
    })
})

describe("POST Cash payments", () => {
    it("should create a cash payments", async () => {
        const res = await request(app)
            .post("/api/v1/cash-payment")
            .send(cashPaymentCreated)
        expect(res.statusCode).toBe(201)
        expect(res.body.cashreference).toBe(cashPaymentCreated.cashreference)
        expect(res.body._id).not.toBe(null)
        objectId = res.body._id
    })

    it("should not create a cash payment for object null", async () => {
        const res = await request(app)
            .post("/api/v1/cash-payment")
            .send(null)
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe("Body cannot be empty")

    })
})

describe("GET a cash payment", () => {
    it("should get a cash payment", async () => {
        const res1 = await request(app)
            .get("/api/v1/cash-payment/" + objectId)
        expect(res1.statusCode).toBe(200)
        expect(res1.body.result.cashreference).toBe(cashPaymentCreated.cashreference)
    })

    it("should not get a cash payment", async () => {
        const res2 = await request(app)
            .get("/api/v1/cash-payment/651556567d4fd87140e3b513")
        expect(res2.statusCode).toBe(204)
        //expect(res2.body.message).toBe("Cash payment not found")
    })
})

describe("PUT a cash payment", () => {
    it("should update a cash payment", async () => {
        const res = await request(app)
            .put("/api/v1/cash-payment/" + objectId)
            .send(cashPaymentToUpdate)
        expect(res.statusCode).toBe(201)
        expect(res.body.idUpdated).toBe(objectId)
        expect(res.body.result.modifiedCount).toBe(1)
    })

    it("should not update a cash payment", async () => {
        const res = await request(app)
            .put("/api/v1/cash-payment/651c3fd813859ab7b64634e5")
            .send(cashPaymentToUpdate)
        expect(res.status).toBe(204)
        //expect(res.body).toBe("Cash payment not found")
    })

    it("should not update a cash payment for object null", async () => {
        const res = await request(app)
            .put("/api/v1/cash-payment/651c3fd813859ab7b64634e5")
            .send(null)
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe("Body cannot be empty")
    })

})