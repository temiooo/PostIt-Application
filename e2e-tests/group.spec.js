module.exports = {
  beforeEach: (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:8000/login')
      .waitForElementVisible('body')
      .setValue('input#username', 'abigail')
      .setValue('input#password', 'abigail2000')
      .click('button#login');
  },
  'user can create a group': (client) => {
    client
      .url('http://localhost:8000/messageboard')
      .waitForElementPresent('.welcome-page')
      .click('a.modal-trigger')
      .setValue('input#name', 'ade')
      .click('.modal-footer')
      .assert.containsText('span#name-error', 'Group Name is too short'
      + ' (min of 5 characters')
      .clearValue('input#name')
      .setValue('input#name', 'Matterhorn')
      .click('button#save-group')
      .pause(1000)
      .assert.elementPresent('a#matterhorn')
      .assert.containsText('a#matterhorn', 'Matterhorn')
      .end();
  },
  'user can edit a group name': (client) => {
    client
      .url('http://localhost:8000/messageboard')
      .waitForElementVisible('a#matterhorn')
      .click('a#matterhorn')
      .assert.urlContains('http://localhost:8000/messageboard/group')
      .click('a#edit-group')
      .waitForElementVisible('.modal-content')
      .setValue('input#name', ' Group')
      .click('button#save-group')
      .waitForElementVisible('.toast-message')
      .assert.containsText('.toast-message', 'Group updated successfully')
      .assert.containsText('a#matterhorn-group', 'Matterhorn Group')
      .end();
  },
  'user can add another user to a group': (client) => {
    client
      .url('http://localhost:8000/messageboard')
      .waitForElementVisible('a#matterhorn-group')
      .click('a#matterhorn-group')
      .click('a#add-user')
      .assert.urlContains('members')
      .assert.containsText('.group-members ul > :first-child', 'abigail')
      .setValue('input#search', 'temi')
      .click('button#search')
      .waitForElementVisible('ul#search-results')
      .click('a.non-members')
      .waitForElementVisible('.toast-message')
      .assert.containsText('.toast-message', 'User Added Successfully')
      .assert.containsText('.group-members ul > :nth-child(2)', 'temitope')
      .end();
  }
};
