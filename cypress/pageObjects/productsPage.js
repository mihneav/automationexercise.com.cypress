const productsPage = {
  search: "#search_product",
  submitSearch: "#submit_search",
  productCards: `.features_items > .col-sm-4`,
  productCard: function (index) {
    const selector = `${this.productCards}:nth(${index})`;
    return {
      selector: selector,
      viewProduct: `${selector} .nav`,
      name: `${selector} p:first`,
    };
  },
};

module.exports = productsPage;
