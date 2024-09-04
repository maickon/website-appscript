// SCRIPT DESENVOLVIDO PELA MKSOFT
// VISITE: https://mksoft.com.br

//recupera a URL dentro do IFRAME no atributo src
function extractUrlFromIframe(htmlString) {
  var regex = /<iframe\s+[^>]*src="([^"]*)"/;
  var match = regex.exec(htmlString);
  if (match && match[1]) {
    return match[1];
  } else {
    return 'URL não encontrada.';
  }
}

//função para ler os dados da planilha
function readDataToObject() {
    var spreadsheetId = '1onTuU1y4-o_ntpVK5c5FPo3gpBTYjY4EykZcQeXHB24'; // trocar o código da planilha aqui
    var sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    var range = sheet.getRange("A:B"); //captura apenas os dados das colunas A e B
    var values = range.getValues();
    var dataObject = {};
    for (var i = 0; i < values.length; i++) {
        var key = values[i][0]; // Valor da coluna A
        var value = values[i][1]; // Valor da coluna B

        if (key) {
            if(key == 'GOOGLE_MAPS') {
                dataObject[key] = extractUrlFromIframe(value);
            } else {
                dataObject[key] = value;   
            }
        }
    }
  
    // Logger.log(dataObject);
    return JSON.stringify(dataObject);
}


// Função para renderizar a página HTML
function doGet() {
    var template = HtmlService.createTemplateFromFile('index.html');
    template.database = readDataToObject();
    var htmlContent = template.evaluate().getContent();
    var output = HtmlService.createHtmlOutput(htmlContent);
    output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

    return output;
}

//função usar para carregar o código CSS dentro da página index.html
function require(file) {
    return HtmlService.createHtmlOutputFromFile(file).getContent();
}
