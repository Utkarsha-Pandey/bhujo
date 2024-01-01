const transactionModel = require('../models/transactionModel')
const moment = require('moment')


const getAllTrnsctn = async(req,res) => {
    try {
        const {frequency, SelectedDate, type} = req.body
        const transactions = await transactionModel.find({
            ...(frequency !== 'custom' ? {
                date:{
                    $gt : moment().subtract(Number(frequency), 'd').toDate(),
                },
            } : {
                date:{
                    $gte: SelectedDate[0],
                    $lte: SelectedDate[1],
                }
            }),
            userid: req.body.userid,
            ...(type !== 'all' && {type}), 
        });
        res.status(200).json(transactions);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        
    }
}

const addTrnsctn = async(req, res) => {
    try {
        const newTransaction = new transactionModel(req.body)
        await newTransaction.save()
        res.status(201).send('Transaction Added Successfully.');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }
}

module.exports = {getAllTrnsctn, addTrnsctn}