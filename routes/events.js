const express = require('express');
const router = express.Router();
const eventsCtrl = require('../controllers/events')

router.get('/', eventsCtrl.index);
router.post('/:id', eventsCtrl.bookmark); 
//      Bug issues with bookmark function:
//          - same event is being saved as separate entities each time the bookmark function is fired

        //I might solve my problem with the double data creation with changing this to a put method

module.exports = router;

