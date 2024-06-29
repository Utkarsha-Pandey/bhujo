const express = require("express");
const { addTrnsctn, getAllTrnsctn, editTrnsctn, deleteTrnsctn } = require("../controllers/transactionControl");



//router object
const router = express.Router();

//routes

//add trnsctn
router.post('/add-transaction' , addTrnsctn)

//get trnsctn
router.post('/get-transaction' , getAllTrnsctn)

router.post('/edit-transaction' , editTrnsctn)

router.post('/delete-transaction' , deleteTrnsctn)

module.exports = router;
