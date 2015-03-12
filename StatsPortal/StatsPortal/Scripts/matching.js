google.load("visualization", "1", { packages: ["corechart"] });
google.load("visualization", "1", { packages: ["line"] });

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

    var options = {}

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    // Listen for the 'select' event, and call my function selectHandler() when
    // the user selects something on the chart.
    google.visualization.events.addListener(chart, 'select', function () {
        var selectedItem = chart.getSelection()[0];
        var value = data.getValue(selectedItem.row, 0);
        var domain = getQueryStringValue('domain');
        selectHandler(value, domain);
    });

    chart.draw(data, options);
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
    var options = {
        title: getQueryStringValue('domain') + ' Matching Stats',
        subtitle: 'Overall Stats',
        //curveType: 'function',
        legend: { position: 'bottom' },
        vAxis: {
            title: "Counts",
            viewWindowMode: 'explicit',
            chartArea: {
                left: 0,
                width: '100%'
            }
            //viewWindow: {
            //    max: auto,
            //    min: 0
            //}
        },
        height: 400,
        pointSize: 5
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('visualization'));
    chart.draw(data, options);
}

//$(window).resize(function (dataValues) {
//    drawChart(dataValues);
//    drawRegionsMap(dataValues);
//});