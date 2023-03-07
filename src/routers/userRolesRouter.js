import express from "express";
import userRolesController from "../controllers/userRolesController";
const UserRolesRouter = express.Router();

UserRolesRouter.post("/userRoles", userRolesController.addUserRoles);
UserRolesRouter.put("/userRoles/:id", userRolesController.updateUserRoles);
UserRolesRouter.get("/userRoles", userRolesController.getUserRoles);
UserRolesRouter.delete("/userRoles/:id", userRolesController.deleteUserRoles);
UserRolesRouter.post("/list-userRoles", userRolesController.listUserRoles);

export default UserRolesRouter;
