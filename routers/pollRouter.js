const { Router } =  require('express');
const pollController = require('../controllers/pollControllers');

const router = Router();

router.post('/create', pollController.create_poll);

router.put('/:id', pollController.vote);

router.get('/', pollController.get_poll);



module.exports = router;