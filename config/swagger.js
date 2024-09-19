/**
 * @swagger
 * /api/v1/user/:
 *   get:
 *     summary: Get all users
 *     tags: 
 *       - User
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the user
 *                     example: "60f6ad2d4f1a2b6c88fa54e5"
 *                   username:
 *                     type: string
 *                     description: The username of the user
 *                     example: "johndoe"
 *                   email:
 *                     type: string
 *                     description: The email of the user
 *                     example: "johndoe@example.com"
 *                   role:
 *                     type: string
 *                     description: The role of the user
 *                     example: "USER"
 */

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: 
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user
 *         schema:
 *           type: string
 *           example: "60f6ad2d4f1a2b6c88fa54e5"
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the user
 *                   example: "60f6ad2d4f1a2b6c88fa54e5"
 *                 username:
 *                   type: string
 *                   description: The username of the user
 *                   example: "johndoe"
 *                 email:
 *                   type: string
 *                   description: The email of the user
 *                   example: "johndoe@example.com"
 *                 role:
 *                   type: string
 *                   description: The role of the user
 *                   example: "USER"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "User not found"
 */


/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: 
 *       - User
 *     description: Registers a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: User X
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: user@gmail.com
 *               phone:
 *                 type: string
 *                 description: The user's phone number.
 *                 example: 0775214972
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: Password123!
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "User registration successful."
 *       409:
 *         description: Conflict - User already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "User already exists."
 */
/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: User login
 *     tags: 
 *       - User
 *     description: Authenticates a user and returns an access token and refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Login successful."
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     refreshToken:
 *                       type: string
 *                       example: "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4..."
 *       401:
 *         description: Unauthorized - Incorrect password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Incorrect password."
 *       404:
 *         description: Not Found - User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "User not found."
 */
/**
 * @swagger
 * /api/v1/user/generate-access-token:
 *   post:
 *     summary: Generate a new access token
 *     tags: 
 *       - User
 *     description: Generates a new access token using a refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token.
 *                 example: "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4..."
 *     responses:
 *       200:
 *         description: Access token generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Access token generated successfully."
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Unauthorized - Invalid refresh token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Invalid refresh token."
 */

/**
 * @swagger
 * /api/v1/user/change-password:
 *   post:
 *     summary: Change user password
 *     tags: 
 *       - User
 *     description: Changes the password for a user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user's ID.
 *                 example: "60f6ad2d4f1a2b6c88fa54e5"
 *               currentPassword:
 *                 type: string
 *                 description: The user's current password.
 *                 example: "CurrentPassword123!"
 *               newPassword:
 *                 type: string
 *                 description: The new password.
 *                 example: "NewPassword123!"
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Password updated successfully."
 *       401:
 *         description: Unauthorized - Incorrect current password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Incorrect password."
 *       404:
 *         description: Not Found - User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "User not found."
 */


/**
 * @swagger
 * /api/v1/user/forget-password:
 *   post:
 *     summary: Send password reset email
 *     tags: 
 *       - User
 *     description: Sends a password reset email to the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Password reset email sent."
 *       404:
 *         description: Not Found - User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "User not found."
 */

/**
 * @swagger
 * /api/v1/user/reset-password/{token}:
 *   post:
 *     summary: Reset password using token
 *     tags: 
 *       - User
 *     description: Resets the user's password using a valid reset token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The password reset token.
 *         schema:
 *           type: string
 *           example: "abcdef1234567890"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password.
 *                 example: "NewPassword123!"
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Password reset successful."
 *       400:
 *         description: Bad Request - Invalid or expired token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Invalid or expired token."
 */

/**
 * @swagger
 * /api/v1/user/{id}:
 *   delete:
 *     summary: Soft delete a user
 *     tags: 
 *       - User
 *     description: Soft deletes a user by marking the user as inactive.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user's ID.
 *         schema:
 *           type: string
 *           example: "60f6ad2d4f1a2b6c88fa54e5"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User soft deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "User soft deleted successfully."
 *       404:
 *         description: Not Found - User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "User not found."
 */



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
 *         username:
 *           type: string
 *           description: The username of the user
 *           example: "johndoe"
 *         email:
 *           type: string
 *           description: The email of the user
 *           example: "johndoe@example.com"
 *         role:
 *           type: string
 *           description: The role of the user
 *           example: "USER"
 */


/**
 * @swagger
 * /api/v1/article:
 *   get:
 *     summary: Get all articles
 *     tags: 
 *       - Articles
 *     description: Retrieve a list of all articles, with optional filters for category and keywords.
 *     parameters:
 *       - in: query
 *         name: category
 *         required: false
 *         description: Filter articles by category
 *         schema:
 *           type: string
 *           example: "technology"
 *       - in: query
 *         name: keywords
 *         required: false
 *         description: Filter articles by title or content keywords
 *         schema:
 *           type: string
 *           example: "AI"
 *       - in: query
 *         name: size
 *         required: false
 *         description: Number of articles to return per page
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A list of articles
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
 *                   example: 100
 */

/**
 * @swagger
 * /api/v1/article:
 *   post:
 *     summary: Create a new article
 *     tags: 
 *       - Articles
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
 */

/**
 * @swagger
 * /api/v1/ads/{id}:
 *   get:
 *     summary: Get an ad by ID
 *     tags: 
 *       - Ads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ad ID
 *         schema:
 *           type: string
 *           example: "64f5a5b4f6d9c06b4e0a1e2a"
 *       - in: query
 *         name: view
 *         required: false
 *         description: Set to true to increment the ad view count and log the view details
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: The requested ad
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ad'
 *       404:
 *         description: Ad not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Ad not found."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */

/**
 * @swagger
 * /api/v1/article/{id}:
 *   put:
 *     summary: Update an article by ID
 *     tags: 
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The article ID
 *         schema:
 *           type: string
 *           example: "60f6ad2d4f1a2b6c88fa54e5"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Article not found."
 */

/**
 * @swagger
 * /api/v1/article/{id}:
 *   delete:
 *     summary: Delete an article by ID
 *     tags: 
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The article ID
 *         schema:
 *           type: string
 *           example: "60f6ad2d4f1a2b6c88fa54e5"
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Article not found."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the article
 *           example: "Understanding AI"
 *         content:
 *           type: string
 *           description: The content of the article
 *           example: "This article explains the basics of AI..."
 *         category:
 *           type: string
 *           description: The category of the article
 *           example: "technology"
 *         previewImg:
 *           type: string
 *           description: The previewImg of the article
 *           example: "https://media.gqmagazine.fr/photos/606c19c3a813725515a80944/16:9/w_3360,h_1890,c_limit/mclarenarturaflux-11.jpeg"
 */


/**
 * @swagger
 * /api/v1/comment/article/{articleId}:
 *   get:
 *     summary: Get comments by article ID
 *     tags: 
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         description: The article ID
 *         schema:
 *           type: string
 *           example: "60f6ad2d4f1a2b6c88fa54e5"
 *     responses:
 *       200:
 *         description: A list of comments for the specified article
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the comment
 *                     example: "60f6ad2d4f1a2b6c88fa54e5"
 *                   uid:
 *                     type: string
 *                     description: The ID of the user who created the comment
 *                     example: "5f6ad2d4f1a2b6c88fa54e5"
 *                   articleId:
 *                     type: string
 *                     description: The ID of the article the comment belongs to
 *                     example: "5f6ad2d4f1a2b6c88fa54e5"
 *                   content:
 *                     type: string
 *                     description: The content of the comment
 *                     example: "This is a comment."
 *                   answerTo:
 *                     type: string
 *                     description: The ID of the comment this comment is replying to (if any)
 *                     example: "60f6ad2d4f1a2b6c88fa54e5"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the comment was created
 *                     example: "2023-08-22T14:48:00.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the comment was last updated
 *                     example: "2023-08-22T15:48:00.000Z"
 */

/**
 * @swagger
 * /api/v1/comment:
 *   post:
 *     summary: Create a new comment
 *     tags: 
 *       - Comments
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
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - USER
 */

/**
 * @swagger
 * /api/v1/comment/{id}:
 *   put:
 *     summary: Update a comment by comment ID
 *     tags: 
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The comment ID
 *         schema:
 *           type: string
 *           example: "60f6ad2d4f1a2b6c88fa54e5"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated comment content"
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - USER
 */

/**
 * @swagger
 * /api/v1/comment/{id}:
 *   delete:
 *     summary: Delete a comment by comment ID
 *     tags: 
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The comment ID
 *         schema:
 *           type: string
 *           example: "60f6ad2d4f1a2b6c88fa54e5"
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - ADMIN
 *       - USER
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: The ID of the user who created the comment
 *           example: "5f6ad2d4f1a2b6c88fa54e5"
 *         articleId:
 *           type: string
 *           description: The ID of the article the comment belongs to
 *           example: "5f6ad2d4f1a2b6c88fa54e5"
 *         content:
 *           type: string
 *           description: The content of the comment
 *           example: "This is a comment."
 *         answerTo:
 *           type: string
 *           description: The ID of the comment this comment is replying to (if any)
 *           example: "60f6ad2d4f1a2b6c88fa54e5"
 */
/**
 * @swagger
 * /api/v1/ads:
 *   get:
 *     summary: Retrieve a list of ads with pagination and sorting
 *     tags:
 *       - Ads
 *     parameters:
 *       - in: query
 *         name: size
 *         required: false
 *         description: Number of ads to return per page
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 10
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number to retrieve
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 1
 *       - in: query
 *         name: sort
 *         required: false
 *         description: Sort order of the ads based on creation date (ascending or descending)
 *         schema:
 *           type: string
 *           default: 'desc'
 *           enum:
 *             - asc
 *             - desc
 *           example: 'desc'
 *       - in: query
 *         name: includeViews
 *         required: false
 *         description: include views count 
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: Successfully retrieved list of ads
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ads:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ad'
 *                   example: [
 *                     {
 *                       "title": "2024 Tesla Model S",
 *                       "description": "A premium electric sedan with exceptional performance.",
 *                       "price": 79900,
 *                       "type": "new",
 *                       "brand": "Tesla",
 *                       "model": "Model S",
 *                       "version": "Plaid",
 *                       "category": "Electric Sedan",
 *                       "mileage": 0,
 *                       "first_registration": {
 *                         "month": 8,
 *                         "year": 2024
 *                       },
 *                       "fuel_type": "electric",
 *                       "seats": 5,
 *                       "color": "Red",
 *                       "crit_air": "Euro 6",
 *                       "horsepower": 1020,
 *                       "power_kw": 750,
 *                       "autonomy_wltp_km": 396,
 *                       "options_vehicule": {
 *                         "gps": true,
 *                         "heated_seats": true,
 *                         "sunroof": true
 *                       },
 *                       "courant": {
 *                         "AC": "11kW",
 *                         "DC": "250kW"
 *                       },
 *                       "photos": ["tesla_model_s_exterior.jpg"],
 *                       "interior_video": "tesla_model_s_interior.mp4",
 *                       "exterior_video": "tesla_model_s_exterior.mp4",
 *                       "address": "123 Electric Avenue, San Francisco, CA",
 *                       "phone_number": "+1234567890",
 *                       "mask_phone": false
 *                     }
 *                   ]
 *                 count:
 *                   type: integer
 *                   example: 50
 *       500:
 *         description: Server error
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - USER
 */

/**
 * @swagger
 * /api/v1/ads/{id}:
 *   get:
 *     summary: Get an ad by its ID
 *     tags:
 *       - Ads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the ad to retrieve
 *         schema:
 *           type: string
 *           example: "64f9ad3b4f1b2d3c99ae3fe7"
 *       - in: query
 *         name: includeViews
 *         required: false
 *         description: include views count 
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: Ad retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ad'
 *       404:
 *         description: Ad not found
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - USER
 */
/**
 * @swagger
 * /api/v1/ads/by-user/{uid}:
 *   get:
 *     summary: Get all ads by a specific user ID
 *     tags:
 *       - Ads
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: The ID of the user whose ads are to be retrieved
 *         schema:
 *           type: string
 *           example: "64f9ad3b4f1b2d3c99ae3fe7"
 *       - in: query
 *         name: includeViews
 *         required: false
 *         description: include views count 
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: Ads retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ad'
 *       404:
 *         description: No ads found for the given user ID
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - USER
 */
/**
 * @swagger
 * /api/v1/ads/today:
 *   get:
 *     summary: Get all ads created today
 *     tags:
 *       - Ads
 *     responses:
 *       200:
 *         description: Ads created today retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ad'
 *       500:
 *         description: Server error
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - USER
 */
/**
 * @swagger
 * /api/v1/ads:
 *   post:
 *     summary: Create a new ad
 *     tags:
 *       - Ads
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
 *       400:
 *         description: Bad request if the ad data is invalid
 *       500:
 *         description: Server error
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - USER
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Ad:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           example: "66cd26f4920b0cf9c203b0d5"
 *         title:
 *           type: string
 *           example: "2024 Audi Q4 e-tron"
 *         description:
 *           type: string
 *           example: "A versatile electric SUV with a spacious interior and cutting-edge technology."
 *         price:
 *           type: number
 *           example: 45900
 *         type:
 *           type: string
 *           example: "new"
 *         brand:
 *           type: string
 *           example: "Audi"
 *         model:
 *           type: string
 *           example: "Q4 e-tron"
 *         version:
 *           type: string
 *           example: "50 quattro"
 *         category:
 *           type: string
 *           example: "Electric SUV"
 *         mileage:
 *           type: number
 *           example: 0
 *         first_registration:
 *           type: object
 *           properties:
 *             month:
 *               type: number
 *               example: 6
 *             year:
 *               type: number
 *               example: 2024
 *         fuel_type:
 *           type: string
 *           example: "electric"
 *         seats:
 *           type: number
 *           example: 5
 *         color:
 *           type: string
 *           example: "District Green"
 *         crit_air:
 *           type: string
 *           example: "Euro 6"
 *         horsepower:
 *           type: number
 *           example: 295
 *         power_kw:
 *           type: number
 *           example: 220
 *         autonomy_wltp_km:
 *           type: number
 *           example: 300
 *         options_vehicule:
 *           type: object
 *           properties:
 *             gps:
 *               type: boolean
 *               example: true
 *             heated_seats:
 *               type: boolean
 *               example: true
 *             sunroof:
 *               type: boolean
 *               example: true
 *             panoramic_roof:
 *               type: boolean
 *               example: false
 *             bluetooth:
 *               type: boolean
 *               example: true
 *             rear_camera:
 *               type: boolean
 *               example: true
 *             automatic_climate_control:
 *               type: boolean
 *               example: true
 *             leather_seats:
 *               type: boolean
 *               example: true
 *             non_smoker:
 *               type: boolean
 *               example: true
 *         courant:
 *           type: object
 *           properties:
 *             AC:
 *               type: string
 *               example: "11kW"
 *             DC:
 *               type: string
 *               example: "150kW"
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           example: ["audi_q4_exterior1.jpg", "audi_q4_interior1.jpg"]
 *         interior_video:
 *           type: string
 *           example: "audi_q4_interior.mp4"
 *         exterior_video:
 *           type: string
 *           example: "audi_q4_exterior.mp4"
 *         address:
 *           type: string
 *           example: "789 Green Drive, Los Angeles, CA"
 *         phone_number:
 *           type: string
 *           example: "+1987654321"
 *         mask_phone:
 *           type: boolean
 *           example: false
 *       required:
 *         - title
 *         - price
 *         - type
 *         - brand
 *         - model
 *         - category
 */
/**
 * @swagger
 * /api/v1/ads/{id}:
 *   put:
 *     summary: Update an ad by ad ID
 *     tags:
 *       - Ads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the ad to be updated
 *         schema:
 *           type: string
 *           example: "64f5a5b4f6d9c06b4e0a1e2a"
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
 *       400:
 *         description: Bad request if the update data is invalid
 *       500:
 *         description: Server error
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - USER
 */
/**
 * @swagger
 * /api/v1/ads/{id}:
 *   delete:
 *     summary: Delete an ad by ad ID
 *     tags:
 *       - Ads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the ad to be deleted
 *         schema:
 *           type: string
 *           example: "64f5a5b4f6d9c06b4e0a1e2a"
 *     responses:
 *       200:
 *         description: Ad deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ad'
 *       404:
 *         description: Ad not found
 *       500:
 *         description: Server error
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - ADMIN
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AdView:
 *       type: object
 *       properties:
 *         adId:
 *           type: string
 *           description: The ID of the ad being viewed
 *           example: "64f5a5b4f6d9c06b4e0a1e2a"
 *         userId:
 *           type: string
 *           description: The ID of the user viewing the ad (optional if anonymous)
 *           example: "64f5a5b4f6d9c06b4e0a1e2b"
 *         viewedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the ad was viewed
 *           example: "2024-09-10T12:00:00Z"
 *         viewerAgent:
 *           type: string
 *           description: User agent of the viewer (e.g., browser or device)
 *           example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
 *         location:
 *           type: object
 *           properties:
 *             country:
 *               type: string
 *               description: Country of the viewer
 *               example: "USA"
 *             city:
 *               type: string
 *               description: City of the viewer
 *               example: "Los Angeles"
 *       required:
 *         - adId
 *       example:
 *         adId: "64f5a5b4f6d9c06b4e0a1e2a"
 *         userId: "64f5a5b4f6d9c06b4e0a1e2b"
 *         viewedAt: "2024-09-10T12:00:00Z"
 *         viewerAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124"
 *         location: 
 *           country: "USA"
 *           city: "Los Angeles"
 */
/**
 * @swagger
 * /api/v1/ad-views:
 *   get:
 *     summary: Get all ad views with optional filters (time range, viewer agent, location)
 *     tags:
 *       - AdViews
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           description: Filter views starting from this date (inclusive)
 *           example: "2024-09-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           description: Filter views until this date (inclusive)
 *           example: "2024-09-20"
 *       - in: query
 *         name: viewerAgent
 *         schema:
 *           type: string
 *           description: Filter views by viewer's user agent (e.g., browser, device)
 *           example: ""
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *           description: Filter views by viewer's country
 *           example: ""
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *           description: Filter views by viewer's city
 *           example: ""
 *     responses:
 *       200:
 *         description: Successfully retrieved ad views
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdView'
 *       400:
 *         description: Invalid filters provided
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/ad-views/{id}:
 *   get:
 *     summary: Get ad view by ID
 *     tags:
 *       - AdViews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the ad view to retrieve
 *         schema:
 *           type: string
 *           example: "64f5a5b4f6d9c06b4e0a1e2c"
 *     responses:
 *       200:
 *         description: Ad view found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdView'
 *       404:
 *         description: Ad view not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/ad-views:
 *   post:
 *     summary: Create a new ad view
 *     tags:
 *       - AdViews
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
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/ad-views/{id}:
 *   delete:
 *     summary: Delete an ad view by ID
 *     tags:
 *       - AdViews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the ad view to delete
 *         schema:
 *           type: string
 *           example: "64f5a5b4f6d9c06b4e0a1e2c"
 *     responses:
 *       200:
 *         description: Ad view deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdView'
 *       404:
 *         description: Ad view not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/ad-views/ad/{adId}:
 *   get:
 *     summary: Get all views for a specific ad by its ID
 *     tags:
 *       - AdViews
 *     parameters:
 *       - in: path
 *         name: adId
 *         required: true
 *         description: The ID of the ad to get views for
 *         schema:
 *           type: string
 *           example: "64f5a5b4f6d9c06b4e0a1e2a"
 *     responses:
 *       200:
 *         description: Successfully retrieved ad views
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdView'
 *       404:
 *         description: Ad not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/ad-views/user/{userId}:
 *   get:
 *     summary: Get all views made by a specific user by their user ID
 *     tags:
 *       - AdViews
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to get views for
 *         schema:
 *           type: string
 *           example: "64f5a5b4f6d9c06b4e0a1e2b"
 *     responses:
 *       200:
 *         description: Successfully retrieved user views
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdView'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
