import express from 'express';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic_semisters",
    route: AcademicSemisterRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
