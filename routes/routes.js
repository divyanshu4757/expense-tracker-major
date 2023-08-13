const express = require('express')
const router = express.Router();


const userController = require('../controllers/user.js')

router.post('/signup', userController.signUp);

router.post('/login', userController.login);

router.post('/expenses',userController.postExpenses);
router.get('/expenses',userController.getExpenses);
router.delete('/delete/:id',userController.deleteExpense);





module.exports = router;