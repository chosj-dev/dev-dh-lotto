import { RowDataPacket } from "mysql2";
import db from "../config/dbConfig";

interface User extends RowDataPacket {
  id: number;
}

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const [rows] = await db.query<User[]>("SELECT * FROM USERS");
    return rows;
  } catch (error: any) {
    console.error("Error during DB query:", error.message); // 실제 오류 출력
    throw new Error("Failed to fetch users");
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const [rows] = await db.query<User[]>("SELECT * FROM USERS WHERE id = ?", [
      id,
    ]);
    if (Array.isArray(rows) && rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};
