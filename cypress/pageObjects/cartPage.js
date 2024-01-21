const cartPage = {
  productLines: `[id^="product-"]`,
  productLine: function (index) {
    const selector = `${this.productLines}:nth(${index})`;
    return {
      selector: selector,
      description: `${selector} > .cart_description > h4 >`,
      price: `${selector} > .cart_price > p`,
      quantity: `${selector} .cart_quantity >`,
      total: `${selector} > .cart_total >`,
      deleteButton: ` > .cart_delete >`,
    };
  },
  proceedToCheckout: `.col-sm-6 > .btn`,
  totalPrice: `:nth-child(4) > .cart_total_price`,
};

module.exports = cartPage;
