import express from "express";
import {
  startChat,
  sendMessage,
  getChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/start", startChat);
router.post("/send", sendMessage);
router.get("/:doctorId/:patientId", getChat);

export default router;
