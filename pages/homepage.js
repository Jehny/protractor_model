//"use strict";

var prop = propertiesPage('properties');
var EC = protractor.ExpectedConditions;

var HomePage = function() {
  var nameLabel = element(by.className('ps-name'));
  var susepLabel = element(by.className('ps-susep'));
  var corretoraLabel = element(by.className('ps-corretora'));
  var susepSearchResultFirstItem = element(by.xpath('(.//*[normalize-space(text()) and normalize-space(.)=\'Cancel\'])[1]/following::div[5]'));
  var passwordInput = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-login/ion-content/div[2]/div/form/ion-list/ion-item[2]/div[1]/div/ion-input/input'));
  var susepList = element(by.className('list-suseps'));

  var alertModal = element(by.className('alert-head'));
  var alertBtn = element(by.className('alert-button'));
  var alertTitle = element(by.className('alert-sub-title'));
  var alertSubTitle = element(by.className('alert-sub-title'));

  var cardClass = element.all(by.css('.card-title'));
  
  var qtdPropostas = element(by.css('.ps-counter'));
  
  var novaConsulta = element(by.className('new-search'));
  var selectStatus = element(by.xpath('//*[@id="select-8-0"]/span'));
  var alertOptionStatus = element(by.xpath('//*[@id="alert-hdr-1"]'));
  var optionsStatus = element.all(by.css('.alert-radio-label'));
  var buttonOKAlertStatus = element(by.xpath('/html/body/ion-app/ion-alert/div/div[4]/button[2]/span'));
  var buttonPesquisar = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-consult-proposal/ion-content/div[2]/div/form/ion-item/div[1]/button/span'));

  var numberCardPropostas = element(by.id('propostas'));
  var numberCardParcelas = element(by.id('parcelas'));
  var numberCardApolices = element(by.id("apolices"));

  this.goToPage = function() {
    browser.restart();
    browser.waitForAngularEnabled(false);
    browser.get(prop.getUrl() + 'home'); //TODO: avaliar necessidade de trocar para 'login'
  };

  this.getUserName = function() {
    browser.wait(EC.visibilityOf(nameLabel), prop.getWaitTime());
    return nameLabel.getText();
  };

  this.getSusep = function() {
    browser.wait(EC.visibilityOf(susepLabel), prop.getWaitTime());
    return susepLabel.getText();
  };

  this.getCorretora = function() {
    browser.wait(EC.visibilityOf(corretoraLabel), prop.getWaitTime());
    return corretoraLabel.getText();
  };

  this.closeAlert = function() {
    browser.wait(EC.visibilityOf(alertModal), prop.getWaitTime());
    alertBtn.click();
  };

  this.getAlertTitle = function() {
    browser.wait(EC.visibilityOf(alertTitle), prop.getWaitTime());
    return alertTitle.getText();
  };

  this.getAlertSubTitle = function() {
    browser.wait(EC.visibilityOf(alertSubTitle), prop.getWaitTime());
    return alertSubTitle.getText();
  };

  this.getAlertMessage = function() {
    browser.wait(EC.visibilityOf(alertMessage), prop.getWaitTime());
    return alertMessage.getText();
  };

  this.compareTextTitleCards = function(palavra){
    var classMenu = element(by.css('.card-container'));
    browser.wait(EC.visibilityOf(numberCardPropostas), prop.getLongerWaitTime());
    // browser.sleep(prop.getSleepTime());

    $$('.card-title').filter(function(elem){
      return elem.getText().then(function(text){

        return text === palavra;
      
     });
    }).first().getText();
  };


  this.getNumberCardPropostas = function(){
    browser.sleep(prop.getSleepTime());
    browser.wait(EC.visibilityOf(numberCardPropostas), prop.getLongerWaitTime());
    return numberCardPropostas.getText();
  };

  this.getNumberCardApolices = function(){
    browser.sleep(prop.getSleepTime());
    browser.wait(EC.visibilityOf(numberCardApolices), prop.getLongerWaitTime());
    return numberCardApolices.getText();
  };

  this.getNumberCardParcelas = function(){
    browser.wait(EC.visibilityOf(numberCardParcelas), prop.getLongerWaitTime());
    var num = numberCardParcelas.getText();
    return num;
  };

  this.clickCards = function(palavra){
    browser.sleep(prop.getSleepTime());
    var classMenu = element(by.css('.ps-option-menu'));
    browser.wait(EC.visibilityOf(classMenu), prop.getLongerWaitTime());
    browser.sleep(prop.getSleepTime());
    cardClass.filter(function(elem){
      return elem.getText().then(function(text){
          return text === palavra;
      });
    }).first().click();
  };

  this.getTitlePageConsulta = function(elemento){
    browser.sleep(prop.getSleepTime());
    return elemento.getText();
  };

  this.getQuantidadePropostas = function(){
    browser.sleep(prop.getSleepTime());
    return qtdPropostas.getText();
  };

  this.clickNovaConsulta = function(){
    browser.wait(EC.visibilityOf(novaConsulta), prop.getWaitTime());
    novaConsulta.click();
  };

  this.clickStatus = function(status){
    browser.sleep(3000);
    selectStatus.click();
    browser.wait(EC.visibilityOf(alertOptionStatus), prop.getWaitTime());
    optionsStatus.filter(function(elem){
    return elem.getText().then(function(text){
        return text === status;
    });
    }).first().click();
    browser.wait(EC.visibilityOf(alertOptionStatus), prop.getWaitTime());
    buttonOKAlertStatus.click();
  };

  this.clickPesquisar = function(){
    buttonPesquisar.click();
  };

};

module.exports = new HomePage();
