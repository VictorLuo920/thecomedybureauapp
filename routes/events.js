var express = require('express');
var router = express.Router();
const eventsCtrl = require('../controllers/events')


/* GET home page. */
router.get('/', eventsCtrl.index);

module.exports = router;
