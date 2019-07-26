//"use strict";

var prop = propertiesPage('properties');
var EC = protractor.ExpectedConditions;

var CorretorPage = function() {
  var titleCorretor = element(by.xpath('//*[@id="banner"]/div[1]/h1'));
  var linkNovoCorretor = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-login/ion-footer/a'));
  var textoCorretor = element(by.xpath('//*[@id="banner"]/div[1]/h2'));
  var classButton = element.all(by.css('.button-inner'));
  var pageHeader = element(by.className('title'));

  this.goToPage = function() {
    browser.waitForAngularEnabled(false);
    browser.get(prop.getUrl() + 'login');
  };

  this.validateTextCorretor = function() {
    browser.wait(EC.visibilityOf(titleCorretor), prop.getWaitTime());
    return textoCorretor.getText();
  };

  this.clicarBotaoPorTexto = function(textoBotao) {

    classButton.filter(function(element) {
        return element.getText().then(function (text) {
          return text === textoBotao;
        });
      }).click();
  };

  this.clicarBotaoCorretor = function(){
     browser.wait(EC.visibilityOf(pageHeader), prop.getWaitTime());
    linkNovoCorretor.click();
  };

};

module.exports = new CorretorPage();
