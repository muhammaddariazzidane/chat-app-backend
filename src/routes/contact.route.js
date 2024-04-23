import { Router } from 'express';
import {
  addContact,
  deleteContact,
  getContacts,
} from '../controllers/contact.controller.js';

const router = Router();

router.get('/lists', getContacts);
router.post('/add', addContact);

router.delete('/delete', deleteContact);

export default router;
