google.load("visualization", "1", { packages: ["corechart"] });

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function drawRegionsMap(dataValues) {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Country");
    data.addColumn("number", "Matched Machines");

    for (var i = 0; i < dataValues.length; i++) {
        data.addRow([dataValues[i].Country, dataValues[i].MatchedMachines]);
    }

    var options = {};

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    // The select handler. Call the chart's getSelection() method
    function selectHandler() {
        var selectedItem = chart.getSelection()[0];
        if (selectedItem) {
            var value = data.getValue(selectedItem.row, 0);

            $.ajax({
                type: 'GET',
                url: 'CountryMatchingStats?country=' + value,
                dataType: 'json',
                async: false,
                success:function(result) {
                    drawChart(result);
                }
            });
        }
    }

    // Listen for the 'select' event, and call my function selectHandler() when
    // the user selects something on the chart.
    google.visualization.events.addListener(chart, 'select', selectHandler);

    chart.draw(data, options);
}

function drawChart(dataValues) {

    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('date', 'Date');
    data.addColumn('number', 'Matched Machines');
    data.addColumn('number', 'Name Count');
    data.addColumn('number', 'Birthyear Count');
    data.addColumn('number', 'Email Count');

    for (var i = 0; i < dataValues.length; i++) {
        data.addRow([new Date(parseInt(dataValues[i].Date.match(/\d+/))), dataValues[i].MatchedMachines, dataValues[i].NameCount, dataValues[i].BirthyearCount, dataValues[i].EmailCount]);
    }

    // Set chart options
    var options = {
        title: 'LinkedIn Matching Stats',
        subtitle: dataValues[0].Country + ' Stats',
        //curveType: 'function',
        legend: { position: 'bottom' },
        vAxis: {
            title: "Counts",
            viewWindowMode: 'explicit'
            //viewWindow: {
            //    max: auto,
            //    min: 0
            //}
        },
        height: 400
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('visualization'));
    chart.draw(data, options);
}


//function drawSnippetCombo() {

//    // Some raw data (not necessarily accurate)
//    var data = google.visualization.arrayToDataTable([
//        ['Month', 'Name', 'Username', 'Gender', 'Email', 'Birthyear'],
//        ['20150221', 14395510, 5264235, 585697, 6501418, 959420],
//        ['20150222', 14370066, 5250954, 594153, 6486588, 958776],
//        ['20150223', 14338534, 5242056, 602801, 6463323, 953046],
//        ['20150224', 14322129, 4381712, 612171, 6446516, 951796],
//        ['20150225', 14317169, 5217820, 620723, 6435730, 950833]
//    ]);

//    var options = {
//        title: '' + capitalizeFirstLetter(document.getElementById('snippet_keyword_bar_chart_dropdown').value) + ' Snippet Daily Parsing Stats',
//        vAxis: { title: "Count" },
//        hAxis: { title: "Date" },
//        seriesType: "bars",
//        series: { 5: { type: "line" } }
//    };

//    var chart = new google.visualization.ComboChart(document.getElementById('snippet_combo_chart'));
//    chart.draw(data, options);
//}


//function drawSnippetKeywordBar(dataValues) {

//    var data = new google.visualization.DataTable();

//    if (document.getElementById('keyword_raw_counts').checked) {

//        data.addColumn('string', 'Keyword');
//        data.addColumn('number', 'Counted');
//        data.addColumn('number', 'Parsed');

//        for (var i = 0; i < dataValues.length; i++) {
//            if (dataValues[i].Domain.toLowerCase() === document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()) {

//                if ($.inArray(dataValues[i].Keyword, getCheckedValues("keyword_checkbox")) > -1) {
//                    data.addRow([dataValues[i].Keyword, dataValues[i].TotalCount, dataValues[i].TotalParsed]);
//                }
//            }
//        }

//        var options = {
//            title: '' + document.getElementById('snippet_keyword_bar_chart_dropdown').value + ' Keywords Counted/Parsed for 02/25/2015',
//            bars: 'horizontal', // Required for Material Bar Charts.
//            //height: (data.getNumberOfRows() * 50)
//        }

//        var chart = new google.visualization.BarChart(document.getElementById("snippet_keyword_chart"));

//        chart.draw(data, options);
//    }

//    else if (document.getElementById('keyword_percentages').checked) {
//        data.addColumn('string', 'Keyword');
//        data.addColumn('number', 'Percent Parsed');

//        for (var i = 0; i < dataValues.length; i++) {
//            if (dataValues[i].Domain.toLowerCase() === document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()) {

//                if ($.inArray(dataValues[i].Keyword, getCheckedValues("keyword_checkbox")) > -1) {
//                    data.addRow([dataValues[i].Keyword, (dataValues[i].TotalParsed / dataValues[i].TotalCount) * 100]);
//                }
//            }
//        }

//        var options = {
//            title: '' + document.getElementById('snippet_keyword_bar_chart_dropdown').value + ' Keywords Counted/Parsed for 02/25/2015',
//            bars: 'horizontal', // Required for Material Bar Charts.
//            //height: (data.getNumberOfRows() * 50)
//        }

//        var chart = new google.visualization.BarChart(document.getElementById("snippet_keyword_chart"));

//        chart.draw(data, options);
//    }


//}

//function drawSnippetKeywordBarPercent(dataValues) {

//    var data = new google.visualization.DataTable();

//    data.addColumn('string', 'Keyword');
//    data.addColumn('number', 'Percent Parsed');

//    for (var i = 0; i < dataValues.length; i++) {
//        if (dataValues[i].Domain.toLowerCase() === document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()) {

//            if ($.inArray(dataValues[i].Keyword, getCheckedValues("keyword_checkbox")) > -1) {
//                console.log((dataValues[i].LastDayTotalParsed / dataValues[i].LastDayTotalCount) * 100);
//                data.addRow([dataValues[i].Keyword, (dataValues[i].LastDayTotalParsed / dataValues[i].LastDayTotalCount) * 100]);
//            }
//        }
//    }

//    var options = {
//        title: '' + document.getElementById('snippet_keyword_bar_chart_dropdown').value + ' Keywords Counted/Parsed for 02/25/2015',
//        bars: 'horizontal', // Required for Material Bar Charts.
//        //height: (data.getNumberOfRows() * 50)
//    }

//    var chart = new google.visualization.BarChart(document.getElementById("snippet_keyword_chart_percent"));

//    chart.draw(data, options);
//}


//function getNewKeywords(domainName) {
    
//    var keywords = [];
//    for (var i = 0; i < dataValues.length; i++) {
//        if (dataValues[i].Domain.toLowerCase() === document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()) {
//            if ($.inArray(dataValues[i].Keyword, keywords) === -1) {
//                keywords.push(dataValues[i].Keyword);
//            }
//        }
//    }

//    return keywords;

//}

//function getCheckedValues(className) {
    
//    var checkedValues = [];
//    var inputElements = document.getElementsByClassName(className);
//    for (var i = 0; i < inputElements.length; i++) {
//        if (inputElements[i].checked) {
//            checkedValues.push(inputElements[i].value);
//        }
//    }

//    return checkedValues;

//}




//$(document).ready(function () {

//    var dataValueDomains = [];
//    for (var i = 0; i < dataValues.length; i++) {
//        if ($.inArray(dataValues[i].Domain, dataValueDomains) === -1) {
//            dataValueDomains.push(dataValues[i].Domain);
//        }
//    }

//    var snippetDropdownPopulate = "";
//    for (var i = 0; i < dataValueDomains.length; i++) {
//        snippetDropdownPopulate += "<option>" + capitalizeFirstLetter(dataValueDomains[i]) + "</option>";
//    }

//    $("#snippet_keyword_bar_chart_dropdown").html(snippetDropdownPopulate);

//    var snippetCheckboxInit = getNewKeywords(dataValueDomains[0]);

//    var snippetCheckboxInitPopulate = "";
//    for (var i = 0; i < snippetCheckboxInit.length; i++) {
//        snippetCheckboxInitPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + snippetCheckboxInit[i].replace(/"/g, '&quot;') + '" checked>' + snippetCheckboxInit[i].replace(/"/g, '&quot;') + '</label></div>';
//    }

//    $("#snippet_keyword_list").html(snippetCheckboxInitPopulate);


//    $("#keyword_raw_counts, #keyword_percentages").change(function() {
//        console.log("Button changed");
//        drawSnippetKeywordBar(dataValues);
//    });

//    $("#snippet_keyword_bar_chart_dropdown").change(function () {
//        var newKeywords = getNewKeywords(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase());

//        var snippetCheckboxPopulate = "";
//        for (var i = 0; i < newKeywords.length; i++) {
//            snippetCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + newKeywords[i].replace(/"/g, '&quot;') + '" checked>' + newKeywords[i].replace(/"/g, '&quot;') + '</label></div>';
//        }

//        $("#snippet_keyword_list").html(snippetCheckboxPopulate);
//    });

//    $("#snippet_keyword_bar_chart_button").click(function() {
//        drawSnippetKeywordBar(dataValues);
//    });

//    $('#snippet_keyword_checkall_button').click(function () {
//        $("input:checkbox").prop('checked', true);
//    });
//    $('#snippet_keyword_uncheckall_button').click(function () {
//        $("input:checkbox").prop('checked', false);
//    });

//});