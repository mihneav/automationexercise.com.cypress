const paymentPage = {
  nameOnCard: `[data-qa="name-on-card"]`,
  cardNumber: `[data-qa="card-number"]`,
  cvc: `[data-qa="cvc"]`,
  expiryMonth: `[data-qa="expiry-month"]`,
  expiryYear: `[data-qa="expiry-year"]`,
  payAndConfirm: `[data-qa="pay-button"]`,
  orderPlacedTitle: `[data-qa="order-placed"] > b`,
  orderPlacedMessage: `.col-sm-9 > p`,
  downloadInvoice: `.col-sm-9 > .btn-default`,
  continueButton: `[data-qa="continue-button"]`,
  downloadInvoice: ".col-sm-9 > .btn-default",
};

module.exports = paymentPage;
