const express = require('express')
const route = express.Router()
const errors = require('../strings/errors')
const messages = require('../strings/messages')
const UniversityController = require('../controllers/UniversityController')

/**
 * @swagger
 * /:
 *  get:
 *    summary: Return the a api information
 *    tags: [Api info]
 *    responses:
 *      200:
 *        description: The information about the api
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiInfo'
 */
route.get('/', (req, res) => {
  res.json(messages.homeMessage)
})

/**
 * @swagger
 * components:
 *   schemas:
 *     ApiInfo:
 *       type: object
 *       properties:
 *          author:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the api author
 *              website:
 *                type: string
 *                description: The website of the author
 *          github:
 *            type: string
 *            description: The github repository of the author
 *          example:
 *            type: string
 *            description: The example url
 *     University:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the university
 *         name:
 *           type: string
 *           description: The university name
 *         state_province:
 *           type: string
 *           description: The state of university
 *         domains:
 *            type: array
 *            description: The domain list of the university
 *            items:
 *              type: string
 *         web_pages:
 *            type: array
 *            description: The web pages list of the university
 *            items:
 *              type: string
 *       example:
 *         _id: 60c35422784dc0048cf5abce
 *         name: Universidade do Maranhão
 *         state_province: Maranhão
 *         domains: [uema.com, uema.net]
 *         web_pages: [wwww.uema.com, www.uema.net]
 */

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Returns the list of all the universities
 *     tags: [Universities]
 *     parameters:
 *      - in: query
 *        name: universityName
 *        description: The name of the university
 *        schema:
 *          type: string
 *      - in: query
 *        name: stateProvince
 *        description: The state of the university
 *        schema:
 *          type: string
 *      - in: query
 *        name: pageNumber
 *        description: The number of the page (for pagination)
 *        schema:
 *          type: string
 *      - in: query
 *        name: pagesLimit
 *        description: The rows per page limit (for pagination)
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: The list of the universities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/University'
 */

route.get('/search', UniversityController.index)

/**
 * @swagger
 * /details/{_id}:
 *   get:
 *     summary: Get the university by id
 *     tags: [University details]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The university id
 *     responses:
 *       200:
 *         description: The university object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/University'
 *       404:
 *         description: The university was not found
 *       500:
 *         description: The university id is invalid
 */
route.get('/details/:id', UniversityController.details)

/**
 * @swagger
 * /update/{_id}:
 *  put:
 *    summary: Update the university by the id
 *    tags: [Update University]
 *    parameters:
 *      - in: path
 *        name: _id
 *        schema:
 *          type: string
 *        required: true
 *        description: The university id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/University'
 *    responses:
 *      200:
 *        description: The university was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/University'
 *      404:
 *        description: The university was not found
 *      500:
 *        description: The university id is invalid
 */
route.put('/update/:id', UniversityController.update)

/**
 * @swagger
 * /new:
 *   post:
 *     summary: Create a new university
 *     tags: [Create University]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/University'
 *     responses:
 *       201:
 *         description: The university was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/University'
 *       500:
 *         description: University name not included
 */
route.post('/new', UniversityController.insert)

/**
 * @swagger
 * /remove/{_id}:
 *   delete:
 *     summary: Remove the university by id
 *     tags: [Remove University]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The university id
 *
 *     responses:
 *       200:
 *         description: The university was deleted
 *       404:
 *         description: The university was not found
 *       500:
 *         description: The university id is invalid
 */
route.delete('/remove/:id', UniversityController.delete)

route.get('*', (req, res) => {
  res.status(404).send(errors.error404)
})

module.exports = route
