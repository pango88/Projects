import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

//5.16 form calls event handler it recieved as props with the right details
test('<BlogForm /> calls eventhandler it recieved with right details of newly added blog', () => {
  const createBlog = jest.fn();
  // only passing setAlert prop to avoid error as the blogForm calls it so it is not undefined
  const setAlert = jest.fn();

  const component = render(
    <BlogForm createBlog={createBlog} setAlert={setAlert} />
  );

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('#blogform');

  fireEvent.change(title, {
    target: { value: 'Testing the BlogForm' },
  });
  fireEvent.change(author, {
    target: { value: 'Tester' },
  });
  fireEvent.change(url, {
    target: { value: 'www.BlogForm.com' },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  // Not sure what is best practice, only check for one or check all of the 3 inputs? Anyways this way i am 100% sure it works, although checking only one would probably suffice
  expect(createBlog.mock.calls[0][0].title).toBe('Testing the BlogForm');
  expect(createBlog.mock.calls[0][0].author).toBe('Tester');
  expect(createBlog.mock.calls[0][0].url).toBe('www.BlogForm.com');
});
