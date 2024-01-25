const shopMenu = {
  home: ".shop-menu > .nav > :nth-child(1) ",
  products: ".shop-menu > .nav > :nth-child(2)",
  cart: ".shop-menu > .nav > :nth-child(3)",
  signUpLogin: ".shop-menu > .nav > :nth-child(4)",
  contactUs: ".shop-menu > .nav > :nth-child(8)",
  loggedInAsUsername: ":nth-child(10)",
  delete: ".shop-menu > .nav > :nth-child(5)",
  logout: ".shop-menu > .nav > :nth-child(4)",
  testCases: ".shop-menu > .nav > :nth-child(5) ",
};

const shopPage = {
  footer: "#footer",
  featuredItems: ".features_items",
  subscriptionText: ".single-widget > h2",
  subscribeEmail: "#susbscribe_email",
  subscribeButton: "#subscribe",
  subscribeMessage: ".alert-success",
  recommendedLeftArrow: "#recommended-item-carousel > .left > .fa",
  recommendedRightArrow: "#recommended-item-carousel > .left > .fa",
  recommendedProductsTitle: ".recommended_items > .title",
  carouselActiveCards: ".active .single-products > .productinfo",
  recommendedProductCard: function (index) {
    return `${this.carouselActiveCards}:nth(${index}) > .btn`;
  },
  recommendedProductName: function (index) {
    return `${this.carouselActiveCards}:nth(${index}) > p`;
  },
  upArrow: "#scrollUp",
  sliderText: ".active > :nth-child(1) > h2",
};

module.exports = { shopMenu, shopPage };
