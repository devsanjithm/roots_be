import express from "express";
import rankController from "../controllers/rankController";
const RankRouter = express.Router();

RankRouter.post("/rank", rankController.addRank);
RankRouter.put("/rank/:id", rankController.updateRank);
RankRouter.get("/rank", rankController.getRank);
RankRouter.delete("/rank/:id", rankController.deleteRank);
RankRouter.post("/list-rank", rankController.listRank);

export default RankRouter;
