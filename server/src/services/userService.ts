import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

/**
 * 회원가입 서비스
 * @param userId 회원 아이디
 * @param password 비밀번호
 * @param lotteryUserId 동행복권 아이디
 * @param lotteryPassword 동행복권 비밀번호
 */
export const registerUser = async (
  userId: string,
  password: string,
  lotteryUserId: string,
  lotteryPassword: string
): Promise<{ success: boolean; message: string }> => {
  const userRepository = AppDataSource.getRepository(User);

  try {
    // 1️⃣ 중복된 userId 또는 lotteryUserId 체크
    const existingUser = await userRepository.findOne({
      where: [{ userId }, { lotteryUserId }],
    });

    if (existingUser) {
      return { success: false, message: "이미 존재하는 사용자 ID입니다." };
    }

    // 2️⃣ 비밀번호 해싱 (암호화)
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedLotteryPassword = await bcrypt.hash(lotteryPassword, 10);

    // 3️⃣ 사용자 생성
    const newUser = userRepository.create({
      userId,
      password: hashedPassword,
      lotteryUserId,
      lotteryPassword: hashedLotteryPassword,
    });

    // 4️⃣ 데이터 저장
    await userRepository.save(newUser);

    return { success: true, message: "회원가입 성공" };
  } catch (error) {
    console.error("회원가입 에러:", error);
    return { success: false, message: "서버 오류 발생" };
  }
};
