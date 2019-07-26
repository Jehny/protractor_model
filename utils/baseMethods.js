// ------------------------------------------------
// DEPENDÊNCIAS
// ------------------------------------------------
var fs = require('../node_modules/fs-extra'); //para escrever em arquivo
var prop = require('../utils/properties');
var settings = prop.getSettings();

module.exports = {

//**************************************************

    //Salva a tela
    captureScreenshot : function (filename) {
        var folder = settings.reportsPath + settings.reportsFolderName + '/' + settings.screenshotsFolderName;

        browser.getCapabilities().then(function (caps) {
          var browserName = caps.get('browserName');

          browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream(folder + '/' + browserName + '-' + filename + '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
          });
        });
    },

    inserirData : function(){
        var today = new Date();
        var d = today.getDate();
        var m = today.getMonth()+1;
        var y = today.getFullYear();
        var dataHora = d+"-"+m+"-"+y;

        return dataHora;
    },

     inserirDataHoraSegundos : function(){
        var today = new Date();
        var d = today.getDate();
        var m = today.getMonth()+1;
        var y = today.getFullYear();
        var h = today.getHours();
        var min = today.getMinutes();
        var seg = today.getSeconds();
        var mili = today.getMilliseconds();
        var dataHora = d+"-"+m+"-"+y+"-"+h+"-"+min+"-"+seg;

        return dataHora;
    },

    // Seleciona uma opção em um select sem um repetidor ou ng-option, apenas pela tag option
    selecionarOpcaoByOption : function (locator, texto){
        locator.all(by.tagName('option')).filter(function(index) {
            return index.getText().then(function(text){
                return text === texto;
            });
        }).first().click();
        browser.sleep(2000);
    },

    //Seleciona um opção em um select a partir de um repetidor
    selecionarOpcaoComRepetidor : function (repetidor, texto){
        repetidor.filter(function(elem, index) {
          return elem.getText().then(function(text) {
            return text === texto;
          });
        }).first().click();
        browser.sleep(2000);
    },

    verificarMensagem : function(locator, mensagem){
         //Verifica se a questão foi criada com suscesso
        var EC = protractor.ExpectedConditions;
        browser.sleep(2000);
        browser.wait(EC.visibilityOf(locator), 5000);
        expect(locator.getText()).toEqual(mensagem);
    },

    // Rola a tela para o topo para em caso de haver abas a serem clicadas.
    scroll : function(){
        browser.executeScript('window.scrollTo(0,200);').then(function() {
            browser.sleep(3000);
        }).then(function() {
            browser.executeScript('window.scrollTo(0,0);');
        });
    }

};
