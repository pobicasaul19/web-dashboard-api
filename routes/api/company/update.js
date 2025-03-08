import { editCompany } from '../../../controller/companyController.js';
import { upload } from '../../../middleware/multerMiddleware.js';
import express from 'express';
/**
 * @swagger
 * /api/companies/{uuid}:
 *   put:
 *     summary: Edit company
 *     tags:
 *       - Companies
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: Company UUID
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: name
 *         description: Company Name
 *         required: true
 *         schema:
 *           type: string
 *       - in: file
 *         name: file
 *         description: Company Logo
 *         required: true
 *         schema:
 *           type: file
 *       - in: query
 *         name: status
 *         description: Company Status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 */
const router = express.Router()
  .put('/:uuid', upload.single('file'), editCompany);
export default router

