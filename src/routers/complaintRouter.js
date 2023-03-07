import express from "express";
import complaintController from "../controllers/complaintController";
const ComplaintRouter = express.Router();

ComplaintRouter.post("/complaint", complaintController.addComplaint);
ComplaintRouter.put("/complaint/:id", complaintController.updateComplaint);
ComplaintRouter.get("/complaint", complaintController.getComplaint);
ComplaintRouter.delete("/complaint/:id", complaintController.deleteComplaint);
ComplaintRouter.post("/list-complaint", complaintController.listComplaint);

export default ComplaintRouter;
