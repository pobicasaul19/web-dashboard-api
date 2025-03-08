import express from 'express';
import { editArticle } from '../../../controller/articleController.js';
import { upload } from '../../../middleware/multerMiddleware.js';
/**
 * @swagger
 * /api/articles/{uuid}:
 *   put:
 *     summary: Edit article
 *     tags:
 *       - Articles
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: Article UUID
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: company
 *         description: Company name related to the article
 *         required: true
 *         schema:
 *           type: string
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
 *       - in: query
 *         name: file
 *         description: Upload Article Image
 *         required: true
 *         schema:
 *           type: file
 *     responses:
 *       201:
 *         description: Successfully updated
 *       400:
 *         description: Bad request
 */
const router = express.Router()
  .put('/:uuid', upload.single('file'), editArticle);
export default router;
