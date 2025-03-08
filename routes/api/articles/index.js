import express from 'express';
import { getArticles } from '../../../controller/articleController.js';
/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get articles list
 *     tags:
 *       - Articles
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 */
const router = express.Router()
  .get('/', getArticles);
export default router;
