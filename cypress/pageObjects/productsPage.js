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
  categoryLinks: function (label = "", subCategoryLabel) {
    const selector = `.panel-default:contains(${label})`;
    return {
      category: selector,
      plus: `${selector} .fa`,
      subCategory: function (subCategoryLabel = "") {
        const subSelector = `${this.category} .panel-body li:contains(${subCategoryLabel}) > a`;
        return subSelector;
      },
    };
  },
  categoryTitle: ".title",
  brand: function (identifier) {
    const selector = `.brands-name`;
    return {
      lineLabel: `${selector} :contains(${identifier})`, //label
      lineIndex: `${selector} li:nth(${identifier})`, //index
    };
  },
};

module.exports = productsPage;
