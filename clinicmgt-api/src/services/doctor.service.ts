import { DoctorModel, IDoctor } from "../models/doctor.model.js";

export const getDoctors = async (): Promise<IDoctor[]> => {
  try {
    const doctors = await DoctorModel.find();
    return doctors;
  } catch (error) {
    throw new Error("Failed to fetch doctors");
  }
};

export const getDoctorById = async (
  doctorId: string
): Promise<IDoctor | null> => {
  try {
    const doctor = await DoctorModel.findById(doctorId);
    return doctor;
  } catch (error) {
    throw new Error("Failed to fetch doctor");
  }
};

export const updateDoctor = async (
  doctorId: string,
  updatedDoctor: IDoctor
): Promise<IDoctor | null> => {
  try {
    const doctor = await DoctorModel.findByIdAndUpdate(
      doctorId,
      updatedDoctor,
      { new: true }
    );
    return doctor;
  } catch (error) {
    throw new Error("Failed to update doctor");
  }
};

export const deleteDoctor = async (
  doctorId: string
): Promise<IDoctor | null> => {
  try {
    const doctor = await DoctorModel.findByIdAndDelete(doctorId);
    return doctor;
  } catch (error) {
    throw new Error("Failed to delete doctor");
  }
};
