import { Schema, model } from "mongoose";
import { UserRole } from "../enums/userRole.enum.js";

interface IMessage {
  sender: string;
  message: string;
  timestamp: Date;
}

export interface IChat extends Document {
  doctorId: string;
  patientId: string;
  messages: IMessage[];
}

const ChatConversationSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "Doctors",
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "Patients",
    required: true,
  },
  messages: [
    {
      sender: {
        type: String,
        enum: [UserRole.DOCTOR, UserRole.PATIENT],
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const ChatConversationModel = model(
  "ChatConversations",
  ChatConversationSchema
);
