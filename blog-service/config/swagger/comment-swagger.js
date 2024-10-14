/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: API to manage comments
 */

/**
 * @swagger
 * /api/v1/comment:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Created comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/comment/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Updated comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/comment/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/comment/article/{articleId}:
 *   get:
 *     summary: Get comments by article ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         description: ID of the article to fetch comments for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments for the article
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the comment
 *         uid:
 *           type: string
 *           description: The ID of the user who made the comment
 *         articleId:
 *           type: string
 *           description: The ID of the article the comment is associated with
 *         content:
 *           type: string
 *           description: The content of the comment
 *         answerTo:
 *           type: string
 *           description: The ID of the comment this comment is answering to (if any)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the comment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the comment was last updated
 *       required:
 *         - uid
 *         - articleId
 *         - content
 */
