import express from "express";
import {
  registerDoctor,
  loginDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
} from "../controllers/doctors.controller.js";

const router = express.Router();

router.post("/registerDoctor", registerDoctor);
router.post("/loginDoctor", loginDoctor);
router.get("/getAllDoctors", getAllDoctors);
router.get("/getDoctor/:id", getDoctorById);
router.put("/updateDoctor/:id", updateDoctor);
router.delete("/deleteDoctor/:id", deleteDoctor);

export default router;
