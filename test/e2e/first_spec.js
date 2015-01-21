var chai=require('chai');
var chaiAsPromised=require('chai-as-promised');
chai.use(chaiAsPromised);
var expect=chai.expect;

//
describe('Agenda app', function() {
  it('has loaded so we can get its title', function() {
    browser.get('http://localhost:3000/');
    expect(browser.getTitle()).to.eventually.equal('Agenda');
  });
  it('is in the login page', function() {
    expect(element(by.css('#navbarCollapse ul:nth-child(2)')).getText()).to.eventually.equal('Log in');
  });
  it('clicks the link "login page" inserts valid user and password and logs into session', function() {
    element(by.css('#navbarCollapse ul:nth-child(2)')).click();
    element(by.id('inputUsername')).sendKeys('Jose');
    element(by.id('inputPassword')).sendKeys('Jose');
    element(by.buttonText('Log in')).click();
    expect(element(by.css('#navbarCollapse > ul:nth-child(2)')).getText()).to.eventually.equal('Log out');
  });
});
