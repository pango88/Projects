const listHelper = require('../utils/list_helper');

describe('author with most amount of blogs', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.mostBlogs(listHelper.blogs);
    expect(result).toStrictEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});
