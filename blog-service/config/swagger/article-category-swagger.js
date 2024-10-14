/**
 * @swagger
 * tags:
 *   name: ArticleCategory
 *   description: API to manage article categories
 */

/**
 * @swagger
 * /api/v1/settings/article-categories:
 *   get:
 *     summary: Get all categories
 *     tags: [ArticleCategory]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArticleCategory'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/settings/article-categories/names:
 *   get:
 *     summary: Get all category names
 *     tags: [ArticleCategory]
 *     responses:
 *       200:
 *         description: List of category names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/settings/article-categories:
 *   post:
 *     summary: Create a new category
 *     tags: [ArticleCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleCategory'
 *     responses:
 *       201:
 *         description: Created category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleCategory'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/settings/article-categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [ArticleCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleCategory'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ArticleCategory:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the category
 *         name:
 *           type: string
 *           description: The name of the category
 *       required:
 *         - name
 */
