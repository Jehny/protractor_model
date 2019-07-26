browser.ignoreSynchronization = true;

var prop = propertiesPage('properties');
var loginPage = requirePO('loginpage');
var ajudaPage = requirePO('ajudapage');
var methods = require('../utils/baseMethods');

describe('Ajuda Page Tests.', function() {

	beforeEach(function(){
		ajudaPage.goToPage();
		// browser.driver.navigate().refresh(); //refreshes the page
	});

	it('Click Botão Ajuda', function() {
		var title = loginPage.getPageHeader();
		expect(title).toBe("Acesse o Corretor Online", "Current text does not match the expected text!");
		var textoTela = "Para acessar os negócios da Porto Seguro através do aplicativo, utilize a mesma senha usada para acessar o Corretor Online no seu computador."
		ajudaPage.clicarBotaoPorTexto('Ajuda');
		expect(ajudaPage.validateTextAjuda()).toBe(textoTela, "Texto de ajuda não está igual ao esperado.");
	});

	it('Click Botão email', function(){
		ajudaPage.goToPage();
		browser.driver.navigate().refresh();
		loginPage.getPageHeader();
		ajudaPage.clicarBotaoPorTexto('Ajuda');

		ajudaPage.clicarOpcaoAjuda('Email');
	});

	it('Click Site Azul Seguros', function(){
		ajudaPage.goToPage();
		browser.driver.navigate().refresh();
		loginPage.getPageHeader();
		ajudaPage.clicarBotaoPorTexto('Ajuda');
		browser.sleep(3000);
		ajudaPage.clickSiteAzul();
	});

	it('Click Fale Conosco', function(){
		ajudaPage.goToPage();
		browser.driver.navigate().refresh();
		loginPage.getPageHeader();
		ajudaPage.clicarBotaoPorTexto('Ajuda');

		ajudaPage.clicarOpcaoAjuda('Fale conosco');
	});

	xit('Click Botão Voltar', function(){
		ajudaPage.goToPage();
		browser.sleep(3000);
		browser.driver.navigate().refresh();

		loginPage.getPageHeader();
		ajudaPage.clicarBotaoPorTexto('Ajuda');

		ajudaPage.clicarBotaoVoltar();
	});

});
