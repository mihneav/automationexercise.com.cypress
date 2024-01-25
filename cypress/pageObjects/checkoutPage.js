const createAddressSelectors = (prefix) => ({
  name: `#${prefix} > .address_firstname`,
  company: `#${prefix} > :nth-child(3)`,
  address1: `#${prefix} > :nth-child(4)`,
  address2: `#${prefix} > :nth-child(5)`,
  city: `#${prefix} > .address_city`,
  country: `#${prefix} > .address_country_name`,
  mobile_number: `#${prefix} > .address_phone`,
});

const checkoutPage = {
  addressDelivery: createAddressSelectors("address_delivery"),
  addressInvoice: createAddressSelectors("address_invoice"),
  form: ".form-control",
  placeOrder: ":nth-child(7) > .btn",
};

module.exports = checkoutPage;
