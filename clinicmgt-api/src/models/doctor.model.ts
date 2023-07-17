import { Document, Schema, model } from "mongoose";
import { UserRole } from "../enums/userRole.enum.js";

export interface IDoctor extends Document {
  userType: string;
  firstName: string;
  secondName: string;
  email: string;
  contactNumber: string;
  fieldOfSpeciality: string;
  hospital: string;
  university: string;
  password: string;
}

const DoctorSchema = new Schema<IDoctor>({
  userType: {
    type: String,
    enum: [UserRole.DOCTOR],
    required: true,
    default: UserRole.DOCTOR,
  },
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  fieldOfSpeciality: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export const DoctorModel = model<IDoctor>("Doctors", DoctorSchema);
