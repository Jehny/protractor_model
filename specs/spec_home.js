browser.ignoreSynchronization=true;

var prop = propertiesPage('properties');
var homePage = requirePO('homepage');
//var homePage = require('./pages/homepage');
var loginPage = requirePO('loginpage');
var user = prop.getUser();
var EC = protractor.ExpectedConditions;

describe('Home Page Tests', function() {


	it('Validates home page content', function() {
		loginPage.goToPage();
		// loginPage.login(user.cpf, user.susep, user.password);

		expect(homePage.getSusep()).toBe("SUSEP " + user.susep, "Current SUSEP does not match the expected value!");
		expect(homePage.getCorretora()).toBe(user.corretora, "Current corretora does not match the expected value!");

		homePage.compareTextTitleCards("Parcelas");
		homePage.compareTextTitleCards("vencidas");

		homePage.compareTextTitleCards("Propostas");
		homePage.compareTextTitleCards("pendentes");

		homePage.compareTextTitleCards("Apólices");
		homePage.compareTextTitleCards("à vencer");

	});

	it('Access Propostas pendentes', function() {

		var numberCard = homePage.getNumberCardPropostas();
		homePage.clickCards("Propostas");
		browser.sleep(3000);
		var titleResultadoPesquisa = element(by.css('body > ion-app > ng-component > ion-nav > page-consult-proposal > ion-header > col-header > ion-navbar > div.toolbar-content.toolbar-content-md > ion-title > div'));
		var titlePesquisa = "Resultado da consulta"; 
		expect(homePage.getTitlePageConsulta(titleResultadoPesquisa)).toBe(titlePesquisa, "Resultado da pesquisa não encontrado!");
		browser.sleep(3000);
		var qntProposta = element(by.id('proposal-count'));
		browser.wait(EC.visibilityOf(qntProposta), prop.getLongerWaitTime());
		// expect(numberCard).toBe(qntProposta.getText(), "Quantidade de propostas não são iguais!");
		
	});

	it('Access Apólices vencidas', function() {
		loginPage.goToPage();
		var numberCard = homePage.getNumberCardApolices();

		homePage.clickCards("Apólices");
		var titleResultadoPesquisaApolices = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-consult-policies/ion-header/col-header/ion-navbar/div[2]/ion-title/div'));
		var titlePesquisa = "Resultado da consulta"; 
		browser.sleep(2000);
		expect(homePage.getTitlePageConsulta(titleResultadoPesquisaApolices)).toBe(titlePesquisa, "Resultado da pesquisa não encontrado!");
		
		var qntApolice = element(by.id('policie-count'));
		browser.wait(EC.visibilityOf(qntApolice), prop.getLongerWaitTime());
		expect(numberCard).toBe(qntApolice.getText(), "Quantidade de apólices não são iguais!");

	});

	xit('Do a search', function(){
		homePage.clickNovaConsulta();
		homePage.clickStatus('Emitida');
		homePage.clickPesquisar();
	});

	it('Access Parcelas vencidas', function() {
		loginPage.goToPage();
    	var numberCard = homePage.getNumberCardParcelas();

		homePage.clickCards("Parcelas");
		var titleResultadoPesquisaParcelas = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-portion-list/ion-header/col-header/ion-navbar/div[2]/ion-title/div'));
		var titlePesquisa = "Resultado da consulta"; 
		browser.sleep(2000);
		expect(homePage.getTitlePageConsulta(titleResultadoPesquisaParcelas)).toBe(titlePesquisa, "Resultado da pesquisa não encontrado!");
		browser.sleep(5000);
		
		var qntParcela = element(by.id('cobranca-count'));
		browser.wait(EC.visibilityOf(qntParcela), prop.getLongerWaitTime());
    	expect(numberCard).toBe(qntParcela.getText(), "Quantidade de parcelas não está igual!");
		
	});
	

});
