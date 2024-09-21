/**
 * @swagger
 * components:
 *   schemas:
 *     Ad:
 *       type: object
 *       required:
 *         - uid
 *         - title
 *         - price
 *         - type
 *         - brand
 *         - model
 *         - category
 *         - mileage
 *         - first_registration
 *         - fuel_type
 *         - photos
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the ad
 *         uid:
 *           type: string
 *           description: The user ID of the ad owner
 *         title:
 *           type: string
 *           description: The title of the ad
 *         description:
 *           type: string
 *           description: The ad's description
 *         price:
 *           type: number
 *           description: The price of the item
 *         type:
 *           type: string
 *           enum: [new, used]
 *           description: Whether the item is new or used
 *         brand:
 *           type: string
 *           description: The brand of the item
 *         model:
 *           type: string
 *           description: The model of the item
 *         category:
 *           type: string
 *           description: The category of the item
 *         mileage:
 *           type: number
 *           description: The mileage of the vehicle
 *         first_registration:
 *           type: object
 *           properties:
 *             month:
 *               type: number
 *             year:
 *               type: number
 *         fuel_type:
 *           type: string
 *           description: The type of fuel used
 *         views:
 *           type: number
 *           description: The number of views the ad has received
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * /api/v1/ads:
 *   get:
 *     summary: Get a list of ads with optional filters
 *     tags: [Ads]
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of ads per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: desc
 *         description: Sort order, can be 'asc' or 'desc'
 *       - in: query
 *         name: includeViews
 *         schema:
 *           type: string
 *           enum: [true, false]
 *           default: false
 *         description: Whether to include view counts in the response
 *       - in: query
 *         name: uid
 *         schema:
 *           type: string
 *         description: Filter ads by user ID
 *     responses:
 *       200:
 *         description: A list of ads
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ads:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ad'
 *                 count:
 *                   type: integer
 *                   description: Total number of ads
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/ads/{id}:
 *   get:
 *     summary: Get a single ad by its ID
 *     tags: [Ads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ad ID
 *       - in: query
 *         name: view
 *         schema:
 *           type: string
 *           enum: [true, false]
 *           description: Whether to count this as a view
 *       - in: query
 *         name: includeViews
 *         schema:
 *           type: string
 *           enum: [true, false]
 *           description: Whether to include the view count
 *     responses:
 *       200:
 *         description: The requested ad
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ad'
 *       404:
 *         description: Ad not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/ads/today:
 *   get:
 *     summary: Get ads created today
 *     tags: [Ads]
 *     responses:
 *       200:
 *         description: A list of today's ads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ad'
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/ads:
 *   post:
 *     summary: Create a new ad
 *     tags: [Ads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ad'
 *     responses:
 *       201:
 *         description: Ad created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ad'
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/ads/{id}:
 *   put:
 *     summary: Update an ad by ID
 *     tags: [Ads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ad ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ad'
 *     responses:
 *       200:
 *         description: Ad updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ad'
 *       404:
 *         description: Ad not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/ads/{id}:
 *   delete:
 *     summary: Delete an ad by ID
 *     tags: [Ads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ad ID
 *     responses:
 *       200:
 *         description: Ad deleted successfully
 *       404:
 *         description: Ad not found
 *       500:
 *         description: Internal server error
 */
