/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the user
 *           example: "60f6ad2d4f1a2b6c88fa54e5"
 *          id:
 *           type: string
 *           description: The cognito identifier for the user
 *           example: "60f6ad2d4f1a2b6c88fa54e5"
 *         name:
 *           type: string
 *           description: The name of the user
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: The email of the user
 *           example: "johndoe@example.com"
 *         phone:
 *           type: string
 *           description: The phone number of the user
 *           example: "+1234567890"
 *         avatar:
 *           type: string
 *           description: The URL to the user's avatar image
 *           example: "https://example.com/avatar.jpg"
 *         pro:
 *           type: boolean
 *           description: Whether the user has a professional account
 *           example: true
 *         favoris:
 *           type: array
 *           description: A list of favorite item IDs
 *           items:
 *             type: string
 *           example: ["60f6ad2d4f1a2b6c88fa54e5", "60f6ad2d4f1a2b6c88fa54e6"]
 *         lastLogin:
 *           type: string
 *           format: date-time
 *           description: The last login date of the user
 *           example: "2024-09-21T15:00:00.000Z"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the user was created
 *           example: "2024-09-21T15:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the user was last updated
 *           example: "2024-09-21T15:30:00.000Z"
 */

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get all users with optional filtering
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           description: Filter users by role
 *           example: "USER"
 *       - in: query
 *         name: keywords
 *         schema:
 *           type: string
 *           description: Filter users by name or email
 *           example: "John"
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           description: Number of users per page
 *           example: 10
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: Page number
 *           example: 1
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           description: Sort order, either "asc" or "desc"
 *           example: "asc"
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 count:
 *                   type: integer
 *                   example: 100
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's unique ID
 *     responses:
 *       200:
 *         description: The user's details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
