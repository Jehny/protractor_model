var baseMethods = require('../utils/baseMethods');
var prop = require('../utils/properties');
var settings = prop.getSettings();

exports.config = {

  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',
  __dirname:'protractor/config',
  __filename:'protractor/files',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
        'args': [
            '--disable-infobars',
            'disable-web-security', // Should be used only with Porto Seguro app on localhost
        ],
    }
  },

  suites: {
    //   turmas: [
    //   '../specs/spec_exercicio_turmas_recap.js'
    //   ,'../specs/spec_exercicio_turmas_fixacao.js'
    // ],
    // ajuda: '../specs/spec_ajuda.js',
    // corretor: '../specs/spec_corretor.js',
    // esqueciSenha: '../specs/spec_esquecisenha.js',
    login: '../specs/spec_login.js'
    // home: '../specs/spec_home.js',
     
   },

  allScriptsTimeout: 80000,

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
    isVerbose: true,
    realtimeFailure: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 80000, //2500000,
  },

  onPrepare : function(){

    //**** CHANGES CONSOLE INFO ****
    var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
    //**** END ****

    //Resizes the browser's window according to the user's preferences
    if(settings.screenMaximize == true) {
      browser.driver.manage().window().maximize();
    }
    else if(settings.screenWidth > 0 && settings.screenHeight > 0) {
      browser.driver.manage().window().setSize(settings.screenWidth, settings.screenHeight);
    }

    global.requirePO = function (relativePath) {
      return require(__dirname + '/../pages/' + relativePath + '.js');
    };

    global.propertiesPage = function (relativePath) {
      return require(__dirname + '/../utils/' + relativePath + '.js');
    };

    if(settings.overwriteReports == false) {
      settings.reportsFolderName = settings.reportsFolderName + '-' + baseMethods.inserirDataHoraSegundos();
    }

    var jasmineReporters = require('../node_modules/jasmine-reporters');

    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: settings.reportsPath + settings.reportsFolderName,
      filePrefix: 'xmlresults',
      screenshotsFolder: settings.screenshotsFolderName
    }));

    var fs = require('../node_modules/fs-extra');

    fs.emptyDir(settings.reportsPath + settings.reportsFolderName + '/' + settings.screenshotsFolderName, function (err) {
      console.log(err);
    });

    jasmine.getEnv().addReporter({

      specDone: function(result) {

        //if (result.status == 'failed') {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName');

            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream(settings.reportsPath + settings.reportsFolderName + '/' + settings.screenshotsFolderName + '/' + browserName + '-' + result.fullName +'.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        //}
      }
    });

  },

  //HTMLReport called once tests are finished
  onComplete: function() {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');

      var HTMLReport = require('../node_modules/protractor-html-reporter');

      testConfig = {
          reportTitle: 'Test Execution Report',
          outputPath: settings.reportsPath + settings.reportsFolderName,
          screenshotPath: '../' + settings.reportsFolderName + '/' + settings.screenshotsFolderName,
          testBrowser: browserName,
          browserVersion: browserVersion,
          modifiedSuiteName: false,
          screenshotsOnlyOnFailure: false
      };

      new HTMLReport().from(settings.reportsPath + settings.reportsFolderName + '/' + 'xmlresults.xml', testConfig);
    });
  },

};
