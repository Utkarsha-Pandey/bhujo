const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({

    userid:{
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: [true, 'Amount is Required']
    },
    type: {
        type: String,
        required: [true, 'Type of transaction must be specified.']
    },
    category: {
        type: String,
        required: [true, 'Category is required.']
    },
    reference: {
        type: String,
        required: [true, 'Ref is required.']
    },
    date: {
        type: Date,
        required: [true, 'Date is must.']
    },



}, 
{ timestamps: true }
)

const transactionModel = mongoose.model('transaction', transactionSchema)

module.exports = transactionModel;




