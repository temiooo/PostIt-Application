module.exports = {
  'login tests': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:8000/#/login')
      .waitForElementVisible('body', 1000)
      .click('button#login')
      .pause(1000)
      .waitForElementVisible('.toast-message', 2000)
      .assert.containsText('.toast-message', 'Please provide a username'
      + ' and password')
      .pause(5000)
      .setValue('input#username', 'shade')
      .click('button#login')
      .pause(1000)
      .waitForElementVisible('.toast-message', 2000)
      .assert.containsText('.toast-message', 'Please provide a username'
      + ' and password')
      .pause(5000)
      .setValue('input#password', 'shady100')
      .click('button#login')
      .pause(2000)
      .assert.containsText('.toast-message', 'Password is incorrect')
      .pause(4000)
      .clearValue('input#password')
      .setValue('input#password', 'shadyshade')
      .click('button#login')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/#/messageboard')
      .pause(1000)
      .click('a#logout-button')
      .assert.urlEquals('http://localhost:8000/#/login')
      .pause(1000)
      .url('http://localhost:8000/#/messageboard')
      .assert.urlEquals('http://localhost:8000/#/login')
      .end();
  }
};
