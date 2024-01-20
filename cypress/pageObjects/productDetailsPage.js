const productDetailsPage = {
  name: `.product-information> h2`,
  category: `.product-information> p:nth(0)`,
  price: `.product-information> span > :nth(0)`,
  availability: `.product-information> p:nth(1)`,
  condition: `.product-information> p:nth(2)`,
  brand: `.product-information> p:nth(3)`,
  quantity: "#quantity",
  addToCart: ".product-information > > .btn",
  reviewName: `#name`,
  reviewEmail: `#email`,
  reviewMessage: `#review`,
  reviewButton: `#button-review`,
};

const cartModal = {
  viewCart: "u",
  continueShopping: ".modal-footer > .btn",
};

module.exports = { productDetailsPage, cartModal };
