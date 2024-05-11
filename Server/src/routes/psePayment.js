const express = require('express')
const pseController = require('../controllers/pseController')
const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      PsePayment:
 *          type: object
 *          properties:
 *              psereference:
 *                  type: string
 *                  description: Pay reference
 *              psereferencePse:
 *                  type: string
 *                  description: Pay reference of pse
 *              pseuserEmail:
 *                  type: string
 *                  description: email of payment
 *              psefullNameUser: 
 *                  type: string
 *                  description: Fullname of user payment
 *              pseamount:
 *                  type: Number
 *                  description: Amount of payment
 *              psecellphone: 
 *                  type: Number
 *                  description: Cellphone of user
 *          required:
 *              - psereference
 *              - psereferencePse
 *              - pseuserEmail
 *              - psefullNameUser
 *              - pseamount
 *              - psecellphone
 *          example:
 *              psereference: PSEO00001
 *              psereferencePse: PSER00001
 *              pseuserEmail: USER4321@test.com
 *              psefullNameUser: USUARIO PSE PAYMENT 4321
 *              pseamount: 15000
 *              psecellphone: 573225568899
 */

/**
 * @swagger
 * /api/v1/pse-payment:
 *  post:
 *      summary: Create a new pse payment
 *      tags: [Pse payment]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/PsePayment'
 *      responses:
 *          201:
 *              description: New pse payment created!
 */
router.post('/v1/pse-payment', pseController.createPsePayment)

/**
 * @swagger
 * /api/v1/pse-payments:
 *  get:
 *      summary: Return all pse payment
 *      tags: [Pse payment]
 *      responses:
 *          200:
 *              description: Pse payment!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/PsePayment'
 */
router.get('/v1/pse-payments', pseController.getAllPsePayments)

/**
 * @swagger
 * /api/v1/pse-payment/{id}:
 *  get:
 *      summary: Return a pse payment
 *      tags: [Pse payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The pse payment id 
 *      responses:
 *          200:
 *              description: Pse payment!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/PsePayment'
 *          404:
 *              description: Pse payment not found
 */
router.get('/v1/pse-payment/:id', pseController.getAPsePayment)

/**
 * @swagger
 * /api/v1/pse-payment/{id}:
 *  put:
 *      summary: Update a pse payment
 *      tags: [Pse payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The pse payment id 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/PsePayment'
 *      responses:
 *          200:
 *              description: Pse payment updated!
 *          404:
 *              description: Pse payment not found
 */
router.put('/v1/pse-payment/:id', pseController.updateAPsePayment)

/**
 * @swagger
 * /api/v1/pse-payment/{id}:
 *  delete:
 *      summary: Delete a pse payment
 *      tags: [Pse payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The pse payment id 
 *      responses:
 *          200:
 *              description: pse payment deleted!
 *          404:
 *              description: pse payment not found
 */
router.delete('/v1/pse-payment/:id', pseController.deleteAPsePayment)

module.exports = router