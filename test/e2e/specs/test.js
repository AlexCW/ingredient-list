// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage


module.exports = {
  'testNavWhenLoggedOut' : function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 100)
      .assert.elementPresent('.navbar-nav')
      .assert.elementCount('.navbar-nav li', 2)
      .assert.containsText('.navbar-nav li:nth-child(2)', 'Login')
      .end();
  },
  'testLoginFailsOnInvalidDetails' : function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 100)
      .assert.elementPresent('.navbar-nav')
      .assert.elementCount('.navbar-nav li', 2)
      .click(".navbar-nav li:nth-child(2) a")
      .assert.urlContains('login')
      .login('test@test.com', 'i-will-fail')
      .pause(1000)
      .assert.visible('.login-errors')
      .assert.containsText('.login-errors', 'The credentials you have provided do not match our records.')
      .assert.urlContains('login')
      .end();
  },
  'testLoginSucceeds' : function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 100)
      .assert.elementPresent('.navbar-nav')
      .assert.elementCount('.navbar-nav li', 2)
      .click(".navbar-nav li:nth-child(2) a")
      .login('test@test.com', 'testing')
      .pause(1000)
      .assert.visible('#flash-message')
      .assert.containsText('#flash-message', 'You have successfully logged in')
      .assert.urlContains('/')
      .assert.elementCount('.navbar-nav li', 3)
      .assert.containsText('.navbar-nav li:nth-child(2)', 'Pantry')
      .assert.containsText('.navbar-nav li:nth-child(3)', 'Logout')
      .end();
  }
}
