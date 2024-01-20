const productsPage = {
  search: "#search_product",
  submitSearch: "#submit_search",
  title: ".title",
  productCards: `.features_items > .col-sm-4`,
  productCard: function (index) {
    const selector = `${this.productCards}:nth(${index})`;
    return {
      selector: selector,
      viewProduct: `${selector} .nav`,
      name: `${selector} p:first`,
      productInfo: `${selector} .productinfo`,
      overlayPrice: `${selector} > h2`,
      overlayName: `${selector} > p`,
      overlayAddToCart: `${selector} .product-overlay .btn.btn-default.add-to-cart`,
    };
  },
};

module.exports = productsPage;
