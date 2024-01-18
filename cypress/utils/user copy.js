import { faker } from "@faker-js/faker";
const randomDate = faker.date.between(
  new Date(new Date().setFullYear(new Date().getFullYear() - 65)),
  new Date(new Date().setFullYear(new Date().getFullYear() - 18))
);
const sex = faker.person.sex();
// const user = {
//   sex: faker.person.sex(),
//   get name() {
//     return `${this.firstName} ${this.lastName}`;
//   },
//   firstName: faker.person.firstName(),
//   lastName: faker.person.lastName(),
//   get email() {
//     return faker.internet.email({
//       firstName: this.firstName,
//       lastName: this.lastName,
//     });
//   },
//   get title() {
//     const title = this.sex == "male" ? "Mr." : "Mrs.";
//     return title;
//   },
//   password: faker.internet.password(),
//   dayOfBirth: randomDate.getDate(),
//   monthOfBirth: randomDate.getMonth() + 1,
//   yearOfBirth: randomDate.getFullYear().toString(),
//   company: faker.company.name(),
//   address: faker.location.streetAddress(),
//   address2: faker.location.secondaryAddress(),
//   country: "United States",
//   get state() {
//     return faker.location.state(`${this.country}`);
//   },
//   city: faker.location.city(),
//   get zipCode() {
//     return faker.location.zipCode(`${this.state}`);
//   },
//   mobileNumber: faker.phone.number(),
// };

const user = {
  get name() {
    return `${this.firstname} ${this.lastname}`;
  },
  get email() {
    return faker.internet.email({
      firstName: this.firstName,
      lastName: this.lastName,
    });
  },
  password: faker.internet.password(),
  get title() {
    const title = this.sex == "male" ? "Mr." : "Mrs.";
    return title;
  },
  birth_date: randomDate.getDate(),
  birth_month: randomDate.getMonth() + 1,
  birth_year: randomDate.getFullYear().toString(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  company: faker.company.name(),
  address1: faker.location.streetAddress(),
  address2: faker.location.secondaryAddress(),
  country: "United States",
  get zipcode() {
    return faker.location.zipCode(`${this.state}`);
  },
  get state() {
    return faker.location.state(`${this.country}`);
  },
  city: faker.location.city(),
  mobile_number: faker.phone.number(),
};

// module.exports = { user };
