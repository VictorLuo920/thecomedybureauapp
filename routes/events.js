const express = require('express');
const router = express.Router();
const passport = require('passport');
const eventsCtrl = require('../controllers/events')

router.get('/', eventsCtrl.index);
router.post('/:id', eventsCtrl.bookmark); 

module.exports = router;

