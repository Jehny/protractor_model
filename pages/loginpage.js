//"use strict";

var prop = propertiesPage('properties');
var EC = protractor.ExpectedConditions;
var homePage = requirePO('homepage');

var LoginPage = function() {
  var cpfInput = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-login/ion-content/div[2]/div/form/ion-list/cpf-cnpj-input/ion-item/div[1]/div/ion-input/input'));
  var susepInput = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-login/ion-content/div[2]/div/form/ion-list/ion-item[1]/div[1]/div/ion-input'));
  var susepSearchInput = element(by.xpath('(.//*[normalize-space(text()) and normalize-space(.)=\'Selecione a SUSEP\'])[1]/following::input[1]'));
  var susepSearchResultFirstItem = element(by.xpath('(.//*[normalize-space(text()) and normalize-space(.)=\'Cancel\'])[1]/following::div[5]'));
  var passwordInput = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-login/ion-content/div[2]/div/form/ion-list/ion-item[2]/div[1]/div/ion-input/input'));
  var susepList = element(by.className('list-suseps'));
  var loginBtn = element(by.xpath('(.//*[normalize-space(text()) and normalize-space(.)=\'Senha\'])[1]/following::span[1]'));
  var pageHeader = element(by.className('title'));

  var alertModal = element(by.className('alert-head'));
  var alertBtn = element(by.xpath('/html/body/ion-app/ion-alert/div/div[3]/button/span'));
  var alertSubTitle = element(by.className('alert-sub-title'));
  var alertMessage = element(by.className('alert-message'));

  this.goToPage = function() {
    browser.waitForAngularEnabled(false);
    browser.get(prop.getUrl() + 'login');
  };

  this.enterCpf = function(cpf) {
    browser.wait(EC.visibilityOf(cpfInput), prop.getWaitTime());
    cpfInput.click();

    /** Clears input field, if not empty **/
    cpfInput.clear(); //TODO: not working
    browser.actions().doubleClick(cpfInput).perform(); //select all input content
    cpfInput.sendKeys(protractor.Key.DELETE);
    browser.actions().doubleClick(cpfInput).perform(); //select all input content
    cpfInput.sendKeys(protractor.Key.DELETE);
    /** End **/
    
    cpfInput.sendKeys(cpf);
  };

  this.selectSusep = function(susep) {
    susepInput.click();
    browser.wait(EC.visibilityOf(susepList), prop.getLongerWaitTime());
    browser.sleep(prop.getSleepTime()); //TODO: alterar para browser.wait
    susepSearchInput.click();
    susepSearchInput.clear();
    susepSearchInput.sendKeys(susep);
    browser.wait(EC.visibilityOf(susepSearchResultFirstItem), prop.getWaitTime());
    browser.sleep(prop.getSleepTime()); //TODO: alterar para browser.wait
    susepSearchResultFirstItem.click();
  };

  this.enterPassword = function(password) {
    browser.wait(EC.visibilityOf(passwordInput), prop.getWaitTime());
    browser.sleep(prop.getSleepTime()); //TODO: alterar para browser.wait
    passwordInput.click();
    passwordInput.clear();
    passwordInput.sendKeys(password);
  };

  this.clickLoginBtn = function() {
    loginBtn.click();
    browser.sleep(prop.getSleepTime()); //TODO: alterar para browser.wait
  };

  this.getPageHeader = function() {
    browser.wait(EC.visibilityOf(pageHeader), prop.getWaitTime());
    return pageHeader.getText();
  };

  this.waitForCPFValidation = function() {
    susepInput.click();
    browser.wait(EC.visibilityOf(alertModal), prop.getWaitTime());
  };

  this.closeAlert = function() {

    browser.wait(EC.visibilityOf(alertModal), prop.getWaitTime());
    // browser.sleep(2000);
    alertBtn.click();
    browser.sleep(prop.getSleepTime()); //TODO: alterar para browser.wait
  };

  this.getAlertSubTitle = function() {
    browser.wait(EC.visibilityOf(alertSubTitle), prop.getWaitTime());
    return alertSubTitle.getText();
  };

  this.getAlertMessage = function() {
    browser.wait(EC.visibilityOf(alertMessage), prop.getWaitTime());
    return alertMessage.getText();
  };

  this.login = function(cpf, susep, password){
    this.enterCpf(cpf);
    this.selectSusep(susep);
    this.enterPassword(password);
    this.clickLoginBtn();
    browser.wait(EC.visibilityOf(homePage.getSusep()), prop.getLongerWaitTime());
  };

};

module.exports = new LoginPage();
