import express from "express";
import {
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  registerPatient,
  loginPatient,
} from "../controllers/patients.controller.js";

const router = express.Router();

router.get("/getAllPatients", getAllPatients);
router.get("/getPatient/:id", getPatientById);
router.put("/updatePatient/:id", updatePatient);
router.delete("/deletePatient/:id", deletePatient);
router.post("/registerPatient", registerPatient);
router.post("/loginPatient", loginPatient);

export default router;
