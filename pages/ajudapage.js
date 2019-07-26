//"use strict";

var prop = propertiesPage('properties');
var EC = protractor.ExpectedConditions;

var AjudaPage = function() {
  var titleAjuda = element(by.css('.toolbar-title'));
  var textoAjuda = element(by.css('.ps-text p'));
  var classButton = element.all(by.css('.button-inner'));
  var classOpcoesAjuda = element.all(by.css('.label .label-md'));
  var email = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-ajuda/ion-content/div[2]/ion-grid/ion-row/div/ion-card/ion-card-content/ion-list/button[1]/div[1]/div/ion-label'));
  var siteAzul = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-ajuda/ion-content/div[2]/ion-grid/ion-row/div/ion-card/ion-card-content/ion-list/button[2]'));
  var faleConosco = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-ajuda/ion-content/div[2]/ion-grid/ion-row/div/ion-card/ion-card-content/ion-list/button[3]'));
  var btnVoltar = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-ajuda/ion-header/ion-navbar/button/span'));

  this.goToPage = function() {
    browser.waitForAngularEnabled(false);
    browser.get(prop.getUrl() + 'login');
  };

  this.validateTextAjuda = function() {
    browser.wait(EC.visibilityOf(titleAjuda), prop.getWaitTime());
    return textoAjuda.getText();
  };

  this.clickEmail = function() {
    browser.wait(EC.visibilityOf(titleAjuda), prop.getWaitTime());
    email.click();
  };

  this.clickSiteAzul = function() {
    browser.wait(EC.visibilityOf(titleAjuda), prop.getWaitTime());
    siteAzul.click();
  };

  this.clickFaleConosco = function() {
    browser.wait(EC.visibilityOf(titleAjuda), prop.getWaitTime());
    faleConosco.click();
  };

  this.clicarBotaoPorTexto = function(textoBotao) {

    classButton.filter(function(element) {
        return element.getText().then(function (text) {
          return text === textoBotao;
        });
      }).click();
  };

  this.clicarOpcaoAjuda = function(textoOpcao) {

    classOpcoesAjuda.filter(function(element) {
        return element.getText().then(function (text) {
          return text === textoOpcao;
        });
      }).click();
  };

  this.clicarBotaoVoltar = function(){
    browser.wait(EC.visibilityOf(titleAjuda), prop.getWaitTime());
    btnVoltar.click();
  };

};

module.exports = new AjudaPage();
