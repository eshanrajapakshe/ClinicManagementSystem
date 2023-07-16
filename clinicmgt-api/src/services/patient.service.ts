import { PatientModel, IPatient } from "../models/patient.model.js";

export const getPatients = async (): Promise<IPatient[]> => {
  try {
    const patients = await PatientModel.find();
    return patients;
  } catch (error) {
    throw new Error("Failed to fetch patients");
  }
};

export const getPatientById = async (
  patientId: string
): Promise<IPatient | null> => {
  try {
    const patient = await PatientModel.findById(patientId);
    return patient;
  } catch (error) {
    throw new Error("Failed to fetch patient");
  }
};

export const updatePatient = async (
  patientId: string,
  updatedPatient: IPatient
): Promise<IPatient | null> => {
  try {
    const patient = await PatientModel.findByIdAndUpdate(
      patientId,
      updatedPatient,
      { new: true }
    );
    return patient;
  } catch (error) {
    throw new Error("Failed to update patient");
  }
};

export const deletePatient = async (
  patientId: string
): Promise<IPatient | null> => {
  try {
    const patient = await PatientModel.findByIdAndDelete(patientId);
    return patient;
  } catch (error) {
    throw new Error("Failed to delete patient");
  }
};
