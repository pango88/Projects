const listHelper = require('../utils/list_helper');

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.blogs);
    expect(result).toBe(36);
  });
});
