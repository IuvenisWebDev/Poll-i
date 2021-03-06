const { Router } =  require('express');
const pollController = require('../controllers/pollControllers');

const router = Router();

router.post('/create', pollController.create_poll);

router.get('/create', (req, res) => {

    res.sendFile("/html/createpoll.html", {root: "./"});

});

router.get('/current/:type', pollController.get_poll);

router.get('/:id', pollController.get_poll);

router.put('/:id', pollController.vote);

router.get('/', pollController.get_poll);



module.exports = router;