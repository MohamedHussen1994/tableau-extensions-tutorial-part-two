$(document).ready(function () {
    var ctx = $("#myChart");
    var myChart = new Chart(ctx, {
       type: 'polarArea',
       data: {
          labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
          datasets: [{
             label: "Population (millions)",
             backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
             data: [3,7,16,11,14]
          }]
       },
       options: {
          title: {
             display: true,
             text: 'Predicted world population (millions) in 2050'
          }
       }
    });
 });