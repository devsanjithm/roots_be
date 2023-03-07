import express from "express";
import categoryController from "../controllers/categoryController";
const CategoryRouter = express.Router();

CategoryRouter.post("/category", categoryController.addCategory);
CategoryRouter.put("/category/:id", categoryController.updateCategory);
CategoryRouter.get("/category", categoryController.getCategory);
CategoryRouter.delete("/category/:id", categoryController.deleteCategory);
CategoryRouter.post("/list-category", categoryController.listCategory);

export default CategoryRouter;
