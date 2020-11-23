const { func } = require('prop-types');

/* eslint-disable jest/expect-expect */
describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'test',
      username: 'test',
      password: 'test'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });



  it('Login form is shown', function () {
    cy.contains('login');
  });


  //Testing the login functionality
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('test');
      cy.get('#password').type('test');
      cy.get('#login-button').click();

      cy.contains('test logged in');
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('test');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.contains('wrong username or password');
    });
  });


  //Testing the blog creation functionality

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'test' });
    });

    it('A blog can be created', function () {
      cy.contains('new note').click();
      cy.get('#title').type('test title');
      cy.get('#author').type('test author');
      cy.get('#url').type('test url');
      cy.get('#create-button').click();
      cy.contains('test title');
    });
    describe('and a blog has already been created,', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test title',
          author: 'test author',
          url: 'test url'
        });
      });

      it('it can be liked', function () {
        cy.get('#likes').should('have.text', '0');
        cy.contains('show').click();
        cy.contains('like').click();
        cy.get('#likes').should('have.text', '1');
      });

      it.only('can be deleted by the user who created it', function () {
        cy.contains('show').click();
        cy.contains('remove').click();
      });
    });
  });

});