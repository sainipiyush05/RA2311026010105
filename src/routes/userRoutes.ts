import express from "express";
import { fetchUsers } from "../controllers/userController";
import { Log } from "../middleware/logger";

const router = express.Router();

router.get("/", async (req, res) => {

  await Log(
    "backend",
    "info",
    "route",
    "GET /api/users route called"
  );

  fetchUsers(req, res);
});

export default router;