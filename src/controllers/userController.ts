import { Request, Response } from "express";
import { Log } from "../middleware/logger";
import { getUsers } from "../services/userService";

export const fetchUsers = async (
  req: Request,
  res: Response
) => {
  try {
    await Log(
      "backend",
      "info",
      "controller",
      "Fetching all users"
    );

    const users = await getUsers();

    res.status(200).json(users);

  } catch (error) {

    await Log(
      "backend",
      "error",
      "controller",
      "Failed to fetch users"
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};