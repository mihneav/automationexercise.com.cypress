import { faker } from "@faker-js/faker";
const randomDate = faker.date.between(
  new Date(new Date().setFullYear(new Date().getFullYear() - 65)),
  new Date(new Date().setFullYear(new Date().getFullYear() - 18))
);
const sex = faker.person.sex();

class User {
  constructor() {
    this._firstName = faker.person.firstName();
    this._lastName = faker.person.lastName();
    this._password = faker.internet.password();
    this._birth_date = randomDate.getDate();
    this._birth_month = randomDate.getMonth() + 1;
    this._birth_year = randomDate.getFullYear().toString();
    this._company = faker.company.name();
    this._address1 = faker.location.streetAddress();
    this._address2 = faker.location.secondaryAddress();
    this._country = "United States";
    this._city = faker.location.city();
    this._mobileNumber = faker.phone.number();
  }

  get name() {
    return `${this._firstName} ${this._lastName}`;
  }

  get email() {
    return faker.internet.email({
      firstName: this._firstName,
      lastName: this._lastName,
    });
  }

  get title() {
    const title = this.sex === "male" ? "Mr." : "Mrs.";
    return title;
  }

  get zipcode() {
    return faker.address.zipCode(`${this.state}`);
  }

  get state() {
    return faker.address.state(`${this._country}`);
  }

  // Add other getters as needed

  // Example method to generate the user object
  generateUser() {
    return {
      name: this.name,
      email: this.email,
      password: this._password,
      title: this.title,
      birth_date: this._birth_date,
      birth_month: this._birth_month,
      birth_year: this._birth_year,
      firstname: this._firstName,
      lastname: this._lastName,
      company: this._company,
      address1: this._address1,
      address2: this._address2,
      country: this._country,
      zipcode: this.zipcode,
      state: this.state,
      city: this._city,
      mobile_number: this._mobileNumber,
    };
  }
}
module.exports = User;
