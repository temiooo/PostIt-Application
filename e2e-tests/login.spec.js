module.exports = {
  beforeEach: (client) => {
    client
      .resizeWindow(1280, 800);
  },
  'user can\'t signin without a username and password': (client) => {
    client
      .url('http://localhost:8000/login')
      .waitForElementVisible('body')
      .click('button#login')
      .waitForElementVisible('span')
      .assert.containsText('#username-error', 'Please provide a username')
      .assert.containsText('#password-error', 'Please provide a password')
      .end();
  },
  'user can\'t signin with wrong credentials': (client) => {
    client
      .url('http://localhost:8000/login')
      .waitForElementVisible('body')
      .setValue('input#username', 'temitope')
      .setValue('input#password', 'shady100')
      .click('button#login')
      .waitForElementVisible('.toast-message')
      .assert.containsText('.toast-message', 'Invalid username or password')
      .end();
  },
  'user can signin with valid credentials': (client) => {
    client
      .url('http://localhost:8000/login')
      .waitForElementVisible('body')
      .setValue('input#username', 'temitope')
      .setValue('input#password', 'myPassword')
      .click('button#login')
      .waitForElementPresent('.welcome-page')
      .assert.elementPresent('a#logout-button')
      .assert.urlEquals('http://localhost:8000/messageboard')
      .end();
  },
  'user can\'t access messageboard without being authenticated': (client) => {
    client
      .url('http://localhost:8000/messageboard')
      .assert.urlEquals('http://localhost:8000/login')
      .end();
  }
};
