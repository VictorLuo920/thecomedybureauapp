var express = require('express');
var router = express.Router();
const eventsCtrl = require('../controllers/events')

router.get('/', eventsCtrl.index);
router.post('/:id', eventsCtrl.bookmark);

module.exports = router;

// const show = (req, res) => {
//   res.render('todos/show', {
//     todo: Todo.getOne(req.params.id)
// <note to self: the above was me trying to figure out how routers and paths by id work again...>
//   });
// }
