import { Request, Response } from "express";
import { IDoctor } from "../models/doctor.model.js";
import * as doctorService from "../services/doctor.service.js";
import * as authService from "../services/auth.service.js";

const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await doctorService.getDoctors();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};

const registerDoctor = async (req: Request, res: Response) => {
  try {
    const doctor: IDoctor = req.body;
    const { doctor: newDoctor, token } = await authService.registerDoctor(
      doctor
    );
    res.status(201).json({ doctor: newDoctor, token });
  } catch (error) {
    res.status(500).json({ error: `Failed to register doctor. ${error}` });
  }
};

const loginDoctor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { doctor, token } = await authService.loginDoctor(email, password);
    res.json({ doctor, token });
  } catch (error) {
    res.status(401).json({ error: "Invalid email or password" });
  }
};

const getDoctorById = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.id;
    const doctor = await doctorService.getDoctorById(doctorId);
    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctor" });
  }
};

const updateDoctor = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.id;
    const updatedDoctor: IDoctor = req.body;
    const doctor = await doctorService.updateDoctor(doctorId, updatedDoctor);
    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: "Failed to update doctor" });
  }
};

const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.id;
    const doctor = await doctorService.deleteDoctor(doctorId);
    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete doctor" });
  }
};

export {
  getAllDoctors,
  registerDoctor,
  loginDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
