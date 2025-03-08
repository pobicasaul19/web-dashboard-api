import express from 'express';
import { updateUser } from '../../../controller/userController.js';

/**
 * @swagger
 * /api/users/{uuid}:
 *   put:
 *     summary: Update User
 *     description: Update user info with the provided details.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: User UUID
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: firstName
 *         description: User Firstname
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: lastName
 *         description: User Lastname
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         description: User Type
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         description: User Status
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
  .put('/:uuid', updateUser);
export default router