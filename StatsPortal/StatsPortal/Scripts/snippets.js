google.load("visualization", "1", { packages: ["corechart"] });
google.load("visualization", "1.1", { packages: ["line"] });
google.load("visualization", "1.1", { packages: ["bar"] });

// Globals 
var domainDropdownList;
var keywordMenuList;

var globalStartDate = "";
var globalEndDate = "";

var keywordExcludeList = ["scorecardresearch", "acamp_id=", "mnum=", "CMXID=", "CXNID=", "-- ig=", "WMXID=", "counters.gigya.com", "widgetserver.com/syndication/subscriber/InsertPanel.js?panelId=",
"platial.com/mapkit/load?id=widget", "microsoftstore.com", "office.microsoft.com", "microsoft.com/office", "windows.microsoft.com", "microsoft.com/windows", "officelive.com", "xbox.com",
"windowsphone.com", "xboxlive.com", "b.voicefive.com", "scorecardresearch"];

function calcDiff(date1, date2) {

    var diff = 0;
    if (date1 && date2) {
        diff = Math.ceil((date2.getTime() - date1.getTime()) / 86400000);
    }


    return diff;
}

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

//function reloadData(domain, startDate, endDate) {
//    $.ajax({
//        type: 'POST',
//        dataType: 'json',
//        url: "ReloadData",
//        traditional: true,
//        data: {
//            domain: domain,
//            startDate: startDate,
//            endDate: endDate
//        },
//        success: function (firstModel) {

//            console.log("Data reload successful!");

//        },
//        error: function () {
//            alert("Data reload failure! Please try again.");
//        }
//    });
//}

function reloadGraphs() {
    drawSnippetLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), getCheckedValues("keyword_checkbox"), globalStartDate, globalEndDate);
    drawDomainLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), globalStartDate, globalEndDate);
    drawKeywordInfo(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), document.getElementById('snippet_keyword_data_dropdown').value.toLowerCase(), globalStartDate, globalEndDate);
};

function drawDomainLineChart(dataPool, startDate, endDate) {

    var data = new google.visualization.DataTable();
    var lineColors = ["#757575", "#0D47A1", "#D50000", "#1E88E5", "#4CAF50", "#FF9800", "#9C27B0"];
    

    var numRows = dataPool.length;
    var numCols = dataPool[0].length;

    console.log(dataPool);
    console.log(numCols + ", " + numRows);

    data.addColumn('string', dataPool[0][0]);
    data.addColumn('number', "Seen");
    data.addColumn('number', "Parsed");
    data.addColumn('number', "Birthyear");
    data.addColumn('number', "Gender");
    data.addColumn('number', "Name");
    data.addColumn('number', "Username");
    data.addColumn('number', "Email");



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
        height: 500,
        colors: lineColors
    };

    var chart = new google.visualization.LineChart(document.getElementById('snippet_line_chart'));
    //var chart = new google.charts.Line(document.getElementById('snippet_line_chart'));

    chart.draw(data, options);
}

function drawKeywordLine(dataPool) {

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

//function drawSnippetKeywordBar(dataValues) {

//    var data = new google.visualization.DataTable();

//    if (document.getElementById('keyword_raw_counts').checked) {

//        data.addColumn('string', 'Keyword');
//        data.addColumn('number', 'Counted');
//        data.addColumn({ type: 'string', role: 'annotation' });
//        data.addColumn('number', 'Parsed');
//        data.addColumn({ type: 'string', role: 'annotation' });

//        for (var i = 0; i < dataValues.length; i++) {
//            if (dataValues[i].Domain.toLowerCase() === document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()) {

//                if ($.inArray(dataValues[i].Keyword, getCheckedValues("keyword_checkbox")) > -1) {
//                    data.addRow([dataValues[i].Keyword, dataValues[i].TotalCount, dataValues[i].TotalCount.toString(), dataValues[i].TotalParsed, dataValues[i].TotalParsed.toString()]);
//                }
//            }
//        }

//        var view = new google.visualization.DataView(data);
//        view.setColumns([0, 1, 2, 3, 4]);

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
//        data.addColumn({ type: 'string', role: 'annotation' });

//        for (var i = 0; i < dataValues.length; i++) {
//            if (dataValues[i].Domain.toLowerCase() === document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()) {

//                if ($.inArray(dataValues[i].Keyword, getCheckedValues("keyword_checkbox")) > -1) {
//                    data.addRow([dataValues[i].Keyword, roundToTwo((dataValues[i].TotalParsed / dataValues[i].TotalCount) * 100), (roundToTwo((dataValues[i].TotalParsed / dataValues[i].TotalCount) * 100)).toString()]);
//                }
//            }
//        }

//        var view = new google.visualization.DataView(data);
//        view.setColumns([0, 1, 2]);

//        var options = {
//            title: '' + document.getElementById('snippet_keyword_bar_chart_dropdown').value + ' Keywords Counted/Parsed for 02/25/2015',
//            bars: 'horizontal', // Required for Material Bar Charts.
//            //height: (data.getNumberOfRows() * 50)
//        }

//        var chart = new google.visualization.BarChart(document.getElementById("snippet_keyword_chart"));

//        chart.draw(data, options);
//    }


//}

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



function getDomains(startDate, endDate, fn) {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "GetDomainList",
        traditional: true,
        data: {
            startDate: startDate,
            endDate: endDate
        },
        success: function (domainList) {

            console.log(domainList[0].toString());
            //domainDropdownList = domainList;
            //console.log(domainDropdownList[0].toString());
            fn(domainList);


        },
        error: function () {
            alert("Error loading domains! Please try again.");
        }
    });

}

//function getReadDomains() {


//    return domainDropdownList;

//}

function populateDomainDropdown(domainlist) {
    domainlist = domainlist.sort();
    var snippetDropdownPopulate = "";

    for (var i = 0; i < domainlist.length; i++) {
        if (dataValues[i].Domain.toLowerCase() === domainlist[i].toLowerCase()) {
            snippetDropdownPopulate += "<option selected>" + capitalizeFirstLetter(domainlist[i]) + "</option>";
        } else {
            snippetDropdownPopulate += "<option>" + capitalizeFirstLetter(domainlist[i]) + "</option>";
        }
    }

    $("#snippet_keyword_bar_chart_dropdown").html(snippetDropdownPopulate);
}

function populateKeywordData(domain, startDate, endDate, initialization) {
    populateNewKeywords(domain, startDate, endDate, function (d) {
        keywordMenuList = d;
        //var snippetCheckbox = keywordMenuList;
        var snippetCheckbox = [];
        var indexCheck = true;
        for (var x = 0; x < keywordMenuList.length; x++) {

            indexCheck = true;
            if (keywordMenuList[x]) {
                for (var y = 0; y < keywordExcludeList.length; y++) {
                    if (keywordMenuList[x].toLowerCase().indexOf(keywordExcludeList[y].toLowerCase()) >= 0) {
                        indexCheck = false;
                    }
                }
            }

            if (indexCheck) {
                snippetCheckbox.push(keywordMenuList[x]);
            }

        }

        var snippetCheckboxPopulate = "";
        var keywordDataPopulate = "";

        for (var i = 0; i < snippetCheckbox.length; i++) {
            if (snippetCheckbox[i]) {
                //var indexCheck = true;
                //for (var x = 0; x < keywordExcludeList.length; x++) {
                //    if (snippetCheckbox[i].toLowerCase().indexOf(keywordExcludeList[x].toLowerCase()) >= 0) {
                //        indexCheck = false;
                //        console.log(keywordExcludeList[x] + " " + indexCheck.toString());
                //    }
                //}
                //if (indexCheck) {
                    if (initialization && dataValues[0].Keyword.toLowerCase() == snippetCheckbox[i].toLowerCase()) {
                        snippetCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + snippetCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '" checked>' + snippetCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</label></div>';
                    } else if (initialization) {
                        snippetCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + snippetCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '">' + snippetCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</label></div>';
                    } else if (i == 0) {
                        snippetCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + snippetCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '" checked>' + snippetCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</label></div>';
                    } else {
                        snippetCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + snippetCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '">' + snippetCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</label></div>';
                    }
                    if (dataValues[0].Keyword.toLowerCase() == snippetCheckbox[i].toLowerCase()) {
                        keywordDataPopulate += "<option selected>" + snippetCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</option>";
                    } else {
                        keywordDataPopulate += "<option>" + snippetCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</option>";
                    }
                //} else {
                //    snippetCheckbox.splice(i, 1);
                //    i--;
                //}
            }
            //else {
            //    console.log(snippetCheckbox[i].Keyword);
            //}

        }

        $("#snippet_keyword_list").html(snippetCheckboxPopulate);
        $("#snippet_keyword_data_dropdown").html(keywordDataPopulate);
    }); 

    //var snippetCheckbox = getNewKeywords(domain);

    //var snippetCheckboxPopulate = "";
    //var keywordDataPopulate = "";
    //for (var i = 0; i < snippetCheckbox.length; i++) {
    //    if (i == 0) {
    //        snippetCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + snippetCheckbox[i].replace(/"/g, '&quot;') + '" checked>' + snippetCheckbox[i].replace(/"/g, '&quot;') + '</label></div>';
    //    } else {
    //        snippetCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + snippetCheckbox[i].replace(/"/g, '&quot;') + '">' + snippetCheckbox[i].replace(/"/g, '&quot;') + '</label></div>';
           
    //    }
    //    keywordDataPopulate += "<option>" + snippetCheckbox[i].replace(/"/g, '&quot;') + "</option>";
    //}
    //debugger;
    //$("#snippet_keyword_list").html(snippetCheckboxPopulate);
    //$("#snippet_keyword_data_dropdown").html(keywordDataPopulate);
}

function populateNewKeywords(domain, startDate, endDate, fn) {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "GetKeywords",
        traditional: true,
        data: {
            domain: domain,
            startDate: startDate,
            endDate: endDate
        },
        success: function (keywordList) {
            // Callback that creates and populates a data table,    
            // instantiates the pie chart, passes in the data and    
            // draws it. 
            //console.log(keywordList[0].toString());
            //keywordMenuList = keywordList;
            //console.log(keywordMenuList[0].toString());
            fn(keywordList);

        },
        error: function () {
            alert("Error populating keywords! Please try again.");
        }
    });
}

function getNewKeywords(keywordList) {

    return keywordList;

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


function drawDomainLine(domainName, startDate, endDate) {
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
            endDate: endDate
            // keywordList: getNewKeywords(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase())
            //keywordList: keywordMenuList
            //countCheck: checked
        },
        success: function (chartsdata) {

            // Callback that creates and populates a data table,    
            // instantiates the pie chart, passes in the data and    
            // draws it. 
            drawDomainLineChart(chartsdata, globalStartDate, globalEndDate);

        },
        error: function () {
            alert("Error loading data! Please try again.");

        }
    });
}

function drawSnippetLine(domainName, keywordList, startDate, endDate) {
    var checked = true;
    if (document.getElementById('keyword_percentages').checked) {
        checked = false;
    }

    for (var i = 0; i < keywordList.length; i++) {
        keywordList[i] = encodeURIComponent(keywordList[i]);

    }

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "getColumnFormatData",
        traditional: true,
        data: {
            domain: domainName,
            startDay: startDate,
            endDate: endDate,
            // keywordList: getNewKeywords(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase())
            keywordList: keywordList,
            countCheck: checked
},
        success: function (chartsdata) {

            // Callback that creates and populates a data table,    
            // instantiates the pie chart, passes in the data and    
            // draws it. 
            drawKeywordLine(chartsdata);

        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}

function drawKeywordInfo(domainName, keyword, startDate, endDate) {

    keyword = encodeURIComponent(keyword);


    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "GetKeywordData",
        traditional: true,
        data: {
            domain: domainName,
            keyword: keyword,
            startDay: startDate,
            endDate: endDate
        },
        success: function (keywordData) {
 
            var keywordInfo = keywordData;
            
            var tableHeaderPopulate = "<thead><tr><th>Date</th><th>Domain</th><th>Keyword</th><th>Total Seen</th><th>Total Parsed</th><th>Percent Parsed</th><th>Birthyears Parsed</th><th>Genders Parsed</th><th>Names Parsed</th><th>Usernames Parsed</th><th>Emails Parsed</th></tr></thead>";
            var tableBodyPopulate = "<tbody>";

            for (var i = 0; i < keywordData.length; i++) {
                if (keywordData[i][0] == null) {
                    tableBodyPopulate += '<tr><td>' + keywordData[i][0] + '</td><td>' + domainName + '</td><td>' + decodeURIComponent(keyword).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + "</td></tr>";

                } else {
                    tableBodyPopulate += '<tr><td>' + keywordData[i][0] + '</td><td>' + domainName + '</td><td>' + decodeURIComponent(keyword).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</td><td>' + keywordData[i][1] + '</td><td>' + keywordData[i][2] + '</td><td>' + roundToTwo(parseFloat(keywordData[i][2]) / parseFloat(keywordData[i][1]) * 100) + '</td><td>' + keywordData[i][3] + '</td><td>' + keywordData[i][4] + '</td><td>' + keywordData[i][5] + '</td><td>' + keywordData[i][6] + '</td><td>' + keywordData[i][7] + "</td></tr>";
                }
                //                tableBodyPopulate += '<tr><td>' + domainList[i][0] + '</td><td>' + domainName + '</td><td>' + keyword.replace(/"/g, '&quot;') + '</td><td>' + domainList[i][1] + '</td><td>' + domainList[i][2] + '</td><td>' + roundToTwo(parseFloat(domainList[i][2]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][3] + '</td><td>' + roundToTwo(parseFloat(domainList[i][3]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][4] + '</td><td>' + roundToTwo(parseFloat(domainList[i][4]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][5] + '</td><td>' + roundToTwo(parseFloat(domainList[i][5]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][6] + '</td><td>' + roundToTwo(parseFloat(domainList[i][6]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][7] + '</td><td>' + roundToTwo(parseFloat(domainList[i][7]) / parseFloat(domainList[i][1]) * 100) + '</td></tr>';

                //'<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + newKeywords[i].replace(/"/g, '&quot;') + '" checked>' + newKeywords[i].replace(/"/g, '&quot;') + '</label></div>';
            }

            tableBodyPopulate += "</tbody>";


            $("#keyword_table").html(tableHeaderPopulate + "" + tableBodyPopulate);

            var data = new google.visualization.DataTable();
            var lineColors;

            if (document.getElementById('keyword_data_raw_counts').checked) {
                lineColors = ["#9E9E9E", "#0D47A1", "#D50000", "#1E88E5", "#4CAF50", "#FF9800", "#9C27B0"];
                data.addColumn('string', 'Date');
                data.addColumn('number', 'Total Seen');
                data.addColumn('number', 'Total Parsed');
                data.addColumn('number', 'Birthyears');
                data.addColumn('number', 'Genders');
                data.addColumn('number', 'Names');
                data.addColumn('number', 'Usernames');
                data.addColumn('number', 'Emails');

                for (var i = 0; i < keywordData.length; i++) {
                    if (keywordData[i] == null) {
                        data.addRow([keywordData[i][0], 0, 0, 0, 0, 0, 0, 0]);
                    } else {
                        data.addRow([keywordData[i][0], parseInt(keywordData[i][1]), parseInt(keywordData[i][2]), parseInt(keywordData[i][3]), parseInt(keywordData[i][4]), parseInt(keywordData[i][5]), parseInt(keywordData[i][6]), parseInt(keywordData[i][7])]);
                    }
                }
            } else {
                lineColors = ["#0D47A1", "#D50000", "#1E88E5", "#4CAF50", "#FF9800", "#9C27B0"];
                data.addColumn('string', 'Date');
                data.addColumn('number', '% Parsed');
                data.addColumn('number', '% Birthyear');
                data.addColumn('number', '% Gender');
                data.addColumn('number', '% Name');
                data.addColumn('number', '% Username');
                data.addColumn('number', '% Email');
         
                for (var i = 0; i < keywordData.length; i++) {
                    if (keywordData[i] == null || parseFloat(keywordData[i][1]) == 0 || keywordData[i][1] == null) {
                        data.addRow([keywordData[i][0], 0, 0, 0, 0, 0, 0]);
                    } else {
                        data.addRow([keywordData[i][0], (parseInt(keywordData[i][2]) / parseFloat(keywordData[i][1]) * 100), (parseInt(keywordData[i][3]) / parseFloat(keywordData[i][1]) * 100), (parseInt(keywordData[i][4]) / parseFloat(keywordData[i][1]) * 100), (parseInt(keywordData[i][5]) / parseFloat(keywordData[i][1]) * 100), (parseInt(keywordData[i][6]) / parseFloat(keywordData[i][1]) * 100), (parseInt(keywordData[i][7]) / parseFloat(keywordData[i][1]) * 100)]);
                    }
                }
            }


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
                },
                colors: lineColors


        };

            var lineCheck = false;
            if (document.getElementById('toggle_keyword_line').checked) {
                lineCheck = true;
            }

            var chart;
            if (lineCheck) {
                chart = new google.visualization.LineChart(document.getElementById('keyword_data_bar'));
            } else {
                chart = new google.visualization.ColumnChart(document.getElementById('keyword_data_bar'));
            }

            //var chart = new google.visualization.ColumnChart(document.getElementById('keyword_data_bar'));

            chart.draw(data, options);

        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}


$(document).ready(function () {

    
    globalStartDate = startTimeValue;
    globalEndDate = endTimeValue;

    // Load domains from file
    //var dataValueDomains = getDomains("globalStartDate", globalEndDate);

    //getDomains(startTimeValue, endTimeValue, function(d) {
    //    domainDropdownList = d;
    //    populateDomainDropdown(d);


        
    //});

    populateDomainDropdown(domainNameList);

    //$("#snippet_keyword_bar_chart_dropdown").autocomplete({
    //    source: domainDropdownList,
    //    select: function (event, ui) {
    //        this.value = ui.item.value;
    //        $(this).trigger('change');
    //        return false;
    //    },
    //    change: populateKeywordData(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), globalStartDate, globalEndDate, false)
    //});

    //var testDomains = ["Google", "Facebook", "LinkedIn", "Go"];


    //var dataValueDomains = domainDropdownList;

    // Populate domain dropdown using read-in domains
    //populateDomainDropdown(domainDropdownList);


    // Populate initial keyword data
    populateKeywordData(dataValues[0].Domain.toLowerCase(), startTimeValue, endTimeValue, true);


    // Handle raw count/percentage toggle
    $("#keyword_raw_counts, #keyword_percentages").change(function () {
        drawSnippetLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), getCheckedValues("keyword_checkbox"), globalStartDate, globalEndDate);
    });

    $("#keyword_data_raw_counts, #keyword_data_percentages, #toggle_keyword_bar, #toggle_keyword_line").change(function () {
        drawKeywordInfo(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), document.getElementById('snippet_keyword_data_dropdown').value.toLowerCase(), globalStartDate, globalEndDate);
    });

    // Domain autocomplete
    //$("#snippet_keyword_bar_chart_dropdown").autocomplete({
    //    source: domainNameList
    //});

    // Update keyword list when new domain is chosen
    $("#snippet_keyword_bar_chart_dropdown").change(function () {
        populateKeywordData(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), globalStartDate, globalEndDate, false);
        //var newKeywords = getNewKeywords(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase());

        //var snippetCheckboxPopulate = "";
        //var keywordDropdownPopulate = "";
        //for (var i = 0; i < newKeywords.length; i++) {
        //    if (i == 0) {
        //        snippetCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + newKeywords[i].replace(/"/g, '&quot;') + '" checked>' + newKeywords[i].replace(/"/g, '&quot;') + '</label></div>';
        //    } else {
        //        snippetCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + newKeywords[i].replace(/"/g, '&quot;') + '">' + newKeywords[i].replace(/"/g, '&quot;') + '</label></div>';


        //    }
        //    keywordDropdownPopulate += "<option>" + newKeywords[i].replace(/"/g, '&quot;') + "</option>";
        //}

        //$("#snippet_keyword_list").html(snippetCheckboxPopulate);
        //$("#snippet_keyword_data_dropdown").html(keywordDropdownPopulate);
    });

    // Handle "Populate" button click
    $("#snippet_populate_button").click(function () {

        globalStartDate = document.getElementById('start_date').value;
        globalEndDate = document.getElementById('end_date').value;

        console.log('Global start change: ' + globalStartDate);
        console.log('Global end change: ' + globalEndDate);
        //console.log('Start: ' + globalStartDate);
        //console.log('End: ' + globalEndDate);
        //drawSnippetKeywordBar(dataValues);
        //drawSnippetCombo();
        //reloadData(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), "globalStartDate", globalEndDate);
        //populateKeywordData(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), globalStartDate, globalEndDate);
        populateKeywordData(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), globalStartDate, globalEndDate, false);
        drawSnippetLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), getCheckedValues("keyword_checkbox"), globalStartDate, globalEndDate);
        drawDomainLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), globalStartDate, globalEndDate);
        //$(".domain_name").html(capitalizeFirstLetter(document.getElementById('snippet_keyword_bar_chart_dropdown').value));
        drawKeywordInfo(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), document.getElementById('snippet_keyword_data_dropdown').value.toLowerCase(), globalStartDate, globalEndDate);
    });

    // Handle onclick changes to "Check/Uncheck All" buttons
    $('#snippet_keyword_checkall_button').click(function () {
        $("input:checkbox").prop('checked', true);
    });
    $('#snippet_keyword_uncheckall_button').click(function () {
        $("input:checkbox").prop('checked', false);
    });

    // When "Check/Uncheck All" buttons are clicked, refresh graph
    $("#snippet_keyword_checkall_button, #snippet_keyword_uncheckall_button").click(function () {
        drawSnippetLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), getCheckedValues("keyword_checkbox"), globalStartDate, globalEndDate);
    });

    // Handle show/hide toggle for keyword menu
    $('#toggle_keyword_line_nav').click(function () {
        $('#keyword_toolbar_container').toggle();
    });

    // Whenever a keyword is selected/unselected, refresh the graph
    $("#snippet_keyword_list").change(function () {
        drawSnippetLine(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), getCheckedValues("keyword_checkbox"), globalStartDate, globalEndDate);
        //var keywordTest = getCheckedValues("keyword_checkbox");
        //for (var i = 0; i < keywordTest.length; i++) {
        //    console.log(keywordTest[i]);
        //}
    });

    // Upon selecting a different keyword in the keyword info graph area, refresh graph
    $("#snippet_keyword_data_dropdown").change(function () {
        drawKeywordInfo(document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase(), document.getElementById('snippet_keyword_data_dropdown').value.toLowerCase(), globalStartDate, globalEndDate);
    });

    // Handle click animations for domain bar
    $(function () {
        $("#toggle_snippet_nav, #toggle_snippet_in_menu").click(function () {
            if ($("#snippet_nav_wrapper").hasClass("popped")) {
                $("#snippet_nav_wrapper").animate({ top: '-1000px' }, { queue: false, duration: 500 }).removeClass("popped");
                $("#toggle_snippet_nav").animate({ top: '10px' }, { queue: false, duration: 500 });
            } else {
                $("#snippet_nav_wrapper").animate({ top: "-1px" }, { queue: false, duration: 250 }).addClass("popped");
                $("#toggle_snippet_nav").animate({ top: '-50px' }, { queue: false, duration: 50 });
            }
        });
    });

    // Handle toggle for keyword table
    $("#toggle_keyword_chart").click(function () {
        $("#keyword_table").toggle();
    });

    // Handle keyword filter
    $('#keyword_filter_box').keyup(function () {
        var valThis = $(this).val().toLowerCase();
        if (valThis == "") {
            $('#snippet_keyword_list > div').show();
        } else {
            $('#snippet_keyword_list > div').each(function () {
                var text = $(this).text().toLowerCase();
                (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
            });
        };
    });

   

    // Initialize graphs
    drawSnippetLine(dataValues[0].Domain.toLowerCase(), [dataValues[0].Keyword], startTimeValue, endTimeValue);
    drawDomainLine(dataValues[0].Domain.toLowerCase(), startTimeValue, endTimeValue);
    //drawKeywordInfo(dataValues[0].Domain.toLowerCase(), document.getElementById('snippet_keyword_data_dropdown').value.toLowerCase(), startTimeValue, 7);
    drawKeywordInfo(dataValues[0].Domain.toLowerCase(), dataValues[0].Keyword, startTimeValue, endTimeValue);


    var dateString = maxTimeValue.toString();
    var y = dateString.substr(0, 4),
        m = dateString.substr(4, 2) - 1,
        d = dateString.substr(6, 2);

    var maximumDate = new Date(y, m, d);

    var dateString2 = minTimeValue.toString();
    var y = dateString2.substr(0, 4),
        m = dateString2.substr(4, 2) - 1,
        d = dateString2.substr(6, 2);

    var minimumDate = new Date(y, m, d);

    $('#start_date').datepicker({
        dateFormat: 'yymmdd',
        minDate: minimumDate,
        maxDate: maximumDate,
        onSelect: function (date) {
            var date1 = $('#start_date').datepicker('getDate');
            console.log("date1: " + date1);
            
            var date2 = $('#end_date').datepicker('getDate');
            console.log("date2: " + date2);
            
            if (date2 <= date1) {
                var addDays = 1;
                var addMs = addDays * 24 * 60 * 60 * 1000;
                date2.setTime(date1.getTime() + addMs);
                $('#end_date').datepicker('setDate', date2);
                //sets minDate to dt1 date + 1
            }
            
            console.log("Date diff: " + calcDiff(date1, date2));

            if (calcDiff(date1, date2) > 63) {
                alert("Date range too large! Please limit to a maximum span of 64 days. Your date parameters have been adjusted accordingly.");
                var addDays = 63;
                var addMs = addDays * 24 * 60 * 60 * 1000;
                date2.setTime(date1.getTime() + addMs);
                
                $('#end_date').datepicker('setDate', date2);
            }
            var addDaysMinDate = 1;
            var addMsMinDate = addDaysMinDate * 24 * 60 * 60 * 1000;
            date1.setTime(date1.getTime() + addMsMinDate);
            console.log("New date1: " + date1);
            $('#end_date').datepicker('option', 'minDate', date1);

        },
        onClose: function(date) {
            var date1 = $('#start_date').datepicker('getDate');
            console.log("date1: " + date1);

            var date2 = $('#end_date').datepicker('getDate');
            console.log("date2: " + date2);

            if (calcDiff(date1, date2) > 63) {
                var addDays = 63;
                var addMs = addDays * 24 * 60 * 60 * 1000;
                date2.setTime(date1.getTime() + addMs);

                $('#end_date').datepicker('setDate', date2);
            }
        }
    }).datepicker('setDate', globalStartDate.toString()).val();

    $("#start_date").change(function () {
        var date = document.getElementById('start_date').value.toLowerCase();
        console.log(date);
    });

    $('#end_date').datepicker({
        dateFormat: 'yymmdd',
        minDate: $('#start_date').datepicker('getDate'),
        maxDate: maximumDate,
        onSelect: function(date) {
            var date1 = $('#start_date').datepicker('getDate');
            console.log("date1: " + date1);

            var date2 = $('#end_date').datepicker('getDate');
            console.log("date2: " + date2);

            if (calcDiff(date1, date2) > 63) {
                alert("Date range too large! Please limit to a maximum span of 64 days. Your date parameters have been adjusted accordingly.");
                var addDays = 63;
                var addMs = addDays * 24 * 60 * 60 * 1000;
                date2.setTime(date1.getTime() + addMs);

                $('#end_date').datepicker('setDate', date2);
            }
        },
        onClose: function () {
            var dt1 = $('#start_date').datepicker('getDate');
            console.log("dt1: " + dt1);
            var dt2 = $('#end_date').datepicker('getDate');
            console.log("dt2: " + dt2);
            //check to prevent a user from entering a date below date of dt1
            if (dt2 <= dt1) {
                var minDate = $('#end_date').datepicker('option', 'minDate');
                $('#end_date').datepicker('setDate', minDate);
            }
        }
    }).datepicker('setDate', globalEndDate.toString()).val();

    $("#end_date").change(function () {
        var date = document.getElementById('end_date').value.toLowerCase();
        console.log(date);
    });
    


});
