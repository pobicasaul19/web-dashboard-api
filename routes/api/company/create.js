import express from 'express';
import { upload } from '../../../middleware/multerMiddleware.js';
import { createCompany } from '../../../controller/companyController.js';
/**
 * @swagger
 * /api/companies/create:
 *   post:
 *     summary: Create Company
 *     description: Create a new company with the provided details.
 *     tags:
 *       - Companies
 *     consumes:
 *       - multipart/form-data
 *     parameters:
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
  .post('/create', upload.single('file'), createCompany);
export default router;