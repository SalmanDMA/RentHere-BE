const asyncHandler = require('express-async-handler');
const midtransaClient = require('midtrans-client');

const payment = asyncHandler(async (req, res) => {
  const snap = new midtransaClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  const parameter = {
    transaction_details: {
      order_id: req.body.transactionId,
      gross_amount: req.body.totalCost,
    },
    customer_details: {
      first_name: req.user.name,
      email: req.user.email,
    },
  };

  snap.createTransaction(parameter).then((transaction) => {
    res.status(200).json({
      status: 'success',
      message: 'Payment Success',
      data: transaction,
    });
  });
});

module.exports = {
  payment,
};
