import { Router } from 'express';
import multer from 'multer';
import UploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import { container } from 'tsyringe';

const UsersRouter = Router();
const upload = multer(UploadConfig);

UsersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

UsersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default UsersRouter;
