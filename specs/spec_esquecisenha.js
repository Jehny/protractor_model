browser.ignoreSynchronization = true;

var prop = propertiesPage('properties');
var loginPage = requirePO('loginpage');
var esqueciSenhaPage = requirePO('esquecisenhapage');
var methods = require('../utils/baseMethods');

describe('Esqueci a Senha Page Tests.', function() {

	beforeEach(function(){
		esqueciSenhaPage.goToPage();
		// browser.driver.navigate().refresh(); //refreshes the page
	});

	it('Click esqueci a senha', function() {
		var title = loginPage.getPageHeader();
		esqueciSenhaPage.clicarBotaoPorTexto('Esqueceu a senha?');
		browser.sleep(3000);
	});

});
