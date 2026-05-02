import { Router } from "express";
import { getSchedule } from "../controllers/schedulerController";

const router = Router();

router.get("/:depotId", getSchedule);

export default router;
