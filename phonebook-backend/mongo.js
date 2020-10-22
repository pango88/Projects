const mongoose = require('mongoose');

if (process.argv.length < 3 || process.argv.length > 5) {
  console.log(
    'node file.js yourpassword (name number) \n must provide a password and cant have more than 5 arguments'
  );
  process.exit(1);
}

if (process.argv.length === 4) {
  console.log('must specify number');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://pango:${password}@emaily-l3wzb.azure.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  console.log('phonebook:');
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
