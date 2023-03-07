import express from "express";
import rolesController from "../controllers/rolesController";
const RolesRouter = express.Router();

RolesRouter.post("/roles", rolesController.addRoles);
RolesRouter.put("/roles/:id", rolesController.updateRoles);
RolesRouter.get("/roles", rolesController.getRoles);
RolesRouter.delete("/roles/:id", rolesController.deleteRoles);
RolesRouter.post("/list-roles", rolesController.listRoles);

export default RolesRouter;
