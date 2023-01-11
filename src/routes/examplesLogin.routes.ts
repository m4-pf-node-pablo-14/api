/* import { Router } from "express";
import { createLoginController } from "../controllers/examplesLogin.controllers";
import ensureExampleDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userSerializer } from "../serializers/exampleUser.serializes";

const exampleLoginRouter = Router();

exampleLoginRouter.post(
  "/login",
  ensureExampleDataIsValidMiddleware(userSerializer),
  createLoginController
);

export default exampleLoginRouter;
 */