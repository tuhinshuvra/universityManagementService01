import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemisterController } from './academicSemister.controllers';
import { AcademicSemesterValidation } from './academicSemister.validation';

const router = express.Router();

router.get('/', AcademicSemisterController.getAllFromDB)
router.post(
  '/',
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemisterController.insertIntoDB)

export const AcademicSemisterRoutes = router; 