const express = require('express')
const router = express.Router()
const ccController = require('../controllers/creditCardController')

/**
 * @swagger
 * components:
 *  schemas:
 *      CreditCardPayment:
 *          type: object
 *          properties:
 *              ccreference:
 *                  type: string
 *                  description: Pay reference
 *              ccName:
 *                  type: string
 *                  description: Credit card name
 *              ccNumber:
 *                  type: string
 *                  description: Credit card number
 *              cclevel:
 *                  type: string
 *                  description: Credit card level
 *              ccMonthExp:
 *                  type: number
 *                  description: Credit card month expiration
 *              ccYearExp:
 *                  type: number
 *                  description: Credit card year expiration
 *              ccDues:
 *                  type: number
 *                  description: Dues yo pay
 *              ccPayDate:
 *                  type: string
 *                  description: Date of pay
 *              ccSecurityCode:
 *                  type: number
 *                  description: Credit card security code
 *              ccuserEmail:
 *                  type: string
 *                  description: email of payment
 *              ccamount:
 *                  type: number
 *                  description: Amount of payment
 *              cccellphone: 
 *                  type: string
 *                  description: Cellphone of user
 *          required:
 *              - ccreference
 *              - ccName
 *              - ccNumber
 *              - cclevel
 *              - ccMonthExp
 *              - ccYearExp
 *              - ccSecurityCode
 *              - ccDues
 *              - ccPayDate
 *              - ccuserEmail
 *              - ccamount
 *              - cellphone
 *          example:
 *              ccreference: CC00000001
 *              ccName: USER CREDIT CARD 1133
 *              ccNumber: 4111555588886666 
 *              cclevel: VISA
 *              ccMonthExp: 8
 *              ccYearExp: 25
 *              ccDues: 12
 *              ccSecurityCode: 123
 *              ccPayDate: 2024-09-24
 *              ccuserEmail: USER1133@test.com
 *              ccamount: 12500
 *              cccellphone: 573256589987
 */

/**
 * @swagger
 * /api/v1/credit-card-payment:
 *  post:
 *      summary: Create a new credit card payment
 *      tags: [CreditCard payment]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/CreditCardPayment'
 *      responses:
 *          201:
 *              description: New Credit card payment created!
 */
router.post('/v1/credit-card-payment', ccController.createCreditcardPayment)

/**
 * @swagger
 * /api/v1/credit-card-payments:
 *  get:
 *      summary: Return all credit card payments
 *      tags: [CreditCard payment]
 *      responses:
 *          200:
 *              description: Credit card payment!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/CreditCardPayment'
 */
router.get('/v1/credit-card-payments', ccController.getAllCreditcardPayments)

/**
 * @swagger
 * /api/v1/credit-card-payment/{id}:
 *  get:
 *      summary: Return a Credit card payment
 *      tags: [CreditCard payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Credit card payment id 
 *      responses:
 *          200:
 *              description: CreditCard payment!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/CreditCardPayment'
 *          404:
 *              description: Credit card payment not found
 */
router.get('/v1/credit-card-payment/:id', ccController.getACreditcardPayment)

/**
 * @swagger
 * /api/v1/credit-card-payment/{id}:
 *  put:
 *      summary: Update a Credit card payment
 *      tags: [CreditCard payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Credit card payment id 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/CreditCardPayment'
 *      responses:
 *          200:
 *              description: Credit card payment updated!
 *          404:
 *              description: Credit card payment not found
 */
router.put('/v1/credit-card-payment/:id', ccController.updateACreditcardPayment)

/**
 * @swagger
 * /api/v1/credit-card-payment/{id}:
 *  delete:
 *      summary: Delete a Credit card payment
 *      tags: [CreditCard payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Credit card payment id 
 *      responses:
 *          200:
 *              description: Credit card payment deleted!
 *          404:
 *              description: Credit card payment not found
 */
router.delete('/v1/credit-card-payment/:id', ccController.deleteACreditcardPayment)

module.exports = router;