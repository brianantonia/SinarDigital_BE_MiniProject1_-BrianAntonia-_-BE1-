
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');


router.get('/', apiController.getHomePage);


router.get('/log-mood', apiController.getFormPage);

router.post('/log-mood', apiController.processFormData);


router.get('/mood-history', apiController.getHistoryPage);


module.exports = router;