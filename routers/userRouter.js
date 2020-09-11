const { Router } =  require('express');
const userController = require('../controllers/userControllers');

const router = Router();

router.post('/signIn', userController.signIn);

router.get('/login', userController.login);

module.exports = router;