const checkoutPage = {
  name: "#address_delivery > .address_firstname",
  company: "#address_delivery > :nth-child(3)",
  address1: "#address_delivery > :nth-child(4)",
  address2: "#address_delivery > :nth-child(5)",
  city: "#address_delivery > .address_city",
  country: "#address_delivery > .address_country_name",
  mobile_number: "#address_delivery > .address_phone",
  form: ".form-control",
  placeOrder: ":nth-child(7) > .btn",
};

module.exports = checkoutPage;
