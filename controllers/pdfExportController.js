const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const transactionModel = require('../models/transactionModel');
const userModel = require('../models/userModels');

const exportExpensesPdf = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user's transactions
    const transactions = await transactionModel.find({ userid: userId });

    if (!transactions.length) {
      return res.status(404).send("No transactions found for this user.");
    }

    // Fetch user's details
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Create a document
    const doc = new PDFDocument({ margin: 30 });

    // Define the file path
    const filePath = path.join(__dirname, '..', 'exports', `expenses-${userId}.pdf`);

    // Pipe the document to a blob
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Add content to the document
    doc.fontSize(25).text('Expenses Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text(`Username: ${user.name}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text(`Email: ${user.email}`, { align: 'center' });
    doc.moveDown();

    // Add table header
    const tableTop = 200;
    const itemGap = 40;

    doc.fontSize(12);
    doc.text('Date', 50, tableTop, { bold: true });
    doc.text('Type', 150, tableTop, { bold: true });
    doc.text('Amount', 250, tableTop, { bold: true });
    doc.text('Category', 350, tableTop, { bold: true });
    doc.text('Description', 450, tableTop, { bold: true });

    // Add transactions in table rows
    transactions.forEach((transaction, i) => {
      const y = tableTop + 25 + (i + 1) * itemGap;
      doc.text(transaction.date.toDateString(), 50, y);
      doc.text(transaction.type, 150, y);
      doc.text(`Rs.${transaction.amount}`, 250, y);
      doc.text(transaction.category, 350, y);
      doc.text(transaction.reference, 450, y);
    });


    doc.end();

    writeStream.on('finish', () => {
      res.download(filePath, `expenses-${userId}.pdf`, (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
        }
        fs.unlinkSync(filePath); // Clean up the file after download
      });
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ success: false, error });
  }
};

module.exports = { exportExpensesPdf };
