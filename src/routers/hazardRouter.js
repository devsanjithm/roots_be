import express from "express";
import hazardController from "../controllers/hazardController";
const HazardRouter = express.Router();

HazardRouter.post("/hazard", hazardController.addHazard);
HazardRouter.put("/hazard/:id", hazardController.updateHazard);
HazardRouter.get("/hazard", hazardController.getHazard);
HazardRouter.delete("/hazard/:id", hazardController.deleteHazard);
HazardRouter.post("/list-hazard", hazardController.listHazard);

export default HazardRouter;
