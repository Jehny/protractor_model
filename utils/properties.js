//var stream;

//Variáveis de ambiente
module.exports = {

	param: {
		baseUrl : "http://localhost:8100/#/",
		sleepTime : 3000, //sleep time in milliseconds
		waitTime : 40000, //wait time in milliseconds
		longerWaitTime : 55000 //wait time in milliseconds
	},

	settings: {
		overwriteReports : false, //if true, overwrites previous report results folder
		screenMaximize : false,
		screenWidth : 375,
		screenHeight : 667,
		reportsPath : '../reports/',
		reportsFolderName : 'tests-results',
		screenshotsFolderName : 'screenshots',
	},

	user: {
		// cpf : "111.444.777-35",
		cpf: "111.444.777-35",
		susep : "S5005J",
		// susep : "C1192J",
		password : "trindade123",
		username : "Edson Oliveira",
		corretora : "CLARA ROSEMBLATT CORRETORA DE SEGS LTDA"
	},

	getSettings : function() {
	 	return this.settings;
	},

	getUser : function() {
	 	return this.user;
	},

	getParam : function() {
	 	return this.param;
	},

	getUrl : function() {
		var prop = this.param;
		return prop.baseUrl;
	},

	getSleepTime : function() {
		var prop = this.param;
		return prop.sleepTime;
	},

	getWaitTime : function() {
		var prop = this.param;
		return prop.waitTime;
	},

	getLongerWaitTime : function() {
		var prop = this.param;
		return prop.longerWaitTime;
	},

};
