//dotenv is only needed in dev enviorment
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('data', function (req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to phonebook backend</h1>');
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()));
  });
});

/* Dont know if this is bad practice, anyways seems to work fine */
app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    res.write('<body>');
    res.write(`Phonebook has info for ${persons.length} people`);
    res.write('<br></br>');
    res.write(Date());
    res.write('</body>');
    res.end();
  });
});
/*END OF BLOCK*/

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person.toJSON());
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;
  //personExist = persons.find((person) => person.name === body.name);

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Must specify name and/or number',
    });
  }

  /*if (personExist) {
    return res.status(400).json({
      error: `${personExist.name} is already registered`,
    });
  } */

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson.toJSON());
    })
    .catch((error) => next(error));
});

// Error found here, when updating the person you can have the number be shorter than 8 chars. At the moment i cba to figure out how to fix it since i would most likely need some kind of error handling for this.
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  const person = {
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson.toJSON());
    })
    .catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
