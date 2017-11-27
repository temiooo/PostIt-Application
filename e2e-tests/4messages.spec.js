module.exports = {
  'message tests': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:8000/#/login')
      .waitForElementVisible('body', 1000)
      .setValue('input#username', 'abigail')
      .setValue('input#password', 'abigail2000')
      .click('button#login')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/#/messageboard')
      .assert.elementPresent('a#matterhorn-group')
      .click('a#matterhorn-group')
      .setValue('textarea#message', 'My first Message')
      .setValue('select#message-priority', 'Normal')
      .click('button#send')
      .pause(1000)
      .assert.elementPresent('.single-msg')
      .end();
  }
};
