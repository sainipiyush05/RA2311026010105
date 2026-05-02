"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedulerController_1 = require("../controllers/schedulerController");
const router = (0, express_1.Router)();
router.get("/:depotId", schedulerController_1.getSchedule);
exports.default = router;
