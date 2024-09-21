/**
 * @swagger
 * components:
 *   schemas:
 *     AdView:
 *       type: object
 *       required:
 *         - adId
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the ad view
 *         adId:
 *           type: string
 *           description: The ID of the ad
 *         userId:
 *           type: string
 *           description: The ID of the user who viewed the ad (if available)
 *         viewedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the ad was viewed
 *         viewerAgent:
 *           type: string
 *           description: The user agent of the viewer (e.g., browser, device)
 *         location:
 *           type: object
 *           properties:
 *             country:
 *               type: string
 *             city:
 *               type: string
 */
/**
 * @swagger
 * /api/v1/ad-views:
 *   get:
 *     summary: Get all ad views with optional filters
 *     tags: [AdViews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date
 *       - in: query
 *         name: viewerAgent
 *         schema:
 *           type: string
 *         description: Filter by viewer agent (browser, device, etc.)
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter by country
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *     responses:
 *       200:
 *         description: A list of ad views
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdView'
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/ad-views/ad/{adId}:
 *   get:
 *     summary: Get views for a specific ad by ad ID
 *     tags: [AdViews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ad
 *     responses:
 *       200:
 *         description: A list of views for the specified ad
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdView'
 *       404:
 *         description: Ad views not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/ad-views/user/{userId}:
 *   get:
 *     summary: Get views by a specific user ID
 *     tags: [AdViews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of views by the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdView'
 *       404:
 *         description: Ad views not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/ad-views:
 *   post:
 *     summary: Create a new ad view
 *     tags: [AdViews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdView'
 *     responses:
 *       201:
 *         description: Ad view created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdView'
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/ad-views/{id}:
 *   delete:
 *     summary: Delete an ad view by ID
 *     tags: [AdViews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ad view ID
 *     responses:
 *       200:
 *         description: Ad view deleted successfully
 *       404:
 *         description: Ad view not found
 *       500:
 *         description: Internal server error
 */
