// 1. Checks if the application is working by asking the title. 
// 2. Logs in with a previous registered user. 
// 3. Creates a new appointment.
// 4. Deletes it.

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
  it('Clicks the link "login page", inserts a valid user and password and logs in.', function() {
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
    //element(by.id('fecha')).sendKeys('28-enero-2015');  Fix or add
    //element(by.id('hora')).sendKeys('Jose');            Fix or add
    element(by.id('lugar')).sendKeys('Meeting room');
    element(by.id('texto')).sendKeys('Hi there!');
  });
  it('Clicks "registrar" button to add new appointment.', function() {
    element(by.buttonText('Registrar')).click();
  });
});

describe('Deletting the appointment just added:', function() {
  it('Selects the appoinment.', function() {
    browser.driver.manage().window().maximize(); // This tests do not work unless in full screen
                                                 // because '.dropdown-toggle' is not accessible.
    element.all(by.repeater('actividad in actividades')).filter(function(elem, index) {
      return elem.getText().then(function(text) {
        return text === 'Protractor Appointment';
      });
    }).then(function(filteredElements) {
      (filteredElements[0]).click(); // It does not work if window < 790px
    });
  });
  it('Clicks on the "Opciones" link.', function() {
    element(by.css('.dropdown-toggle')).click();
  });
  it('Selects "Eliminar actividad".', function() {
    element(by.css('[href="#myModal"]')).click();
    browser.wait(function(){
      return element(by.linkText("Eliminar")).isPresent();
    })
    element(by.linkText("Eliminar")).click();
  });
});
