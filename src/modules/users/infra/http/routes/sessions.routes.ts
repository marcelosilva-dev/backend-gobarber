import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const SessionsRouter = Router();
const sessionController = new SessionsController();

SessionsRouter.post('/', sessionController.create);

export default SessionsRouter;
