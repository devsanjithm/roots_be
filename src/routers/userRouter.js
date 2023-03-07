import express from "express";
import userController from "../controllers/userController";
const UserRouter = express.Router();

UserRouter.post("/user", userController.addUser);
UserRouter.post("/login", userController.loginUser);
// UserRouter.put("user/:id", businessTypeRouter.updateBusinessType);
// UserRouter.get("user/:id", businessTypeRouter.getBusinessType);
// UserRouter.delete(
//   "user/:id",
//   businessTypeRouter.deleteBusinessType
// );
UserRouter.post("/list-user", userController.listUser);

export default UserRouter;
