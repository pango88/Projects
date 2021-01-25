import React from 'react';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import BlogView from './BlogView';

const testBlog = {
  title: 'testTitle',
  author: 'reduxTesting',
  url: 'jest.com',
  likes: '0',
  id: '12312312321',
  user: { name: 'whatever' },
  comments: [{ content: 'testComment', id: '123' }],
};

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('BlogView', () => {
  test('renders blogView correctly', () => {
    // The selector isnt really needed so much but the component uses the blogs to find the correct id for the handlers
    useSelector.mockImplementation((selector) =>
      selector({
        blogs: [
          {
            title: 'testTitle',
            author: 'reduxTesting',
            url: 'jest.com',
            likes: '0',
            id: '12312312321',
            user: { name: 'whatever' },
          },
        ],
      })
    );
    const { container } = render(<BlogView blog={testBlog} />);
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('testTitle');
  });
});
