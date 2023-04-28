"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.get('/meals', controller_1.controller.getAll);
// router.post('/meals', controller.postOne);
router.post('/ai-generate', controller_1.controller.postAI);
router.get('/meals/:id', controller_1.controller.getOne);
router.put('/meals/:id', controller_1.controller.updateOne);
router.delete('/meals/:id', controller_1.controller.deleteOne);
exports.default = router;
