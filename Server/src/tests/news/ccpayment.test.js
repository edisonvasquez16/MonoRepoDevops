const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const {
  createCreditcardPayment,
  getAllCreditcardPayments,
  getACreditcardPayment,
  updateACreditcardPayment,
  deleteACreditcardPayment
} = require('../../controllers/creditCardController');
const CreditCardPayment = require('../../models/creditCardPayment');

const app = express();
app.use(express.json());
app.post('/creditCardPayment', createCreditcardPayment);
app.get('/creditCardPayments', getAllCreditcardPayments);
app.get('/creditCardPayment/:id', getACreditcardPayment);
app.put('/creditCardPayment/:id', updateACreditcardPayment);
app.delete('/creditCardPayment/:id', deleteACreditcardPayment);

describe('Credit Card Payment Controller', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('createCreditcardPayment', () => {
    it('should return 400 if body is empty', async () => {
      const res = await request(app).post('/creditCardPayment').send({});
      expect(res.status).toBe(400);
    });

    it('should return 201 if credit card payment is created', async () => {
      const creditCardPayment = {
        ccreference: "CC" + Math.floor(Math.random() * 100000),
        ccName: "USER CC " + Math.floor(Math.random() * 999),
        ccNumber: "4111555588886666",
        cclevel: "VISA",
        ccMonthExp: Math.floor(Math.random() * 12),
        ccYearExp: Math.floor(Math.random() * (30 - 23) + 23),
        ccSecurityCode: Math.floor(Math.random() * 999),
        ccPayDate: "2023-12-25",
        ccDues: Math.floor(Math.random() * 48),
        ccuserEmail: "user" + Math.floor(Math.random() * 999) + "@test.com",
        ccamount: "" + Math.floor(Math.random() * (1000000 - 3000) + 3000),
        cccellphone: "57" + Math.floor(Math.random() * 100000000) 
      };
      mockingoose(CreditCardPayment).toReturn(creditCardPayment, 'save');
    
      const res = await request(app).post('/creditCardPayment').send(creditCardPayment);
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(creditCardPayment);
    });
    

    it('should return 400 if there are validation errors', async () => {
      const creditCardPayment = {
        ccreference: 'ref123',
        ccName: 'John Doe',
      };
      const error = new mongoose.Error.ValidationError(null);
      error.addError('ccNumber', new mongoose.Error.ValidatorError({
        message: 'Path `ccNumber` is required.',
        path: 'ccNumber',
      }));
      mockingoose(CreditCardPayment).toReturn(error, 'save');

      const res = await request(app).post('/creditCardPayment').send(creditCardPayment);
      expect(res.status).toBe(400);
      expect(res.body.errors.ccNumber).toBe('Number is required');
    });
  });

  describe('getAllCreditcardPayments', () => {
    it('should return 204 if no credit card payments found', async () => {
      mockingoose(CreditCardPayment).toReturn([], 'find');

      const res = await request(app).get('/creditCardPayments');
      expect(res.status).toBe(204);
    });

    it('should return 200 with all credit card payments', async () => {
      const creditCardPayments = [{ ccreference: 'ref123', ccName: 'John Doe', ccamount: 100 }];
      mockingoose(CreditCardPayment).toReturn([creditCardPayments], 'find');

      const res = await request(app).get('/creditCardPayments');
      expect(res.status).toBe(200);
    });
  });

  describe('getACreditcardPayment', () => {
    it('should return 204 if credit card payment not found', async () => {
      const id = new mongoose.Types.ObjectId();
      mockingoose(CreditCardPayment).toReturn(null, 'findOne');

      const res = await request(app).get(`/creditCardPayment/${id}`);
      expect(res.status).toBe(204);
    });

    it('should return 200 with the credit card payment', async () => {
      const id = new mongoose.Types.ObjectId();
      const creditCardPayment = {
        _id: id,
        ccreference: 'ref123',
        ccName: 'John Doe',
        ccamount: 100
      };
      mockingoose(CreditCardPayment).toReturn(creditCardPayment, 'findOne');

      const res = await request(app).get(`/creditCardPayment/${id}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 'OK',
        message: 'Credit card payment request',
        result: {
          ...creditCardPayment,
          _id: creditCardPayment._id.toString(),
          ccamount: "100"
        },
      });
    });
  });

  describe('updateACreditcardPayment', () => {
    it('should return 400 if body is empty', async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(app).put(`/creditCardPayment/${id}`).send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        status: 'Error',
        message: 'Body cannot be empty',
      });
    });

    it('should return 204 if credit card payment not found', async () => {
      const id = new mongoose.Types.ObjectId();
      mockingoose(CreditCardPayment).toReturn({ modifiedCount: 0 }, 'updateOne');

      const res = await request(app).put(`/creditCardPayment/${id}`).send({
        ccuserEmail: 'newuser@example.com',
        cccellphone: '0987654321',
      });
      expect(res.status).toBe(204);
    });

    it('should return 201 if credit card payment is updated', async () => {
      const id = new mongoose.Types.ObjectId();
      mockingoose(CreditCardPayment).toReturn({ modifiedCount: 1 }, 'updateOne');
    
      const res = await request(app).put(`/creditCardPayment/${id}`).send({
        ccuserEmail: 'newuser@example.com',
        cccellphone: '0987654321',
      });
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        status: 'OK',
        message: 'Credit card payment updated successfull',
        idUpdated: id.toString(),
      });
    });
  });

  describe('deleteACreditcardPayment', () => {
    it('should return 204 if credit card payment not found', async () => {
      const id = new mongoose.Types.ObjectId();
      mockingoose(CreditCardPayment).toReturn({ deletedCount: 0 }, 'deleteOne');

      const res = await request(app).delete(`/creditCardPayment/${id}`);
      expect(res.status).toBe(204);
    });

    it('should return 201 if credit card payment is deleted', async () => {
      const id = new mongoose.Types.ObjectId();
      mockingoose(CreditCardPayment).toReturn({ deletedCount: 1 }, 'deleteOne');

      const res = await request(app).delete(`/creditCardPayment/${id}`);
      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        status: 'OK',
        message: 'Credit card payment deleted successfull',
        items_deleted: 1,
      });
    });
  });
});
