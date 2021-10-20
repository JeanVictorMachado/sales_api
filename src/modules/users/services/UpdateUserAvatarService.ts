import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';

interface IRequest {
  avatarFilename?: string;
  user_id: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExistes = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExistes) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = String(avatarFilename);

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
