import express from "express";
import { checkAuthReq } from "../helpers";
const recordRoutes = express.Router();
import DepartmentRouter from "./departmentRouter";
import upload from "../helpers/imageUpload";
import imageUpload from "../controllers/imageUploadController";
import CategoryRouter from "./categoryRouter";
import HazardRouter from "./hazardRouter";
import RankRouter from "./rankRouter";
import RolesRouter from "./rolesRouter";
import UserRolesRouter from "./userRolesRouter";
import ComplaintRouter from "./complaintRouter";
import UserRouter from "./userRouter";
import { STATUS_CODE } from "../config";
import response from "../helpers/response";

recordRoutes.get("/", async (req, res) => {
  res
    .status(STATUS_CODE.success)
    .json(
      response("success", { message: "success" }, true, STATUS_CODE.success)
    );
});
recordRoutes.get("/api", async (req, res) => {
  res
    .status(STATUS_CODE.success)
    .json(
      response("success", { message: "success" }, true, STATUS_CODE.success)
    );
});
recordRoutes.use("/api", DepartmentRouter);
recordRoutes.use("/api", CategoryRouter);
recordRoutes.use("/api", HazardRouter);
recordRoutes.use("/api", RankRouter);
recordRoutes.use("/api", RolesRouter);
recordRoutes.use("/api", UserRouter);
recordRoutes.use("/api", UserRolesRouter);
recordRoutes.use("/api", ComplaintRouter);
recordRoutes.post("/api/image", upload.array("file"), imageUpload);
recordRoutes.use("*", (req, res) => {
  return res.status(STATUS_CODE.notFound).json(
    response("router not found", {}, false, STATUS_CODE.notFound, {
      error: "Router not found",
    })
  );
});

export default recordRoutes;
