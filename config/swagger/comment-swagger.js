/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - uid
 *         - articleId
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the comment
 *         uid:
 *           type: string
 *           description: The user ID of the comment's author
 *         articleId:
 *           type: string
 *           description: The article ID to which the comment belongs
 *         content:
 *           type: string
 *           description: The content of the comment
 *         answerTo:
 *           type: string
 *           description: The ID of the comment this comment is replying to (if applicable)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CommentWithUser:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         uid:
 *           type: string
 *         articleId:
 *           type: string
 *         content:
 *           type: string
 *         answerTo:
 *           type: string
 *         user:
 *           type: object
 *           description: The user information associated with the comment
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * /api/v1/comment/article/{articleId}:
 *   get:
 *     summary: Get comments for an article by article ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The article ID
 *     responses:
 *       200:
 *         description: List of comments for the article
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommentWithUser'
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/comment:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/comment/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The updated content of the comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
