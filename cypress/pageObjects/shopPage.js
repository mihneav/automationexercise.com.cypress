const shopMenu = {
  home: ".shop-menu > .nav > :nth-child(1) ",
  products: ".shop-menu > .nav > :nth-child(2)",
  cart: ".shop-menu > .nav > :nth-child(3)",
  signUpLogin: ".shop-menu > .nav > :nth-child(4)",
  contactUs: ".shop-menu > .nav > :nth-child(8)",
  loggedInAsUsername: ":nth-child(10) > a",
  delete: ".shop-menu > .nav > :nth-child(5)",
  logout: ".shop-menu > .nav > :nth-child(4) > a",
};

const shopPage = {
  footer: "#footer",
  featuredItems: ".features_items",
};

module.exports = { shopMenu, shopPage };
