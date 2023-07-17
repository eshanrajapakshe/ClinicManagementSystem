import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DoctorModel, IDoctor } from "../models/doctor.model.js";
import { PatientModel } from "../models/patient.model.js";
import { UserRole } from "../enums/userRole.enum.js";

const generateToken = (doctor) => {
  const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const registerDoctor = async (doctor: IDoctor) => {
  try {
    const existingDoctor = await DoctorModel.findOne({ email: doctor.email });
    if (existingDoctor) {
      throw new Error("Doctor already registered with this email");
    }

    const hashedPassword = await bcrypt.hash(doctor.password, 10);

    const newDoctor = await DoctorModel.create({
      userType: UserRole.DOCTOR,
      ...doctor,
      password: hashedPassword,
    });

    const token = generateToken(newDoctor);

    return { doctor: newDoctor, token };
  } catch (error) {
    throw new Error(`Failed to register doctor. ${error}`);
  }
};

export const loginDoctor = async (email: string, password: string) => {
  try {
    const doctor = await DoctorModel.findOne({ email }).select("+password");
    if (!doctor) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(doctor);

    return { doctor, token };
  } catch (error) {
    throw new Error(`Failed to login. ${error}`);
  }
};

export const registerPatient = async (patient) => {
  try {
    const existingPatient = await PatientModel.findOne({
      email: patient.email,
    });
    if (existingPatient) {
      throw new Error("Patient already registered with this email");
    }

    const hashedPassword = await bcrypt.hash(patient.password, 10);

    const newPatient = await PatientModel.create({
      userType: UserRole.PATIENT,
      ...patient,
      password: hashedPassword,
    });

    const token = generateToken(newPatient);

    return { patient: newPatient, token };
  } catch (error) {
    throw new Error(`Failed to register patient. ${error}`);
  }
};

export const loginPatient = async (email: string, password: string) => {
  try {
    const patient = await PatientModel.findOne({ email }).select("+password");
    if (!patient) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(patient);

    return { patient, token };
  } catch (error) {
    throw new Error(`Failed to login. ${error}`);
  }
};
