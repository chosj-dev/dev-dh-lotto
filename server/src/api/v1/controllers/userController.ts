import { Request, Response } from "express";
import { getAllUsers, getUserById } from "../../../services/userService";

export const fetchAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsers();
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const fetchUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user" });
  }
};
