google.load("visualization", "1", { packages: ["corechart"] });
google.load("visualization", "1", { packages: ["line"] });
google.load("visualization", "1.1", { packages: ["bar"] });


//function drawSnippetCombo() {

//    // Some raw data (not necessarily accurate)
//    //var data = google.visualization.arrayToDataTable([
//    //    ['Month', 'Name', 'Username', 'Gender', 'Email', 'Birthyear'],
//    //    ['20150221', 14395510, 5264235, 585697, 6501418, 959420],
//    //    ['20150222', 14370066, 5250954, 594153, 6486588, 958776],
//    //    ['20150223', 14338534, 5242056, 602801, 6463323, 953046],
//    //    ['20150224', 14322129, 4381712, 612171, 6446516, 951796],
//    //    ['20150225', 14317169, 5217820, 620723, 6435730, 950833]
//    //]);

//    var data = new google.visualization.DataTable();

//    data.addColumn('string', 'Month');
//    data.addColumn('number', 'Name');
//    data.addColumn({ type: 'string', role: 'annotation' });
//    data.addColumn('number', 'Username');
//    data.addColumn({ type: 'string', role: 'annotation' });
//    data.addColumn('number', 'Gender');
//    data.addColumn({ type: 'string', role: 'annotation' });
//    data.addColumn('number', 'Birthyear');
//    data.addColumn({ type: 'string', role: 'annotation' });
//    data.addColumn('number', 'Email');
//    data.addColumn({ type: 'string', role: 'annotation' });

//    var nameTotal = 0;
//    var usernameTotal = 0;
//    var genderTotal = 0;
//    var byTotal = 0;
//    var emailTotal = 0;

//    for (var i = 0; i < dataValues.length; i++) {
//        if (dataValues[i].Domain.toLowerCase() === document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()) {

//            if ($.inArray(dataValues[i].Keyword, getCheckedValues("keyword_checkbox")) > -1) {

//                nameTotal += dataValues[i].NameParsed;
//                usernameTotal += dataValues[i].UsernameParsed;
//                genderTotal += dataValues[i].GenderParsed;
//                byTotal += dataValues[i].BirthyearParsed;
//                emailTotal += dataValues[i].EmailParsed;
//            }
//        }
//    }

//    data.addRow(["20150222", nameTotal, nameTotal.toString(), usernameTotal, usernameTotal.toString(), genderTotal, genderTotal.toString(), byTotal, byTotal.toString(), emailTotal, emailTotal.toString()]);

//    var view = new google.visualization.DataView(data);
//    view.setColumns([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

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

function drawDomainLineChart(dataPool, days, firstDay) {

    var data = new google.visualization.DataTable();


    var numRows = dataPool.length;
    var numCols = dataPool[0].length;

    console.log(dataPool);
    console.log(numCols + ", " + numRows);

    data.addColumn('string', dataPool[0][0]);
    data.addColumn('number', "Seen");
    data.addColumn('number', "Parsed");
    data.addColumn('number', "Name");
    data.addColumn('number', "Username");
    data.addColumn('number', "Gender");
    data.addColumn('number', "Birthyear");
    data.addColumn('number', "Email");

    debugger;

    for (var i = 1; i < numRows; i++) {
        for (var j = 1; j < dataPool[i].length; j++) {
            if (document.getElementById('keyword_percentages').checked) {
                dataPool[i][j] = parseFloat([dataPool[i][j]]);
            } else {
                dataPool[i][j] = parseInt([dataPool[i][j]]);
            }
        }
        data.addRow(dataPool[i]);
    }


    var options = {
        title: "Total Counts: " + capitalizeFirstLetter(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()),
        pointSize: 4,
        crosshair: {
            trigger : 'focus',
            orientation: 'vertical',
            focused: { opacity: 0.5 }
        },
        explorer: {
            keepInBounds: true,
            actions: ['dragToZoom', 'rightClickToReset']
        },
       // width: 1000,
        height: 500
    };

    var chart = new google.visualization.LineChart(document.getElementById('snippet_line_chart'));
    //var chart = new google.charts.Line(document.getElementById('snippet_line_chart'));

    chart.draw(data, options);
}



function drawKeywordLine(dataPool, days, firstDay) {

    var data = new google.visualization.DataTable();
    //if (document.getElementById('keyword_raw_counts').checked) {
        //var dataPool = [];

        //var keywords = [];
        //keywords.push("Date");

        //var rowValues = [];
        //var tableValues = [];
        //var days = 6;
        //var firstDay = 20150225;

        //for (var d = 0; d < days; d++) {

        //    rowValues.push((firstDay + d).toString());
        //    for (var i = 0; i < dataValues.length; i++) {
        //        if (dataValues[i].Domain.toLowerCase() === document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()) {

        //            if ($.inArray(dataValues[i].Keyword, getCheckedValues("keyword_checkbox")) > -1) {

        //                if ($.inArray(dataValues[i].Keyword, keywords) === -1) {
        //                    keywords.push(dataValues[i].Keyword);
        //                }

        //                rowValues.push(dataValues[i].TotalCount);
        //            }
        //        }
        //    }
        //    tableValues.push(rowValues);
        //    rowValues = [];
        //}

        //dataPool.push(keywords);
        //for (var i = 0; i < tableValues.length; i++) {
        //    dataPool.push(tableValues[i]);
        //}

        var numRows = dataPool.length;
        var numCols = dataPool[0].length;

        data.addColumn('string', dataPool[0][0]);

        for (var i = 1; i < numCols; i++) {
            data.addColumn('number', dataPool[0][i]);
        }

        for (var i = 1; i < numRows; i++) {
            for (var j = 1; j < dataPool[i].length; j++) {
                if (document.getElementById('keyword_percentages').checked) {
                    dataPool[i][j] = parseFloat([dataPool[i][j]]);
                }
                else {
                    dataPool[i][j] = parseInt([dataPool[i][j]]);
                }
            }
            data.addRow(dataPool[i]);
        }


        var options = {
            title: "Total Seen by Keyword: " + capitalizeFirstLetter(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()),
            pointSize: 4,
            crosshair: {
                trigger: 'focus',
                orientation: 'vertical',
                focused: { opacity: 0.5 }
            },
            explorer: {
                keepInBounds: true,
                actions: ['dragToZoom', 'rightClickToReset']
            },
          //  width: 900,
            height: 500
        };

    //var chart = new google.charts.Line(document.getElementById('snippet_keyword_line_chart'));
        var chart = new google.visualization.LineChart(document.getElementById('snippet_keyword_line_chart'));

        chart.draw(data, options);
    //}

    //else if (document.getElementById('keyword_percentages').checked) {

    //    var dataPool = [];

    //    var keywords = [];
    //    keywords.push("Date");

    //    var rowValues = [];
    //    var tableValues = [];
    //    var days = 6;
    //    var firstDay = 20150225;

    //    for (var d = 0; d < days; d++) {

    //        rowValues.push((firstDay + d).toString());
    //        for (var i = 0; i < dataValues.length; i++) {
    //            if (dataValues[i].Domain.toLowerCase() === document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()) {

    //                if ($.inArray(dataValues[i].Keyword, getCheckedValues("keyword_checkbox")) > -1) {

    //                    if ($.inArray(dataValues[i].Keyword, keywords) === -1) {
    //                        keywords.push(dataValues[i].Keyword);
    //                    }

    //                    rowValues.push(roundToTwo((dataValues[i].TotalParsed / dataValues[i].TotalCount) * 100));
    //                }
    //            }
    //        }
    //        tableValues.push(rowValues);
    //        rowValues = [];
    //    }

    //    dataPool.push(keywords);
    //    for (var i = 0; i < tableValues.length; i++) {
    //        dataPool.push(tableValues[i]);
    //    }

    //    var numRows = dataPool.length;
    //    var numCols = dataPool[0].length;

    //    console.log(dataPool);
    //    console.log(numCols + ", " + numRows);

    //    data.addColumn('string', dataPool[0][0]);

    //    for (var i = 1; i < numCols; i++) {
    //        data.addColumn('number', dataPool[0][i]);
    //    }

    //    for (var i = 1; i < numRows; i++)
    //        data.addRow(dataPool[i]);


    //    var options = {
    //        chart: {
    //            title: 'Keyword Trends',
    //            subtitle: 'Percent Parsed by Date'
    //        },
    //        width: 900,
    //        height: 600
    //    };

    //    var chart = new google.charts.Line(document.getElementById('snippet_keyword_line_chart'));

    //    chart.draw(data, options);


    //}

}

function drawSnippetKeywordBar(dataValues) {

    var data = new google.visualization.DataTable();

    if (document.getElementById('keyword_raw_counts').checked) {

        data.addColumn('string', 'Keyword');
        data.addColumn('number', 'Counted');
        data.addColumn({ type: 'string', role: 'annotation' });
        data.addColumn('number', 'Parsed');
        data.addColumn({ type: 'string', role: 'annotation' });

        for (var i = 0; i < dataValues.length; i++) {
            if (dataValues[i].Domain.toLowerCase() === document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()) {

                if ($.inArray(dataValues[i].Keyword, getCheckedValues("keyword_checkbox")) > -1) {
                    data.addRow([dataValues[i].Keyword, dataValues[i].TotalCount, dataValues[i].TotalCount.toString(), dataValues[i].TotalParsed, dataValues[i].TotalParsed.toString()]);
                }
            }
        }

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1, 2, 3, 4]);

        var options = {
            title: '' + document.getElementById('snippet_keyword_bar_chart_dropdown').value + ' Keywords Counted/Parsed for 02/25/2015',
            bars: 'horizontal', // Required for Material Bar Charts.
            //height: (data.getNumberOfRows() * 50)
        }

        var chart = new google.visualization.BarChart(document.getElementById("snippet_keyword_chart"));

        chart.draw(data, options);
    }

    else if (document.getElementById('keyword_percentages').checked) {
        data.addColumn('string', 'Keyword');
        data.addColumn('number', 'Percent Parsed');
        data.addColumn({ type: 'string', role: 'annotation' });

        for (var i = 0; i < dataValues.length; i++) {
            if (dataValues[i].Domain.toLowerCase() === document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()) {

                if ($.inArray(dataValues[i].Keyword, getCheckedValues("keyword_checkbox")) > -1) {
                    data.addRow([dataValues[i].Keyword, roundToTwo((dataValues[i].TotalParsed / dataValues[i].TotalCount) * 100), (roundToTwo((dataValues[i].TotalParsed / dataValues[i].TotalCount) * 100)).toString()]);
                }
            }
        }

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1, 2]);

        var options = {
            title: '' + document.getElementById('snippet_keyword_bar_chart_dropdown').value + ' Keywords Counted/Parsed for 02/25/2015',
            bars: 'horizontal', // Required for Material Bar Charts.
            //height: (data.getNumberOfRows() * 50)
        }

        var chart = new google.visualization.BarChart(document.getElementById("snippet_keyword_chart"));

        chart.draw(data, options);
    }


}

function drawSnippetLineChart(datavalues) {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Google');
    data.addColumn('number', 'Facebook');
    data.addColumn('number', 'YouTube');

    data.addRows([
      ["20150213", 2277376, 9537435, 2060438],
      ["20150214", 2264598, 9532156, 2165894],
      ["20150215", 2204588, 9032156, 2215854],
      ["20150216", 2014589, 8999843, 2185963],
      ["20150217", 2189659, 9004568, 2205482],
      ["20150218", 2203655, 9098756, 2208945],
      ["20150219", 2215689, 9105489, 2215900],
      ["20150220", 2204983, 9099875, 2205489],
      ["20150221", 1236548, 9102235, 2211598],
      ["20150222", 1596489, 8854862, 2210569],
      ["20150223", 2210059, 8869845, 2211003],
      ["20150224", 2265897, 8964553, 2199986],
      ["20150225", 2245689, 9000548, 2205489],
      ["20150226", 2245698, 9004586, 2212354]
    ]);

    var options = {
        chart: {
            title: 'Snippets Parsed',
            //subtitle: 'in millions of dollars (USD)'
        },
    };

    var chart = new google.charts.Line(document.getElementById('snippet_line_chart'));

    chart.draw(data, options);

}


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


function getNewKeywords(domainName) {

    var keywords = [];
    for (var i = 0; i < dataValues.length; i++) {
        if (dataValues[i].Domain.toLowerCase() === document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()) {
            if ($.inArray(dataValues[i].Keyword, keywords) === -1) {
                keywords.push(dataValues[i].Keyword);
            }
        }
    }

    return keywords;

}

function getCheckedValues(className) {

    var checkedValues = [];
    var inputElements = document.getElementsByClassName(className);
    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].checked) {
            checkedValues.push(inputElements[i].value);
        }
    }

    return checkedValues;

}

function drawDomainLine(domainName, startDate, dayCount) {
    //var checked = true;
    //if (document.getElementById('keyword_percentages_domain').checked) {
    //    checked = false;
    //}
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "getDomainLineData",
        traditional: true,
        data: {
            domain: domainName,
            startDay: startDate,
            days: dayCount,
            // keywordList: getNewKeywords(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase())
            keywordList: getNewKeywords(domainName)
            //countCheck: checked
        },
        success: function (chartsdata) {

            // Callback that creates and populates a data table,    
            // instantiates the pie chart, passes in the data and    
            // draws it. 
            drawDomainLineChart(chartsdata, dayCount, "20150301");

        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}

function drawSnippetLine(domainName, startDate, dayCount) {
    var checked = true;
    if (document.getElementById('keyword_percentages').checked) {
        checked = false;
    }
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "getColumnFormatData",
        traditional: true,
        data: {
            domain: domainName,
            startDay: startDate,
            days: dayCount,
            // keywordList: getNewKeywords(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase())
            keywordList: getCheckedValues("keyword_checkbox"),
            countCheck: checked
},
        success: function (chartsdata) {

            // Callback that creates and populates a data table,    
            // instantiates the pie chart, passes in the data and    
            // draws it. 
            drawKeywordLine(chartsdata, dayCount, "20150301");

        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}

function drawKeywordInfo(domainName, keyword, startDate, dayCount) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "GetKeywordData",
        traditional: true,
        data: {
            domain: domainName,
            keyword: keyword,
            startDay: startDate,
            dayCount: dayCount
        },
        success: function (keywordData) {
 
            //var keywordInfo = domainList;
            
            //var tableHeaderPopulate = "<thead><tr><th>Date</th><th>Domain</th><th>Keyword</th><th>Total Seen</th><th>Total Parsed</th><th>Percent Parsed</th><th>Emails Parsed</th><th>Genders Parsed</th><th>Birthyears Parsed</th><th>Names Parsed</th><th>Usenames Parsed</th></tr></thead>";
            //var tableBodyPopulate = "<tbody>";

            //for (var i = 0; i < domainList.length; i++) {
            //    if (domainList[i][0] == null) {
            //        tableBodyPopulate += '<tr><td>' + domainList[i][0] + '</td><td>' + domainName + '</td><td>' + keyword.replace(/"/g, '&quot;') + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + "</td></tr>";

            //    } else {
            //        tableBodyPopulate += '<tr><td>' + domainList[i][0] + '</td><td>' + domainName + '</td><td>' + keyword.replace(/"/g, '&quot;') + '</td><td>' + domainList[i][1] + '</td><td>' + domainList[i][2] + '</td><td>' + roundToTwo(parseFloat(domainList[i][2]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][3] + '</td><td>' + domainList[i][4] + '</td><td>' + domainList[i][5] + '</td><td>' + domainList[i][6] + '</td><td>' + domainList[i][7] + "</td></tr>";
            //    }
            //    //                tableBodyPopulate += '<tr><td>' + domainList[i][0] + '</td><td>' + domainName + '</td><td>' + keyword.replace(/"/g, '&quot;') + '</td><td>' + domainList[i][1] + '</td><td>' + domainList[i][2] + '</td><td>' + roundToTwo(parseFloat(domainList[i][2]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][3] + '</td><td>' + roundToTwo(parseFloat(domainList[i][3]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][4] + '</td><td>' + roundToTwo(parseFloat(domainList[i][4]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][5] + '</td><td>' + roundToTwo(parseFloat(domainList[i][5]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][6] + '</td><td>' + roundToTwo(parseFloat(domainList[i][6]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][7] + '</td><td>' + roundToTwo(parseFloat(domainList[i][7]) / parseFloat(domainList[i][1]) * 100) + '</td></tr>';

            //    //'<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + newKeywords[i].replace(/"/g, '&quot;') + '" checked>' + newKeywords[i].replace(/"/g, '&quot;') + '</label></div>';
            //}

            //tableBodyPopulate += "</tbody>"


            //$("#keyword_table").html(tableHeaderPopulate + "" + tableBodyPopulate);

            var data = new google.visualization.DataTable();

            if (document.getElementById('keyword_data_raw_counts').checked) {
                data.addColumn('string', 'Date');
                data.addColumn('number', 'Total Seen');
                data.addColumn('number', 'Total Parsed');
                data.addColumn('number', 'Emails');
                data.addColumn('number', 'Genders');
                data.addColumn('number', 'Birthyears');
                data.addColumn('number', 'Names');
                data.addColumn('number', 'Usernames');

                for (var i = 0; i < keywordData.length; i++) {
                    if (keywordData[i] == null) {
                        data.addRow([keywordData[i][0], 0, 0, 0, 0, 0, 0, 0]);
                    } else {
                        data.addRow([keywordData[i][0], parseInt(keywordData[i][1]), parseInt(keywordData[i][2]), parseInt(keywordData[i][3]), parseInt(keywordData[i][4]), parseInt(keywordData[i][5]), parseInt(keywordData[i][6]), parseInt(keywordData[i][7])]);
                    }
                }
            } else {
                data.addColumn('string', 'Date');
                data.addColumn('number', '% Parsed');
                data.addColumn('number', '% Email');
                data.addColumn('number', '% Gender');
                data.addColumn('number', '% Birthyear');
                data.addColumn('number', '% Name');
                data.addColumn('number', '% Username');

                for (var i = 0; i < keywordData.length; i++) {
                    if (keywordData[i] == null) {
                        data.addRow([keywordData[i][0], 0, 0, 0, 0, 0, 0]);
                    } else {
                        data.addRow([keywordData[i][0], (parseInt(keywordData[i][2]) / parseFloat(keywordData[i][1]) * 100), (parseInt(keywordData[i][3]) / parseFloat(keywordData[i][1]) * 100), (parseInt(keywordData[i][4]) / parseFloat(keywordData[i][1]) * 100), (parseInt(keywordData[i][5]) / parseFloat(keywordData[i][1]) * 100), (parseInt(keywordData[i][6]) / parseFloat(keywordData[i][1]) * 100), (parseInt(keywordData[i][7]) / parseFloat(keywordData[i][1]) * 100)]);
                    }
                }
            }

            debugger;
            var options = {
   
                title: "Demo Stats by Keyword: " + capitalizeFirstLetter(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()),
                //  width: 900,
                height: 500,
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

            var chart = new google.visualization.ColumnChart(document.getElementById('keyword_data_bar'));

            chart.draw(data, options);

        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}


$(document).ready(function () {

  

    var dataValueDomains = [];
    //$.ajax({
    //    type: 'POST',
    //    dataType: 'json',
    //    url: "GetDomainList",
    //    traditional: true,
    //    data: {},
    //    success: function (domainList) {

    //        // Callback that creates and populates a data table,    
    //        // instantiates the pie chart, passes in the data and    
    //        // draws it. 
    //        dataValueDomains = domainList;
    //        debugger;
    //    },
    //    error: function () {
    //        alert("Error loading data! Please try again.");
    //    }
    //});
    for (var i = 0; i < dataValues.length; i++) {
        if ($.inArray(dataValues[i].Domain, dataValueDomains) === -1) {
            dataValueDomains.push(dataValues[i].Domain);
        }
    }

    dataValueDomains = dataValueDomains.sort();

    var snippetDropdownPopulate = "";
    for (var i = 0; i < dataValueDomains.length; i++) {
        snippetDropdownPopulate += "<option>" + capitalizeFirstLetter(dataValueDomains[i]) + "</option>";
    }

    $("#snippet_keyword_bar_chart_dropdown").html(snippetDropdownPopulate);

    var snippetCheckboxInit = getNewKeywords(dataValueDomains[0]);

    var snippetCheckboxInitPopulate = "";
    var keywordDataInitPopulate = "";
    for (var i = 0; i < snippetCheckboxInit.length; i++) {
        if (i == 0) {
            snippetCheckboxInitPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + snippetCheckboxInit[i].replace(/"/g, '&quot;') + '" checked>' + snippetCheckboxInit[i].replace(/"/g, '&quot;') + '</label></div>';
            keywordDataInitPopulate += "<option>" + snippetCheckboxInit[i].replace(/"/g, '&quot;') + "</option>";
        } else
        {
            snippetCheckboxInitPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + snippetCheckboxInit[i].replace(/"/g, '&quot;') + '">' + snippetCheckboxInit[i].replace(/"/g, '&quot;') + '</label></div>';
            keywordDataInitPopulate += "<option>" + snippetCheckboxInit[i].replace(/"/g, '&quot;') + "</option>";
        }
        
    }

    $("#snippet_keyword_list").html(snippetCheckboxInitPopulate);
    $("#snippet_keyword_data_dropdown").html(keywordDataInitPopulate);

    //drawSnippetKeywordBar(dataValues);

    $("#keyword_raw_counts, #keyword_percentages").change(function () {
        drawSnippetLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), "20150301", 7);
    });

    $("#keyword_data_raw_counts, #keyword_data_percentages").change(function () {
        drawKeywordInfo(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), document.getElementById('snippet_keyword_data_dropdown').value.toLowerCase(), "20150301", 7);
    });

    //$("#keyword_raw_counts_domain, #keyword_percentages_domain").change(function () {
    //    drawDomainLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), "20150301", 3);
    //});

    $("#snippet_keyword_bar_chart_dropdown").change(function () {
        var newKeywords = getNewKeywords(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase());

        var snippetCheckboxPopulate = "";
        var keywordDropdownPopulate = "";
        for (var i = 0; i < newKeywords.length; i++) {
            if (i == 0) {
                snippetCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + newKeywords[i].replace(/"/g, '&quot;') + '" checked>' + newKeywords[i].replace(/"/g, '&quot;') + '</label></div>';
            } else {
                snippetCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + newKeywords[i].replace(/"/g, '&quot;') + '">' + newKeywords[i].replace(/"/g, '&quot;') + '</label></div>';


            }
            keywordDropdownPopulate += "<option>" + newKeywords[i].replace(/"/g, '&quot;') + "</option>";
        }

        $("#snippet_keyword_list").html(snippetCheckboxPopulate);
        $("#snippet_keyword_data_dropdown").html(keywordDropdownPopulate);
    });

    $(".domain_name").html(capitalizeFirstLetter(document.getElementById('snippet_keyword_bar_chart_dropdown').value));

    $("#snippet_keyword_bar_chart_button").click(function () {
        //drawSnippetKeywordBar(dataValues);
        //drawSnippetCombo();
        drawSnippetLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), "20150301", 7);
        drawDomainLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), "20150301", 7);
        //$(".domain_name").html(capitalizeFirstLetter(document.getElementById('snippet_keyword_bar_chart_dropdown').value));
        drawKeywordInfo(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), document.getElementById('snippet_keyword_data_dropdown').value.toLowerCase(), "20150301", 7);
    });

    $('#snippet_keyword_checkall_button').click(function () {
        $("input:checkbox").prop('checked', true);
    });
    $('#snippet_keyword_uncheckall_button').click(function () {
        $("input:checkbox").prop('checked', false);
    });

    $('#toggle_keyword_line_nav').click(function () {
        $('#keyword_toolbar_container').toggle();
    });

    $("#snippet_keyword_list").change(function () {
        drawSnippetLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), "20150301", 7);
    });

    $("#snippet_keyword_checkall_button, #snippet_keyword_uncheckall_button").click(function () {
        drawSnippetLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), "20150301", 7);
    });

    drawSnippetLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), "20150301", 7);
    drawDomainLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), "20150301", 7);
    
    drawKeywordInfo(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), document.getElementById('snippet_keyword_data_dropdown').value.toLowerCase(), "20150301", 7);

    $("#snippet_keyword_data_dropdown").change(function () {
        drawKeywordInfo(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), document.getElementById('snippet_keyword_data_dropdown').value.toLowerCase(), "20150301", 7);
    });
    

    $(function () {
        $("#toggle_snippet_nav, #toggle_snippet_in_menu").click(function () {
            if ($("#snippet_nav").hasClass("popped")) {
                $("#snippet_nav").animate({ top: '-1000px' }, { queue: false, duration: 500 }).removeClass("popped");
                $("#toggle_snippet_nav").animate({ top: '5%' }, { queue: false, duration: 500 });
            } else {
                $("#snippet_nav").animate({ top: "-1px" }, { queue: false, duration: 250 }).addClass("popped");
                $("#toggle_snippet_nav").animate({ top: '-50px' }, { queue: false, duration: 50 });
            }
        });
    });

    $('#show_keyword_chart').click(function () {
        $('#keyword_container').toggle();
    });

});