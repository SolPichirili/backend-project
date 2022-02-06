const express = require('express');
const upload = require('../services/multer');
const multerController = require('../controllers/multer');

const multerRouter = express.Router();

multerRouter.post('/uploadfile', upload.single('myFile'), multerController.uploadImg);

module.exports = multerRouter;