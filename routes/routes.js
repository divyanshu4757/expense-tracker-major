const express = require('express')
const router = express.Router();


const userController = require('../controllers/user.js')
const authentication = require('../middleware/auth.js');
const purchaseController  = require('../controllers/purchase.js');






router.post('/signup', userController.signUp);

router.post('/login', userController.login);

router.post('/expenses',authentication.authenticate,userController.postExpenses);
router.get('/expenses',authentication.authenticate,userController.getExpenses);
router.delete('/delete/:id',authentication.authenticate,userController.deleteExpense);

router.get('/purchase/premiummembership',authentication.authenticate,purchaseController.purchasepremium)

router.post('/purchase/updatetransactionstatus',authentication.authenticate,purchaseController.transactionstatus)




module.exports = router;