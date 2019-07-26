browser.ignoreSynchronization = true;

var prop = propertiesPage('properties');
var loginPage = requirePO('loginpage');
var homePage = requirePO('homepage');
var user = prop.getUser();
var methods = require('../utils/baseMethods');

describe('Login Page Tests.', function() {

	beforeEach(function(){
		loginPage.goToPage();
		browser.driver.navigate().refresh(); //refreshes the page
	});

	it('Validates login page content.', function() {
		var title = loginPage.getPageHeader();
		expect(title).toBe("Acesse o Corretor Online", "Current text does not match the expected text!");
	});

	it('Validates invalid CPFs', function() {
		loginPage.goToPage();
		loginPage.enterCpf('46456888');
		loginPage.waitForCPFValidation();
		methods.captureScreenshot("CPF-invalido");
		expect(loginPage.getAlertSubTitle()).toBe("CPF Inválido.", "Current text does not match the expected text.");
		// loginPage.closeAlert();
	});

	xit('Validates unauthorized access attempt', function() {
		loginPage.goToPage();
		loginPage.enterCpf('00012345601');
		loginPage.waitForCPFValidation();
		expect(loginPage.getAlertSubTitle()).toBe("CPF sem acesso.", "Current text does not match the expected text.");
		methods.captureScreenshot("CPF-sem-acesso");
		// loginPage.closeAlert();
	});

	it('Validates login success', function() {
		loginPage.goToPage();
		loginPage.enterCpf(user.cpf);
		loginPage.selectSusep(user.susep);
		loginPage.enterPassword(user.password);
		loginPage.clickLoginBtn();
		browser.sleep(2000);
		expect(homePage.getUserName()).toBe(user.username, "User name does not match the authenticated user name.");
		browser.sleep(prop.getLongerWaitTime());
	});

});
