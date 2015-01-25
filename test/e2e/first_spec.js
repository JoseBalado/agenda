var chai=require('chai');
var chaiAsPromised=require('chai-as-promised');
chai.use(chaiAsPromised);
var expect=chai.expect;

//
describe('Agenda app:', function() {
  it('Has loaded so we can get its title.', function() {
    browser.get('http://localhost:3000/');
    expect(browser.getTitle()).to.eventually.equal('Agenda');
  });
  it('Is in the login page', function() {
    expect(element(by.css('#navbarCollapse > ul:nth-child(2)')).getText()).to.eventually.equal('Log in');
  });
  it('Clicks the link "login page", inserts valid user and password and logs in.', function() {
    element(by.css('#navbarCollapse > ul:nth-child(2)')).click();
    element(by.id('inputUsername')).sendKeys('Jose');
    element(by.id('inputPassword')).sendKeys('Jose');
    element(by.buttonText('Log in')).click();
    expect(element(by.css('#navbarCollapse > ul:nth-child(2)')).getText()).to.eventually.equal('Log out');
  });
});


describe('Adding an appointment:', function() {
  it('Checks that we are logged.', function() {
    expect(element(by.css('#navbarCollapse > ul:nth-child(2)')).getText()).to.eventually.equal('Log out');
  });
  it('Clicks on the "Opciones" link.', function() {
    element(by.css('.dropdown-toggle')).click();
  });
  it('Selects "nueva actividad".', function() {
    element(by.css('[href="/nueva-actividad"]')).click();
  });
  it('Fills the fields for creating a new activity.', function() {
    element(by.id('nombre')).sendKeys('Protractor Appointment');
    //element(by.id('fecha')).sendKeys('28-enero-2015');  Fix
    //element(by.id('hora')).sendKeys('Jose');            Fix
    element(by.id('lugar')).sendKeys('Meeting room');
    element(by.id('texto')).sendKeys('Hi there!');
  });
  it('Clicks "registrar" button to add new appointment.', function() {
    element(by.buttonText('Registrar')).click();
  });
});

describe('Deletting the appointment just added:', function() {
  it('Selects the appoinment just added.', function() {
  });
});

