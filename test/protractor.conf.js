// An example configuration file.
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['e2e/first_spec.js'],

  framework: 'mocha',

  // Options to be passed to mocha
  mochaOpts: {
    reporter: 'spec',
    slow: 3000
  }
};
