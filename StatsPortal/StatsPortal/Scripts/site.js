function drawRegionsMap() {

    var data = google.visualization.arrayToDataTable([
      ['Country', 'Matched %'],
      ['GB', 99.49],
      ['US', 99.7],
      ['BR', 98.18],
      ['CA', 100.0],
      ['FR', 98.56],
      ['RU', 93.06],
      ['HK', 93.1],
      ['PH', 89.29],
      ['BD', 83.33],
      ['AZ', 80.0],
      ['CN', 90.62]
    ]);

    var options = {};

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
}

function drawChart(dataValues) {

    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('date', 'Date');
    data.addColumn('number', 'Total Matched %');
    data.addColumn('number', 'Name Matched %');
    data.addColumn('number', 'Birthyear Matched %');
    data.addColumn('number', 'Email Matched %');

    for (var i = 0; i < dataValues.length; i++) {
        data.addRow([new Date(parseInt(dataValues[i].Date.match(/\d+/))), dataValues[i].MatchedPercentage, dataValues[i].PercentageName, dataValues[i].PercentageBirthyear, dataValues[i].PercentageEmail]);
    }

    // Set chart options
    var options = {
        title: dataValues[0].Domain + ' Matching Stats',
        curveType: 'function',
        legend: { position: 'bottom' },
        vAxis: {
            title: "Percentage",
            viewWindowMode: 'explicit',
            viewWindow: {
                max: 105,
                min: 0
            }
        }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('visualization'));
    chart.draw(data, options);
}