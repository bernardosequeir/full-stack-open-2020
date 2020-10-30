import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('form works', () => {
  const createBlog = jest.fn();
  const component = render(
    <BlogForm createBlog={createBlog} />
  );

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');
  fireEvent.change(title, {
    target: { value: 'test post' }
  });
  fireEvent.change(author, {
    target: { value: 'test author' }
  });
  fireEvent.change(url, {
    target: { value: 'test url' }
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('test post');
  expect(createBlog.mock.calls[0][0].author).toBe('test author');
  expect(createBlog.mock.calls[0][0].url).toBe('test url');
});