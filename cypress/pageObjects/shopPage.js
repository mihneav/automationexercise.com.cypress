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
};

module.exports = { shopMenu, shopPage };
