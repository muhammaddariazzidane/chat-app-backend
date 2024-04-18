import { Router } from 'express';
import {
  getUser,
  getUsers,
  updateProfile,
} from '../controllers/user.controller.js';

const router = Router();

router.get('/me', getUser);
router.get('/lists', getUsers);
router.put('/update', updateProfile);

export default router;
