describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'eee',
      username: 'eee',
      password: 'eee',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('form').contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('eee');
      cy.get('#password').type('eee');
      cy.get('#loginBtn').click();

      cy.contains('eee logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('eee');
      cy.get('#password').type('wrong');
      cy.get('#loginBtn').click();

      cy.get('.alert').should('contain', 'Incorrect username/password');
      cy.get('html').should('not.contain', 'eee logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'eee', password: 'eee' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('Testing the blogs');
      cy.get('#author').type('Cypress');
      cy.get('#url').type('CypressTesting.now');
      cy.contains('create').click();

      cy.get('html')
        .should('contain', 'Testing the blogs')
        .and('contain', 'Cypress')
        .and('contain', 'CypressTesting.now');
    });

    it('A blog can be liked', function () {
      cy.createBlog({
        title: 'My first like',
        author: 'me',
        url: 'gimelikes.org',
        likes: 0,
      });

      cy.contains('view').click();
      cy.get('#like').click();

      cy.get('#likes').contains('1');
    });

    it('A Blog can be deleted', function () {
      cy.createBlog({
        title: 'soonToBeDeleted',
        author: 'me',
        url: 'deletion.org',
        likes: 0,
      });
      cy.contains('view').click();
      cy.contains('remove').click();
      cy.get('html').should('not.contain', 'soonToBeDeleted');
    });

    it('Blogs ordered by highest likes', function () {
      cy.createBlog({
        title: 'Blog1',
        author: 'one',
        url: 'one.org',
        likes: 5,
      });
      cy.createBlog({
        title: 'Blog2',
        author: 'two',
        url: 'two.org',
        likes: 3,
      });
      cy.createBlog({
        title: 'Blog3',
        author: 'three',
        url: 'three.org',
        likes: 0,
      });

      // I made this very simple but i believe it works fine, so what i did was just a small change i App.js where i give each <Blog />s parent div the id of each loop in the map. And if it is sorted correctly then the blog with the first like should be at the first loop in the .map and therefore it should have the id #0.
      cy.get('#0').should('contain', 'Blog1');
      cy.get('#1').should('contain', 'Blog2');
      cy.get('#2').should('contain', 'Blog3');
    });
  });
});
