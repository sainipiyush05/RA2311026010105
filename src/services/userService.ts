import { Log } from "../middleware/logger";

export const getUsers = async () => {

  await Log(
    "backend",
    "debug",
    "service",
    "User service started"
  );

  const users = [
    {
      id: 1,
      name: "Piyush",
    },
    {
      id: 2,
      name: "Rahul",
    },
  ];

  await Log(
    "backend",
    "info",
    "service",
    "Users fetched successfully"
  );

  return users;
};