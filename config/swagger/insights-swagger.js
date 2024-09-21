/**
 * @swagger
 * /api/v1/insights/dashboard-highlights:
 *   get:
 *     summary: Retrieve dashboard highlights for the last 30 days
 *     tags: [Insights]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard highlights data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newUsers:
 *                   type: integer
 *                   description: Number of new users in the last 30 days
 *                 activeUsersLast30Days:
 *                   type: integer
 *                   description: Number of active users in the last 30 days
 *                 newArticlesLast30Days:
 *                   type: integer
 *                   description: Number of new articles in the last 30 days
 *                 articleViewsLast30Days:
 *                   type: integer
 *                   description: Total views on articles in the last 30 days
 *                 newAdsLast30Days:
 *                   type: integer
 *                   description: Number of new ads in the last 30 days
 *                 adViewsLast30Days:
 *                   type: integer
 *                   description: Total views on ads in the last 30 days
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
