import { Router } from 'express';
import {
  getMessage,
  sendMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/chat.controller.js';

const router = Router();

router.get('/:id/message', getMessage);
router.post('/:id/send', sendMessage);
router.put('/:id/update', updateMessage);
router.delete('/:id/delete', deleteMessage);

export default router;
