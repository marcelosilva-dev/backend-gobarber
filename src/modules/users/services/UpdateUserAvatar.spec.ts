import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatar';

import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';

import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
  it('should be able to update your avatar', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);



    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    })

    expect(user.avatar).toBe('avatar.jpg');
  })

  it('should not be able to update your avatar without a user_id valid', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);

    expect(
      updateUserAvatar.execute({
      user_id: 'non-existing-avatar',
      avatarFileName: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to update your avatar without delete your existing avatar file', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg'
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  })
});
