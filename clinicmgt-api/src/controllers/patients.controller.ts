import { Request, Response } from "express";
import { IPatient } from "../models/patient.model.js";
import * as patientService from "../services/patient.service.js";
import * as authService from "../services/auth.service.js";

const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await patientService.getPatients();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

const registerPatient = async (req: Request, res: Response) => {
  try {
    const patient: IPatient = req.body;
    const { patient: newPatient, token } = await authService.registerPatient(
      patient
    );
    res.status(201).json({ patient: newPatient, token });
  } catch (error) {
    res.status(500).json({ error: `Failed to register patient. ${error}` });
  }
};

const loginPatient = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { patient, token } = await authService.loginPatient(email, password);
    res.json({ patient, token });
  } catch (error) {
    res.status(401).json({ error: "Invalid email or password" });
  }
};

const getPatientById = async (req: Request, res: Response) => {
  try {
    const patientId = req.params.id;
    const patient = await patientService.getPatientById(patientId);
    if (!patient) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patient" });
  }
};

const updatePatient = async (req: Request, res: Response) => {
  try {
    const patientId = req.params.id;
    const updatedPatient: IPatient = req.body;
    const patient = await patientService.updatePatient(
      patientId,
      updatedPatient
    );
    if (!patient) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Failed to update patient" });
  }
};

const deletePatient = async (req: Request, res: Response) => {
  try {
    const patientId = req.params.id;
    const patient = await patientService.deletePatient(patientId);
    if (!patient) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete patient" });
  }
};

export {
  getAllPatients,
  registerPatient,
  loginPatient,
  getPatientById,
  updatePatient,
  deletePatient,
};
