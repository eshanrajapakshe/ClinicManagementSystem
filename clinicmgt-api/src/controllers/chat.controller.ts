import { Request, Response } from "express";
import * as chatService from "../services/chat.service.js";

export const startChat = async (req: Request, res: Response) => {
  try {
    const { doctorId, patientId } = req.body;
    await chatService.createChatConversation(doctorId, patientId);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { doctorId, patientId, sender, message } = req.body;
    await chatService.addMessageToConversation(
      doctorId,
      patientId,
      sender,
      message
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChat = async (req: Request, res: Response) => {
  try {
    const { doctorId, patientId } = req.params;
    const requesterRole = req.headers["user-role"].toString();

    const chatConversation = await chatService.getChatConversation(
      doctorId,
      patientId,
      requesterRole
    );

    if (!chatConversation) {
      return res.status(404).json({ error: "Chat conversation not found" });
    }

    res.json(chatConversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
