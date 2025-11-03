import { Router } from "express";
import * as ClientController from "../controllers/ClientController";
import { ensureAuth } from "../middlewares/auth.middleware";

const router = Router();

router.use(ensureAuth);

router.post("/", ClientController.create);
router.get("/", ClientController.list);
router.get("/:id", ClientController.getOne);
router.put("/:id", ClientController.update);

export default router;