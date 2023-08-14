const express = require('express')
const router = express.Router();


const userController = require('../controllers/user.js')
const authentication = require('../middleware/auth.js');







router.post('/signup', userController.signUp);

router.post('/login', userController.login);

router.post('/expenses',authentication.authenticate,userController.postExpenses);
router.get('/expenses',authentication.authenticate,userController.getExpenses);
router.delete('/delete/:id',authentication.authenticate,userController.deleteExpense);





module.exports = router;