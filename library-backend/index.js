const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub,
} = require('apollo-server');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';
const pubsub = new PubSub();

const MONGODB_URI =
  'mongodb+srv://pango:pango@emaily-l3wzb.azure.mongodb.net/BooksNAuthors?retryWrites=true&w=majority';
console.log('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDb', error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: String
    bookCount: Int!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author');
      } else if (args.author && args.genre) {
        try {
          author = await Author.findOne({ name: args.author });
          return Book.find({
            author: { $in: author._id },
            genres: { $in: args.genre },
          }).populate('author');
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args });
        }
      } else if (args.author) {
        try {
          const author = await Author.findOne({ name: args.author });
          return Book.find({ author: { $in: author._id } }).populate('author');
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args });
        }
      }
      return Book.find({ genres: { $in: args.genre } }).populate('author');
    },
    allAuthors: () => {
      // n + 1 problem? Dont really understand, the question and i think it just seems kinda silly atm so im skipping it
      return Author.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      return Book.find({ author: author._id }).countDocuments();
    },
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);
      return author;
    },
  },
  Mutation: {
    addBook: async (root, { title, author, genres, published }, context) => {
      let authorid = await Author.findOne({ name: author });
      const existingAuthor = await Author.findOne({ name: author });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      if (!existingAuthor) {
        try {
          const newAuthor = new Author({ name: author });
          authorid = await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: author });
        }
      }

      const book = new Book({
        title: title,
        author: authorid._id,
        genres: [...genres],
        published: published,
      });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: title,
          genres,
          published,
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = await context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      try {
        const author = await Author.findOne({ name: args.name });
        author.born = args.setBornTo;
        await author.save();
        return author;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'eee') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);

      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Server ready at ${subscriptionsUrl}`);
});
