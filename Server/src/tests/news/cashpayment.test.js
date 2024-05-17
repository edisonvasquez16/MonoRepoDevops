const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const { 
  createCashPayment, 
  getAllCashPayments, 
  getACashPayment, 
  updateACashPayment, 
  deleteACashPayment 
} = require('../../controllers/cashController');
const CashPayment = require('../../models/cashPayment');

const app = express();
app.use(express.json());
app.post('/cashPayment', createCashPayment);
app.get('/cashPayments', getAllCashPayments);
app.get('/cashPayment/:id', getACashPayment);
app.put('/cashPayment/:id', updateACashPayment);
app.delete('/cashPayment/:id', deleteACashPayment);

describe('Cash Payment Controller', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('createCashPayment', () => {
    it('should return 400 if body is empty', async () => {
      const res = await request(app).post('/cashPayment').send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        status: 'Error',
        message: 'Body cannot be empty',
      });
    });

    it('should return 201 if cash payment is created', async () => {
      const cashPayment = {
        cashreference: 'ref123',
        cashuserEmail: 'user@example.com',
        cashcollectorCash: 'collector123',
        cashamount: 100,
        cashcellphone: '1234567890',
      };
      mockingoose(CashPayment).toReturn(cashPayment, 'save');

      const res = await request(app).post('/cashPayment').send(cashPayment);
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(cashPayment);
    });
  });

  describe('getAllCashPayments', () => {
    it('should return 204 if no cash payments found', async () => {
      mockingoose(CashPayment).toReturn([], 'find');

      const res = await request(app).get('/cashPayments');
      expect(res.status).toBe(204);
    });

    it('should return 200 with all cash payments', async () => {
      const cashPayments = [{ cashreference: 'ref123', cashuserEmail: 'user@example.com', cashamount: 100 }];
      mockingoose(CashPayment).toReturn(cashPayments, 'find');

      const res = await request(app).get('/cashPayments');
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        status: 'OK',
        message: 'Cash payments request',
        results: cashPayments,
      });
    });
  });

  describe('getACashPayment', () => {
    it('should return 204 if cash payment not found', async () => {
      const id = new mongoose.Types.ObjectId();
      mockingoose(CashPayment).toReturn(null, 'findOne');

      const res = await request(app).get(`/cashPayment/${id}`);
      expect(res.status).toBe(204);
    });

    it('should return 200 with the cash payment', async () => {
      const id = new mongoose.Types.ObjectId();
      const cashPayment = { _id: id, cashreference: 'ref123', cashuserEmail: 'user@example.com', cashamount: 100 };
      mockingoose(CashPayment).toReturn(cashPayment, 'findOne');

      const res = await request(app).get(`/cashPayment/${id}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 'OK',
        message: 'Cash payment request',
        result: {
          ...cashPayment,
          _id: cashPayment._id.toString(),
        },
      });
    });
  });

  describe('updateACashPayment', () => {
    it('should return 400 if body is empty', async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(app).put(`/cashPayment/${id}`).send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        status: 'Error',
        message: 'Body cannot be empty',
      });
    });

    it('should return 204 if cash payment not found', async () => {
      const id = new mongoose.Types.ObjectId();
      mockingoose(CashPayment).toReturn({ modifiedCount: 0 }, 'updateOne');

      const res = await request(app).put(`/cashPayment/${id}`).send({
        cashuserEmail: 'newuser@example.com',
        cashcellphone: '0987654321',
      });
      expect(res.status).toBe(204);
    });

    it('should return 201 if cash payment is updated', async () => {
      const id = new mongoose.Types.ObjectId();
      mockingoose(CashPayment).toReturn({ modifiedCount: 1 }, 'updateOne');

      const res = await request(app).put(`/cashPayment/${id}`).send({
        cashuserEmail: 'newuser@example.com',
        cashcellphone: '0987654321',
      });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        status: 'OK',
        message: 'Cash payment updated successfull',
        idUpdated: id.toString(),
        result: { modifiedCount: 1 },
      });
    });
  });

  describe('deleteACashPayment', () => {
    it('should return 204 if cash payment not found', async () => {
      const id = new mongoose.Types.ObjectId();
      mockingoose(CashPayment).toReturn({ deletedCount: 0 }, 'deleteOne');

      const res = await request(app).delete(`/cashPayment/${id}`);
      expect(res.status).toBe(204);
    });

    it('should return 201 if cash payment is deleted', async () => {
      const id = new mongoose.Types.ObjectId();
      mockingoose(CashPayment).toReturn({ deletedCount: 1 }, 'deleteOne');

      const res = await request(app).delete(`/cashPayment/${id}`);
      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        status: 'OK',
        message: 'Cash payment deleted successfull',
        items_deleted: 1,
      });
    });
  });
});
