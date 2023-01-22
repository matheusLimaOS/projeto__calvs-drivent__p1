import { Router } from "express";
import { authenticateToken, validateBody,validateQuery } from "@/middlewares";
import { getEnrollmentByUser, postCreateOrUpdateEnrollment, getAddressFromCEP } from "@/controllers";
import { createEnrollmentSchema, cepValidationSchema} from "@/schemas";

const enrollmentsRouter = Router();

enrollmentsRouter
  .get("/cep", validateQuery(cepValidationSchema),getAddressFromCEP)
  .all("/*", authenticateToken)
  .get("/", getEnrollmentByUser)
  .post("/", validateBody(createEnrollmentSchema), postCreateOrUpdateEnrollment);

export { enrollmentsRouter };
