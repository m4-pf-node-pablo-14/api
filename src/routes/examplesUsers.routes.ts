/* import { Router } from "express";
import {
  createUserController,
  listUserController,
} from "../controllers/examplesUsers.controllers";
import ensureExampleDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userSerializer } from "../serializers/exampleUser.serializes";

const exampleUserRouter = Router();

exampleUserRouter.post(
  "/users",
  ensureExampleDataIsValidMiddleware(userSerializer),
  createUserController
);
exampleUserRouter.get("/users", listUserController);

export default exampleUserRouter;
 */