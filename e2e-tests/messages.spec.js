module.exports = {
  'user can post a message to a group': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:8000/login')
      .waitForElementVisible('body', 1000)
      .setValue('input#username', 'abigail')
      .setValue('input#password', 'abigail2000')
      .click('button#login')
      .waitForElementVisible('.welcome-page')
      .assert.urlEquals('http://localhost:8000/messageboard')
      .waitForElementVisible('a#matterhorn-group')
      .click('a#matterhorn-group')
      .setValue('textarea#message', 'My first Message')
      .setValue('select#message-priority', 'Normal')
      .click('button#send-message')
      .waitForElementVisible('.single-msg')
      .assert.containsText('.msg-heading', 'abigail')
      .assert.containsText('.single-msg div > :nth-child(3)',
        'My first Message')
      .end();
  }
};
