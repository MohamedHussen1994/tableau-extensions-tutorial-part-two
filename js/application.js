'use strict';
 
(function () {
  $(document).ready(function () {
   // initialize the extension
    tableau.extensions.initializeAsync({ 'configure':configure }).then(function () {
      drawChartJS();
      // add event listener to change the chart if any of the settings chagned
      unregisterSettingsEventListener = tableau.extensions.settings.addEventListener(tableau.TableauEventType.SettingsChanged, (settingsEvent) => {
        drawChartJS();
      });
    }, function () { console.log('Error while Initializing: ' + err.toString()); });
  });
 
  function drawChartJS() {
 
    var worksheetName = tableau.extensions.settings.get("worksheet");
    var categoryColumnNumber = tableau.extensions.settings.get("categoryColumnNumber");
    var valueColumnNumber = tableau.extensions.settings.get("valueColumnNumber");
    var ChartType = tableau.extensions.settings.get("ChartType")
 
    const worksheets=tableau.extensions.dashboardContent.dashboard.worksheets;
    var worksheet=worksheets.find(function (sheet) {
      return sheet.name===worksheetName;
    });
    worksheet.getSummaryDataAsync().then(function (sumdata) {
      var labels = [];
      var data = [];
      var worksheetData = sumdata.data;
       
      for (var i=0; i<worksheetData.length; i++) {
        labels.push(worksheetData[i][categoryColumnNumber-1].formattedValue);
        data.push(worksheetData[i][valueColumnNumber-1].value);
      }
 
      var ctx = $("#myChart");
      var myChart = new Chart(ctx, {
        type: ChartType,
        data: {
          labels: labels,
          datasets: [{
             backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
             data: data
          }]
        }
      });
    });
  }
 
  function configure() {
    const popupUrl= "dialog.html";
    let defaultPayload="";
    tableau.extensions.ui.displayDialogAsync(popupUrl, defaultPayload, { height:400, width:430 }).then((closePayload) => {
      drawChartJS();
    }).catch((error) => {
      switch (error.errorCode) {
        case tableau.ErrorCodes.DialogClosedByUser:
          console.log("Dialog was closed by user");
          break;
        default:
          console.error(error.message);
      }
    });
  }
})();