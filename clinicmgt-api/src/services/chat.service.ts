import { ChatConversationModel } from "../models/chat.model.js";
import { DoctorModel } from "../models/doctor.model.js";
import { PatientModel } from "../models/patient.model.js";
import { UserRole } from "../enums/userRole.enum.js";

export const createChatConversation = async (
  doctorId: string,
  patientId: string
) => {
  try {
    const chatConversation = await ChatConversationModel.create({
      doctorId,
      patientId,
      messages: [],
    });
    return chatConversation;
  } catch (error) {
    throw new Error(`Failed to create chat conversation. ${error}`);
  }
};

export const addMessageToConversation = async (
  doctorId: string,
  patientId: string,
  sender: string,
  message: string
) => {
  try {
    const chatConversation = await ChatConversationModel.findOneAndUpdate(
      { doctorId, patientId },
      { $push: { messages: { sender, message, timestamp: new Date() } } },
      { new: true }
    );
    return chatConversation;
  } catch (error) {
    throw new Error(`Failed to add message to chat conversation. ${error}`);
  }
};

export const getChatConversation = async (
  doctorId: string,
  patientId: string,
  requesterRole: string
) => {
  try {
    const chatConversation = await ChatConversationModel.findOne({
      doctorId,
      patientId,
    });
    if (!chatConversation) {
      return null;
    }

    let requesterDetails = null;
    if (requesterRole === UserRole.DOCTOR) {
      const patient = await PatientModel.findById(patientId);
      requesterDetails = patient.toObject();
    } else if (requesterRole === UserRole.PATIENT) {
      const doctor = await DoctorModel.findById(doctorId);
      requesterDetails = doctor.toObject();
    }

    const chatConversationWithRequester = {
      ...chatConversation.toObject(),
      requester: requesterDetails,
    };

    return chatConversationWithRequester;
  } catch (error) {
    throw new Error(`Failed to get chat conversation. ${error}`);
  }
};
