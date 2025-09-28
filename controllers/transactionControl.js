const transactionModel = require('../models/transactionModel');
const moment = require('moment');

const getAllTrnsctn = async (req, res) => {
  try {
    const { frequency, SelectedDate, type } = req.body;
    const transactions = await transactionModel.find({
      ...(frequency !== 'custom'
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), 'd').toDate(),
            },
          }
        : {
            date: {
              $gte: SelectedDate[0],
              $lte: SelectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== 'all' && { type }),
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTrnsctn = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();

    // Emit real-time notification
    req.app.get("io").emit("notification", { message: "New transaction added!" });

    res.status(201).send('Transaction Added Successfully.');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const editTrnsctn = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );

    // Emit real-time notification
    req.app.get("io").emit("notification", { message: "Transaction updated!" });

    res.status(200).send('Transaction Edited Successfully.');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteTrnsctn = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });

    // Emit real-time notification
    req.app.get("io").emit("notification", { message: "Transaction deleted!" });

    res.status(200).send('Transaction Deleted Successfully.');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllTrnsctn, addTrnsctn, editTrnsctn, deleteTrnsctn };
