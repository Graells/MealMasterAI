const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/meals', controller.getAll);
router.post('/meals', controller.postOne);
router.post('/ai-generate', controller.postAI);
router.get('/meals/:id', controller.getOne);
router.put('/meals/:id', controller.updateOne);
router.delete('/meals/:id', controller.deleteOne);



module.exports = router;