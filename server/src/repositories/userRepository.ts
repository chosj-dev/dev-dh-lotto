import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const userRepository = AppDataSource.getRepository(User);

export const findUserByEmail = async (userId: string) => {
  return await userRepository.findOneBy({ userId });
};

export const updateRefreshToken = async (
  userId: number,
  refreshToken: string | null
) => {
  await userRepository.update(userId, { refreshToken });
};
