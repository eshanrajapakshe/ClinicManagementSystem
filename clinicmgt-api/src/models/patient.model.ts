import { Document, Schema, model } from "mongoose";

export interface IPatient extends Document {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  age: number;
  address: string;
  password: string;
}

const PatientSchema = new Schema<IPatient>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export const PatientModel = model<IPatient>("Patients", PatientSchema);
