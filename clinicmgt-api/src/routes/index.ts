import express from "express";
import doctorsRouter from "./doctors.js";
import patientsRouter from "./patients.js";
import chatRouter from "./chat.js";

const router = express.Router();

router.use("/doctor", doctorsRouter);
router.use("/patient", patientsRouter);
router.use("/chat", chatRouter);

export default router;
