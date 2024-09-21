/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - title
 *         - previewImg
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the article
 *           example: "60f6ad2d4f1a2b6c88fa54e5"
 *         title:
 *           type: string
 *           description: The title of the article
 *           example: "Understanding JavaScript Closures"
 *         subtitle:
 *           type: string
 *           description: The subtitle or brief description of the article
 *           example: "A deep dive into JavaScript's most powerful feature"
 *         content:
 *           type: string
 *           description: The content or body of the article
 *           example: "JavaScript closures are one of the most important concepts..."
 *         previewImg:
 *           type: string
 *           description: URL to the preview image of the article
 *           example: "https://example.com/images/article-preview.png"
 *         category:
 *           type: string
 *           description: The category under which the article falls
 *           example: "JavaScript"
 *         readTime:
 *           type: integer
 *           description: The estimated read time for the article in minutes
 *           example: 5
 *         tags:
 *           type: string
 *           description: Tags associated with the article, comma-separated
 *           example: "JavaScript,Programming,Web Development"
 *         views:
 *           type: integer
 *           description: The number of times the article has been viewed
 *           example: 120
 *         commentCount:
 *           type: integer
 *           description: The number of comments associated with the article
 *           example: 10
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the article was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the article was last updated
 */
/**
 * @swagger
 * /api/v1/article:
 *   get:
 *     summary: Get all articles with optional filtering, pagination, and sorting
 *     tags: [Article]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category to filter articles by
 *       - in: query
 *         name: keywords
 *         schema:
 *           type: string
 *         description: Keywords to search within the title or content
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of articles to return per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order based on creation date
 *     responses:
 *       200:
 *         description: A list of articles with pagination
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
 *                   description: The total number of articles
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/article/{id}:
 *   get:
 *     summary: Get article by ID
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The article ID
 *       - in: query
 *         name: view
 *         schema:
 *           type: boolean
 *         description: Increment article views if set to true
 *     responses:
 *       200:
 *         description: The article details
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
 *     tags: [Article]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/article/{id}:
 *   put:
 *     summary: Update an article by ID
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The article ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article updated successfully
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
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The article ID
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */
