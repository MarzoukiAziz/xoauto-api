

/**
 * @swagger
 * /api/v1/settings/article-categories:
 *   get:
 *     summary: Retrieve all article categories
 *     tags: [Article Categories]
 *     responses:
 *       200:
 *         description: A list of article categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the category
 *                   name:
 *                     type: string
 *                     description: The name of the category
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/settings/article-categories:
 *   post:
 *     summary: Create a new article category
 *     tags: [Article Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the created category
 *                 name:
 *                   type: string
 *                   description: The name of the created category
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/settings/article-categories/{id}:
 *   delete:
 *     summary: Delete an article category by ID
 *     tags: [Article Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
