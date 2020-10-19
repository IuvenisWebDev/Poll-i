const { Router } =  require('express');
const userController = require('../controllers/userControllers');

const router = Router();

router.post('/signUp', userController.signUp);

router.get('/signUp', (req, res) => {

  
    //res.sendFile('/html/signUpPage.html',{root: "./"});
    res.redirect('/');

});

router.post('/signOut', userController.signOut);

router.post('/login', userController.login);

module.exports = router;