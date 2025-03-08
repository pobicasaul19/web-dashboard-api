import express from 'express';
import { createArticle } from '../../../controller/articleController.js';
import { upload } from '../../../middleware/multerMiddleware.js';
/**
 * @swagger
 * /api/articles/create:
 *   post:
 *     summary: Create article
 *     description: Create a article with the provided details.
 *     tags:
 *       - Articles
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: query
 *         name: company
 *         description: Company name related to the article
 *         required: true
 *         schema:
 *           type: string
 *       - in: file
 *         name: file
 *         description: Upload Article Image
 *         required: true
 *         schema:
 *           type: file
 *       - in: query
 *         name: title
 *         description: Article title
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: link
 *         description: Article link
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         description: Article publication date
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: content
 *         description: Article content
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successfully updated
 *       400:
 *         description: Bad request
 */
const router = express.Router()
  .post('/create', upload.single('file'), createArticle);
export default router;
