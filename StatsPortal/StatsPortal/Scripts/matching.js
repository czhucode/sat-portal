google.load("visualization", "1", { packages: ["corechart"] });
google.load("visualization", "1.1", { packages: ["line"] });
google.load('visualization', '1.1', { packages: ['controls'] });

// Get a single value in the querystring
function getQueryStringValue(key) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

// The select handler. Call the chart's getSelection() method
function selectHandler(value, domain) {
    //var options = {}
    if (value) {
        $.ajax({
            type: 'GET',
            url: 'CountryMatchingStats?country=' + value + '&domain=' + domain,
            dataType: 'json',
            async: false,
            success: function (result) {
                drawChart(result);
                document.getElementById('Country').value = value;
            }
        });

        //var view = new google.visualization.DataView(data);
        //view.setColumns([0, {
        //    type: 'number',
        //    label: data.getColumnLabel(1),
        //    calc: function (dt, row) {
        //        return (selection[0].row == row) ? 2 : 1;
        //    }
        //}]);
        //chart.draw(view, options);
    }
}

function drawRegionsMap(dataValues) {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Country");
    data.addColumn("number", "Matched Machines");

    for (var i = 0; i < dataValues.length; i++) {
        data.addRow([dataValues[i].Country, dataValues[i].MatchedMachines]);
    }

    var options = {
        //colorAxis: { colors: ['#E6E3D4', '109618'] },
        //colorAxis: { colors: ['#A3BC98', '109618'] },
        colorAxis: { colors: ['#C7CAB8', '109618'] },
        height : 550,
        keepAspectRation : true
    }

    //var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    // Create a dashboard
    var dash = new google.visualization.Dashboard(document.getElementById('dashboard'));

    var slider = new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'slider',
        'options': {
            'filterColumnLabel': 'Matched Machines',
            'ui': {
                'labelStacking': 'horizontal',
                'label': 'Matched Machines'
            }
        }
    });

    var chart = new google.visualization.ChartWrapper({
        chartType: 'GeoChart',
        containerId: 'regions_div',
        view: {
            columns: [0, 1]
        },
        options : options
    });

    // Listen for the 'select' event, and call my function selectHandler() when
    // the user selects something on the chart.
    google.visualization.events.addListener(chart, 'select', function () {
        //var selectedItem = chart.getSelection()[0];
        var selectedItem = chart.getChart().getSelection()[0];

        // Get dataTable
        var d = chart.getDataTable();
        //var value = data.getValue(selectedItem.row, 0);
        var value = d.getValue(selectedItem.row, 0);
        var domain = getQueryStringValue('domain');
        selectHandler(value, domain);
    });

    dash.bind(slider, chart);
    dash.draw(data);

    //chart.draw(data, options);
}

function auto_complete(dataValues) {
    $("#Country").autocomplete({
        //source: function (req, add) {
        //    add($.map(dataValues, function (el) {
        //        Object.prototype.toString.call(el);
        //        return {
        //            country: el.Country,
        //            mm: el.MatchedMachines
        //        };
        //    }));
        //},
        source: function (request, response) {
            var re = $.ui.autocomplete.escapeRegex(request.term);
            var matcher = new RegExp("^" + re, "i");
            var a = $.grep(dataValues, function (item, index) {
                return matcher.test(item.Country);
            });
            response(a);
        },
        minLength: 1,
        focus: function (event, ui) {
            event.preventDefault(); // Prevent the default focus behavior.
            this.value = ui.item.Country;
        },
        select: function (event, ui) {
            event.preventDefault();
            this.value = ui.item.Country;
            selectHandler(ui.item.Country, ui.item.Domain);
        }
    }).data('ui-autocomplete')._renderItem = function (ul, item) {
        return $('<li></li>')
            .data('item.autocomplete', item)
            .append('<a>' + item.Country + '<br></a>')
            .appendTo(ul);
    };
}

function drawChart(dataValues) {

    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Date');
    data.addColumn('number', 'Matched Machines');
    data.addColumn('number', 'Name Count');
    if (dataValues[0].Domain == 'google' || dataValues[0].Domain == 'facebook') {
        data.addColumn('number', 'Gender Count');
        data.addColumn('number', 'Birthyear Count');

        if (dataValues[0].Domain == 'google')
            data.addColumn('number', 'Email Count');
    }

    if (dataValues[0].Domain == 'linkedin') {
        data.addColumn('number', 'Birthyear Count');
        data.addColumn('number', 'Email Count');
    }

    for (var i = 0; i < dataValues.length; i++) {
        // data.addRow([new Date(parseInt(dataValues[i].Date.match(/\d+/))), dataValues[i].MatchedMachines, dataValues[i].NameCount, dataValues[i].BirthyearCount, dataValues[i].EmailCount]);
        if (dataValues[0].Domain == 'linkedin')
            data.addRow([dataValues[i].Date.toString(), dataValues[i].MatchedMachines, dataValues[i].NameCount, dataValues[i].BirthyearCount, dataValues[i].EmailCount]);
        else if (dataValues[0].Domain == 'google')
            data.addRow([dataValues[i].Date.toString(), dataValues[i].MatchedMachines, dataValues[i].NameCount, dataValues[i].GenderCount, dataValues[i].BirthyearCount, dataValues[i].EmailCount]);
        else if(dataValues[0].Domain == 'facebook')
            data.addRow([dataValues[i].Date.toString(), dataValues[i].MatchedMachines, dataValues[i].NameCount, dataValues[i].GenderCount, dataValues[i].BirthyearCount]);
    }

    // Sort the data
    data.sort([{ column: 0 }]);

    // Set chart options
    //var options = {
    //    title: getQueryStringValue('domain') + ' Matching Machine Stats',
    //    subtitle: 'Country : ' + dataValues[0].Country,
    //    curveType: 'function',
    //    legend: { position: 'bottom' },
    //    animation: {
    //        duration: 1000,
    //        easing: 'out',
    //    },
    //    vAxis: {
    //        title: "Counts",
    //        viewWindowMode: 'explicit',
    //        chartArea: {
    //            left: 0,
    //            width: '100%'
    //        }
    //        //viewWindow: {
    //        //    max: auto,
    //        //    min: 0
    //        //}
    //    },
    //    height: 450,
    //    width : '100%',
    //    pointSize: 5
    //};
    var options = {
        chart: {
            title: getQueryStringValue('domain') + ' Matching Machine Stats',
            subtitle: 'Country : ' + dataValues[0].Country,
        },
        hAxis : {
            slantedText: true,
            slantedTextAngle : 30
        },
        vAxis : {
            title : 'Counts'
        },
        height: 400
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.charts.Line(document.getElementById('visualization'));
    //chart.draw(data, google.charts.Line.convertOptions(options));
    chart.draw(data, options);
}


function drawLookupChart(dataValues) {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Lookup Count');
    data.addColumn('number', 'Name Count');

    if (dataValues[0].Domain == 'google' || dataValues[0].Domain == 'facebook') {
        data.addColumn('number', 'Gender Count');
        data.addColumn('number', 'Birthyear Count');

        if (dataValues[0].Domain == 'google')
            data.addColumn('number', 'Email Count');
    }

    if (dataValues[0].Domain == 'linkedin') {
        data.addColumn('number', 'Birthyear Count');
        data.addColumn('number', 'Email Count');
    }

    for (var i = 0; i < dataValues.length; i++) {
        // data.addRow([new Date(parseInt(dataValues[i].Date.match(/\d+/))), dataValues[i].MatchedMachines, dataValues[i].NameCount, dataValues[i].BirthyearCount, dataValues[i].EmailCount]);
        if (dataValues[0].Domain == 'linkedin')
            data.addRow([dataValues[i].Date.toString(), dataValues[i].LookupCount, dataValues[i].NameCount, dataValues[i].BirthyearCount, dataValues[i].EmailCount]);
        else if (dataValues[0].Domain == 'google')
            data.addRow([dataValues[i].Date.toString(), dataValues[i].LookupCount, dataValues[i].NameCount, dataValues[i].GenderCount, dataValues[i].BirthyearCount, dataValues[i].EmailCount]);
        else if (dataValues[0].Domain == 'facebook')
            data.addRow([dataValues[i].Date.toString(), dataValues[i].LookupCount, dataValues[i].NameCount, dataValues[i].GenderCount, dataValues[i].BirthyearCount]);
    }

    // Sort the data
    data.sort([{ column: 0 }]);

    //var options = {
    //    chart: {
    //        title: 'Linkedin Lookup Stats',
    //        subtitle: 'for timestamp ' + dataValues[0].Date
    //    },
    //    height: 400,
    //    vAxis: {
    //        gridlines: { color: '#333', count: 4 }
    //    }
    //};

    var options = {
        title:  getQueryStringValue('domain') + ' Lookup Stats',
        titleTextStyle: {
            color: '#757575',
            fontSize: 16,
            bold: false
        },
        height: 400,
        width: '60%',
        legend: {
            position: 'bottom',
            textStyle: {
                color: '#757575',
                fontSize: 14,
                bold: false
            }
        },
        hAxis: {
            title : 'Date',
            slantedText: true,
            slantedTextAngle: 30,
            textStyle: {
                color: '#757575',
                fontSize: 12,
                bold: false
            }
        },
        vAxis: {
            title : 'Counts',
            textStyle: {
                color: '#757575',
                fontSize: 12,
                bold: false
            }
        },
        pointSize: 4,
        crosshair: {
            trigger : 'focus',
            orientation: 'vertical',
            focused: { opacity: 0.5 }
        },
        explorer: {
            keepInBounds: true,
            actions: ['dragToZoom', 'rightClickToReset']
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('lookup_stats'));

    chart.draw(data, options);
}

function drawMatchingChart(dataValues) {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Eligible Ids');
    data.addColumn('number', 'Matched Ids');
    data.addColumn('number', 'Name Count');

    if (dataValues[0].Domain == 'google' || dataValues[0].Domain == 'facebook') {
        data.addColumn('number', 'Gender Count');
        data.addColumn('number', 'Birthyear Count');

        if (dataValues[0].Domain == 'google')
            data.addColumn('number', 'Email Count');
    }

    if (dataValues[0].Domain == 'linkedin') {
        data.addColumn('number', 'Birthyear Count');
        data.addColumn('number', 'Email Count');
    }

    for (var i = 0; i < dataValues.length; i++) {
        // data.addRow([new Date(parseInt(dataValues[i].Date.match(/\d+/))), dataValues[i].MatchedMachines, dataValues[i].NameCount, dataValues[i].BirthyearCount, dataValues[i].EmailCount]);
        if (dataValues[0].Domain == 'linkedin')
            data.addRow([dataValues[i].Date.toString(), dataValues[i].EligibleIdsCount, dataValues[i].MatchedIdsCount, dataValues[i].NameCount, dataValues[i].BirthyearCount, dataValues[i].EmailCount]);
        else if (dataValues[0].Domain == 'google')
            data.addRow([dataValues[i].Date.toString(), dataValues[i].EligibleIdsCount, dataValues[i].MatchedIdsCount, dataValues[i].NameCount, dataValues[i].GenderCount, dataValues[i].BirthyearCount, dataValues[i].EmailCount]);
        else if (dataValues[0].Domain == 'facebook')
            data.addRow([dataValues[i].Date.toString(), dataValues[i].EligibleIdsCount, dataValues[i].MatchedIdsCount, dataValues[i].NameCount, dataValues[i].GenderCount, dataValues[i].BirthyearCount]);
    }

    // Sort the data
    data.sort([{ column: 0 }]);

    var options = {
        title: getQueryStringValue('domain') + ' Matching Id Stats',
        titleTextStyle: {
            color: '#757575',
            fontSize: 16,
            bold: false
        },
        height: 400,
        width: '60%',
        legend: {
            position: 'bottom',
            textStyle: {
                color: '#757575',
                fontSize: 14,
                bold: false
            }
        },
        hAxis: {
            title: 'Date',
            slantedText: true,
            slantedTextAngle: 30,
            textStyle: {
                color: '#757575',
                fontSize: 12,
                bold: false
            }
        },
        vAxis: {
            title: 'Counts',
            textStyle: {
                color: '#757575',
                fontSize: 12,
                bold: false
            }
        },
        pointSize: 4,
        crosshair: {
            trigger: 'focus',
            orientation: 'vertical',
            focused: { opacity: 0.5 }
        },
        explorer: {
            keepInBounds: true,
            actions: ['dragToZoom', 'rightClickToReset']
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('matched_overall'));

    chart.draw(data, options);
}
//$(window).resize(function (dataValues) {
//    drawChart(dataValues);
//    drawRegionsMap(dataValues);
//});