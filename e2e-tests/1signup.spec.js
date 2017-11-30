module.exports = {
  beforeEach: (client) => {
    client
      .resizeWindow(1280, 800);
  },
  'user can\'t signup with invalid credentials': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body')
      .setValue('input#email', 'temitope')
      .setValue('input#username', 'te')
      .setValue('input#password', 'myPassword')
      .setValue('input#confirmpassword', 'mypassword')
      .click('button#create-account')
      .waitForElementVisible('span')
      .assert.containsText('#email-error', 'Email is Invalid')
      .assert.containsText('#username-error', 'Username is too short'
      + ' (min of 5 characters).')
      .assert.containsText('#confirmpassword-error', 'Passwords do not match')
      .end();
  },
  'user can signup successfully with valid credentials':
    (client) => {
      client
        .url('http://localhost:8000')
        .waitForElementVisible('body')
        .setValue('input#email', 'temitope@gmail.com')
        .setValue('input#username', 'temitope')
        .setValue('input#password', 'myPassword')
        .setValue('input#confirmpassword', 'myPassword')
        .click('button#create-account')
        .waitForElementPresent('.welcome-page')
        .assert.urlEquals('http://localhost:8000/#/messageboard')
        .end();
    },
  'user can logout after signing up': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body')
      .setValue('input#email', 'abigail@gmail.com')
      .setValue('input#username', 'abigail')
      .setValue('input#password', 'abigail2000')
      .setValue('input#confirmpassword', 'abigail2000')
      .click('button#create-account')
      .waitForElementPresent('.welcome-page')
      .assert.urlEquals('http://localhost:8000/#/messageboard')
      .click('a#logout-button')
      .assert.urlEquals('http://localhost:8000/#/login')
      .end();
  },
  'user can\'t signup with already existing email': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body')
      .setValue('input#email', 'temitope@gmail.com')
      .setValue('input#username', 'temmy')
      .setValue('input#password', 'myPassword')
      .setValue('input#confirmpassword', 'myPassword')
      .click('button#create-account')
      .waitForElementVisible('.toast-message')
      .assert.containsText('.toast-message', 'Email taken already.'
      + ' Please use another one')
      .end();
  },
  'user can\'t signup with already existing username': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body')
      .setValue('input#email', 'temmy@gmail.com')
      .setValue('input#username', 'temitope')
      .setValue('input#password', 'myPassword')
      .setValue('input#confirmpassword', 'myPassword')
      .click('button#create-account')
      .waitForElementVisible('.toast-message')
      .assert.containsText('.toast-message', 'Username taken already.'
      + ' Please use another one')
      .end();
  }
};
