const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((highest, blog) =>
    highest.likes > blog.likes ? highest : blog
  );
};

// This works, however its verbose and contains poorly named variables. Could use some cleaning and more higherorder functions, chaining perhaps?...
const mostBlogs = (blogs) => {
  let authorBlogCount = [];

  for (let i = 0; i < blogs.length; i++) {
    authorBlogCount.push({
      author: blogs[i].author,
      blogs: 1,
    });
  }

  let reducedBlogCount = [];
  authorBlogCount.reduce(function (res, value) {
    if (!res[value.author]) {
      res[value.author] = { author: value.author, blogs: 0 };
      reducedBlogCount.push(res[value.author]);
    }
    res[value.author].blogs += value.blogs;
    return res;
  }, {});

  return reducedBlogCount.reduce((highest, author) =>
    highest.blogs > author.blogs ? highest : author
  );
};

// This works, however its verbose and contains poorly named variables. Could use some cleaning and more higherorder functions, chaining perhaps?...
const mostLikes = (blogs) => {
  let initial = [];

  for (let i = 0; i < blogs.length; i++) {
    initial.push({
      author: blogs[i].author,
      likes: blogs[i].likes,
    });
  }

  let summed = [];

  initial.reduce(function (res, value) {
    if (!res[value.author]) {
      res[value.author] = { author: value.author, likes: 0 };
      summed.push(res[value.author]);
    }
    res[value.author].likes += value.likes;
    return res;
  }, {});

  return summed.reduce((highest, author) =>
    highest.likes > author.likes ? highest : author
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogs,
};
