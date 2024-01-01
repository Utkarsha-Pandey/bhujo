const express = require("express");
const { addTrnsctn, getAllTrnsctn } = require("../controllers/transactionControl");



//router object
const router = express.Router();

//routes

//add trnsctn
router.post('/add-transaction' , addTrnsctn)

//get trnsctn
router.post('/get-transaction' , getAllTrnsctn)

module.exports = router;
