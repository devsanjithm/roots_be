import express from "express";
import departmentController from "../controllers/departmentController";
const DepartmentRouter = express.Router();

DepartmentRouter.post("/department", departmentController.addDepartment);
DepartmentRouter.put("/department/:id", departmentController.updateDepartment);
DepartmentRouter.get("/department", departmentController.getDepartment);
DepartmentRouter.delete("/department/:id", departmentController.deleteDepartment);
DepartmentRouter.post("/list-department", departmentController.listDepartment);

export default DepartmentRouter;
