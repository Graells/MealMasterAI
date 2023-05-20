import { Router } from "express";
const router = Router();
import { getAll, postAI, getOne, updateOne, deleteOne } from "./controller";

router.get("/meals", getAll);
// router.post("/meals", controller.postOne);
router.post("/ai-generate", postAI);
router.get("/meals/:id", getOne);
router.put("/meals/:id", updateOne);
router.delete("/meals/:id", deleteOne);

export default router;
