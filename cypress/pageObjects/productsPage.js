const productsPage = {
  productCard: function (index) {
    const selector = `.features_items > .col-sm-4:nth(${index})`;
    return {
      selector: selector,
      viewProduct: `${selector} .nav`,
    };
  },
};

module.exports = productsPage;
