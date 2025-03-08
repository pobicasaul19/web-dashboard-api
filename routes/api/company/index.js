import express from 'express';
import { getCompany } from '../../../controller/companyController.js';

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Get company list
 *     tags:
 *       - Companies
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 */
const router = express.Router()
  .get('/', getCompany);
export default router;