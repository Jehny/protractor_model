//"use strict";

var prop = propertiesPage('properties');
var EC = protractor.ExpectedConditions;

var EsqueciASenhaPage = function() {
  var titleEsqueciAsenha = element(by.xpath('//*[@id="banner"]/div[1]/h1'));
  var classButton = element.all(by.css('.button-inner'));
  var pageHeader = element(by.className('title'));

  this.goToPage = function() {
    browser.waitForAngularEnabled(false);
    browser.get(prop.getUrl() + 'login');
  };

  this.clicarBotaoPorTexto = function(textoBotao) {

    classButton.filter(function(element) {
        return element.getText().then(function (text) {
          return text === textoBotao;
        });
      }).click();
  };

  this.clicarBotaoEsqueciSenha = function(){
     browser.wait(EC.visibilityOf(pageHeader), prop.getWaitTime());
    linkNovoCorretor.click();
  };

};

module.exports = new EsqueciASenhaPage();
