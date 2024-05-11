const express = require('express')
const router = express.Router()
const cashController = require('../controllers/cashController')

/**
 * @swagger
 * components:
 *  schemas:
 *      CashPayment:
 *          type: object
 *          properties:
 *              cashreference:
 *                  type: string
 *                  description: Pay reference
 *              cashuserEmail:
 *                  type: string
 *                  description: email of payment
 *              cashcollectorCash: 
 *                  type: string
 *                  description: Collector of payment cash
 *              cashamount:
 *                  type: number
 *                  description: Amount of payment
 *              cashcellphone: 
 *                  type: string
 *                  description: Cellphone of user
 *          required:
 *              - cashreference
 *              - cashuserEmail
 *              - cashcollectorCash
 *              - cashamount
 *              - cashcellphone
 *          example:
 *              cashreference: CASH00001
 *              cashuserEmail: USER1234@test.com
 *              cashcollectorCash: Efecty
 *              cashamount: 15000
 *              cashcellphone: 573225568899
 */

/**
 * @swagger
 * /api/v1/cash-payment:
 *  post:
 *      summary: Create a new cash payment
 *      tags: [Cash payment]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/CashPayment'
 *      responses:
 *          201:
 *              description: New cash payment created!
 */
router.post('/v1/cash-payment', cashController.createCashPayment)

/**
 * @swagger
 * /api/v1/cash-payments:
 *  get:
 *      summary: Return all cash payment
 *      tags: [Cash payment]
 *      responses:
 *          200:
 *              description: Cash payment!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/CashPayment'
 */
router.get('/v1/cash-payments', cashController.getAllCashPayments)

/**
 * @swagger
 * /api/v1/cash-payment/{id}:
 *  get:
 *      summary: Return a cash payment
 *      tags: [Cash payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The cash payment id 
 *      responses:
 *          200:
 *              description: Cash payment!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/CashPayment'
 *          404:
 *              description: Cash payment not found
 */
router.get('/v1/cash-payment/:id', cashController.getACashPayment)

/**
 * @swagger
 * /api/v1/cash-payment/{id}:
 *  put:
 *      summary: Update a cash payment
 *      tags: [Cash payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The cash payment id 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/CashPayment'
 *      responses:
 *          200:
 *              description: Cash payment updated!
 *          404:
 *              description: Cash payment not found
 */
router.put('/v1/cash-payment/:id', cashController.updateACashPayment)

/**
 * @swagger
 * /api/v1/cash-payment/{id}:
 *  delete:
 *      summary: Delete a cash payment
 *      tags: [Cash payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The cash payment id 
 *      responses:
 *          200:
 *              description: Cash payment deleted!
 *          404:
 *              description: Cash payment not found
 */
router.delete('/v1/cash-payment/:id', cashController.deleteACashPayment)

module.exports = router;