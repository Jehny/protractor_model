browser.ignoreSynchronization = true;

var prop = propertiesPage('properties');
var loginPage = requirePO('loginpage');
var corretorPage = requirePO('corretorpage');
var methods = require('../utils/baseMethods');

describe('Corretor Page Tests.', function() {

	beforeEach(function(){
		corretorPage.goToPage();
		// browser.driver.navigate().refresh(); //refreshes the page
	});

	it('Click Link Novo Corretor', function() {
		var title = loginPage.getPageHeader();
		expect(title).toBe("Acesse o Corretor Online", "Current text does not match the expected text!");
		var textoTela = 'Faça parte da nossa equipe de venda e suporte aos produtos de seguros.'
		corretorPage.clicarBotaoCorretor();
		expect(corretorPage.validateTextCorretor()).toBe(textoTela, "Texto de ajuda não está igual ao esperado.");
	});

});
