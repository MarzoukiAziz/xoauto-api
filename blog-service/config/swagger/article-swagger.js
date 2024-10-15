/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API to manage articles
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the article
 *         title:
 *           type: string
 *           description: Title of the article
 *           example: "Breaking News"
 *         subtitle:
 *           type: string
 *           description: Subtitle of the article
 *         content:
 *           type: string
 *           description: Full content of the article
 *         previewImg:
 *           type: string
 *           description: URL of the preview image
 *           example: "https://example.com/image.jpg"
 *         category:
 *           type: string
 *           description: Category of the article
 *         readTime:
 *           type: integer
 *           description: Estimated read time in minutes
 *         tags:
 *           type: string
 *           description: Tags associated with the article
 *         views:
 *           type: integer
 *           description: Number of views for the article
 *           example: 100
 *       required:
 *         - title
 *         - previewImg
 */

/**
 * @swagger
 * /api/v1/article:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: keywords
 *         schema:
 *           type: string
 *         description: Filter by keywords
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Number of articles per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sorting criteria
 *     responses:
 *       200:
 *         description: List of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *                 count:
 *                   type: integer
 *                   description: Total number of articles
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/article/stats:
 *   get:
 *     summary: Get article statistics
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Article statistics
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/article/{id}:
 *   get:
 *     summary: Get article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *       - in: query
 *         name: view
 *         schema:
 *           type: boolean
 *         description: Increase view count if true
 *     responses:
 *       200:
 *         description: Article details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/article:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Created article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/article/{id}:
 *   put:
 *     summary: Update an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Updated article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/article/{id}:
 *   delete:
 *     summary: Delete an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     responses:
 *       200:
 *         description: Deleted article
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */
