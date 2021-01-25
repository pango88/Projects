const listHelper = require('../utils/list_helper');

test('author with blogpost with highest amount of likes ', () => {
  const result = listHelper.mostLikes(listHelper.blogs);
  expect(result).toStrictEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
});
