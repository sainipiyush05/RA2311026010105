import { Router } from "express";
import { fetchPriorityInbox } from "../controllers/notificationController";

const router = Router();

router.get("/priority", fetchPriorityInbox);

export default router;
