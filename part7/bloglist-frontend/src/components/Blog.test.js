import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import Blog from './Blog';

const blog ={
  title : 'test title',
  author : 'test author',
  likes: 999,
  url: 'llll',
  user: {
    name: 'test name',
    userName: 'test userName'
  }
};

const user = {
  username: 'test'
};
describe('The blog component before being clicked:', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user}/>
    );
  });


  test('renders only the title and author', () => {
    expect(component.container).toHaveTextContent(`${blog.title} - ${blog.author}`);
  });

  test('does not render url',() => {
    expect(component.getByTestId('url')).not.toBeVisible();
  });
  test('does not render likes',() => {
    expect(component.getByTestId('likes')).not.toBeVisible();
  });
  test('does not render username',() => {
    expect(component.getByTestId('username')).not.toBeVisible();
  });
});

describe('The blog component after being clicked:', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user}/>
    );
    const button = component.getByText('show');
    fireEvent.click(button);
  });

  test('renders url',() => {
    expect(component.getByTestId('url')).toBeVisible();
  });
  test('renders likes',() => {
    expect(component.getByTestId('likes')).toBeVisible();
  });
  test('renders username',() => {
    expect(component.getByTestId('username')).toBeVisible();
  });

});
describe('Like button', () => {
  let component;
  let mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} likePost={mockHandler}/>
    );
  });

  test('if it\'s pressed twice, both instances are recorded', () => {
    const button = component.getByTestId('likeButton');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});