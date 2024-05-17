const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const {
    createPsePayment,
    getAllPsePayments,
    getAPsePayment,
    updateAPsePayment,
    deleteAPsePayment
} = require('../../controllers/pseController');
const PsePayment = require('../../models/psePayment');

const app = express();
app.use(express.json());
app.post('/psePayment', createPsePayment);
app.get('/psePayments', getAllPsePayments);
app.get('/psePayment/:id', getAPsePayment);
app.put('/psePayment/:id', updateAPsePayment);
app.delete('/psePayment/:id', deleteAPsePayment);

describe('PSE Payment Controller', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });

    describe('createPsePayment', () => {
        it('should return 400 if body is empty', async () => {
            const res = await request(app).post('/psePayment').send({});
            expect(res.status).toBe(400);
            expect(res.body).toEqual({
                status: 'Error',
                message: 'Body cannot be empty',
            });
        });

        it('should return 201 if PSE payment is created', async () => {
            const psePayment = {
                pseuserEmail: 'user@example.com',
                psefullNameUser: 'John Doe',
                psereference: 'ref123',
                psereferencePse: 'pse123',
                pseamount: 100,
                psecellphone: '1234567890',
            };
            mockingoose(PsePayment).toReturn(psePayment, 'save');

            const res = await request(app).post('/psePayment').send(psePayment);
            expect(res.status).toBe(201);
            expect(res.body).toMatchObject(psePayment);
        });

        it('should return 400 if there are validation errors', async () => {
            const psePayment = {
                pseuserEmail: 'invalidemail', // Invalid email
                psefullNameUser: 'John Doe',
                psereference: 'ref123',
                psereferencePse: 'pse123',
                pseamount: 100,
                psecellphone: '1234567890',
            };

            const res = await request(app).post('/psePayment').send(psePayment);
            expect(res.status).toBe(400);
            expect(res.body.errors.pseuserEmail).toBe('Email is not valid');
        });
    });

    describe('getAllPsePayments', () => {
        it('should return 204 if no PSE payments found', async () => {
            mockingoose(PsePayment).toReturn([], 'find');
    
            const res = await request(app).get('/psePayments');
            expect(res.status).toBe(204);
        });
    
        it('should return 200 with all PSE payments', async () => {
            const psePayments = [{ pseuserEmail: 'user@example.com', pseamount: 100 }];
            mockingoose(PsePayment).toReturn(psePayments, 'find');
    
            const res = await request(app).get('/psePayments');
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                status: 'OK',
                message: 'PSE payments request',
                results: psePayments,
            });
        });
    
        it('should return 400 if there is an error in the database query', async () => {
            mockingoose(PsePayment).toReturn(new Error('Database error'), 'find');
    
            const res = await request(app).get('/psePayments');
            expect(res.status).toBe(400);
        });
    });
    

    describe('getAPsePayment', () => {
        it('should return 204 if PSE payment not found', async () => {
            const id = new mongoose.Types.ObjectId();
            mockingoose(PsePayment).toReturn(null, 'findOne');
    
            const res = await request(app).get(`/psePayment/${id}`);
            expect(res.status).toBe(204);
        });
    
        it('should return 200 with the PSE payment', async () => {
            const id = new mongoose.Types.ObjectId();
            const psePayment = { _id: id, pseuserEmail: 'user@example.com', pseamount: 100 };
            mockingoose(PsePayment).toReturn(psePayment, 'findOne');
    
            const res = await request(app).get(`/psePayment/${id}`);
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                status: 'OK',
                message: 'PSE payment request',
                result: {
                    ...psePayment,
                    _id: psePayment._id.toString(),
                },
            });
        });
    });
    

    describe('updateAPsePayment', () => {
        it('should return 400 if body is empty', async () => {
            const id = new mongoose.Types.ObjectId();
            const res = await request(app).put(`/psePayment/${id}`).send({});
            expect(res.status).toBe(400);
            expect(res.body).toEqual({
                status: 'Error',
                message: 'Body cannot be empty',
            });
        });
    
        it('should return 204 if PSE payment not found', async () => {
            const id = new mongoose.Types.ObjectId();
            mockingoose(PsePayment).toReturn({ modifiedCount: 0 }, 'updateOne');
    
            const res = await request(app).put(`/psePayment/${id}`).send({
                pseuserEmail: 'newuser@example.com',
                psefullNameUser: 'New User',
                psereference: 'newref123',
                psereferencePse: 'newpse123',
                pseamount: 200,
                psecellphone: '0987654321',
            });
            expect(res.status).toBe(204);
        });
    
        it('should return 201 if PSE payment is updated', async () => {
            const id = new mongoose.Types.ObjectId();
            mockingoose(PsePayment).toReturn({ modifiedCount: 1 }, 'updateOne');
    
            const res = await request(app).put(`/psePayment/${id}`).send({
                pseuserEmail: 'newuser@example.com',
                psefullNameUser: 'New User',
                psereference: 'newref123',
                psereferencePse: 'newpse123',
                pseamount: 200,
                psecellphone: '0987654321',
            });
            expect(res.status).toBe(201);
            expect(res.body).toEqual({
                status: 'OK',
                message: 'PSE payment updated successfully',
                idUpdated: id.toString(),
                result: { modifiedCount: 1 },
            });
        });
    });
    

    describe('deleteAPsePayment', () => {
        it('should return 201 if PSE payment is deleted', async () => {
            const id = new mongoose.Types.ObjectId();
            mockingoose(PsePayment).toReturn({ deletedCount: 1 }, 'deleteOne');
    
            const res = await request(app).delete(`/psePayment/${id}`);
            expect(res.status).toBe(201);
            expect(res.body).toEqual({
                status: 'OK',
                message: 'PSE payment deleted successfully',
                items_deleted: 1,
            });
        });
    
        it('should return 404 if PSE payment not found', async () => {
            const id = new mongoose.Types.ObjectId();
            mockingoose(PsePayment).toReturn({ deletedCount: 0 }, 'deleteOne');
    
            const res = await request(app).delete(`/psePayment/${id}`);
            expect(res.status).toBe(404);
            expect(res.body).toEqual({
                status: 'Error',
                message: 'PSE payment not found',
                items_deleted: 0,
            });
        });
    });
    
});
