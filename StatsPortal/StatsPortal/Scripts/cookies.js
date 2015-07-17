google.load("visualization", "1", { packages: ["corechart"] });
google.load("visualization", "1", { packages: ["line"] });
google.load("visualization", "1.1", { packages: ["bar"] });


var globalOptions = {
    titleTextStyle: {
        color: '#757575',
        fontSize: 16,
        bold: false
    },
    height: 400,
    legend: {
        position: 'bottom',
        textStyle: {
            color: '#757575',
            fontSize: 14,
            bold: false
        }
    },
    hAxis: {
        textStyle: {
            color: '#757575',
            fontSize: 12,
            bold: false
        }
    },
    vAxis: {
        textStyle: {
            color: '#757575',
            fontSize: 12,
            bold: false
        }
    },
    colors: ['#0F9D58', '#F4B400', '#4285F4', '#DB4437']
};

// Globals 
var domainDropdownList;
var keywordMenuList;

var globalStartDate = "";
var globalEndDate = "";


//function htmlEscape(str) {
//    return String(str)
//            .replace(/&/g, '&amp;')
//            .replace(/"/g, '&quot;')
//            .replace(/'/g, '&#39;')
//            .replace(/</g, '&lt;')
//            .replace(/>/g, '&gt;');
//}

function calcDiff(date1, date2) {
    
    var diff = 0;
    if (date1 && date2) {
        diff = Math.ceil((date2.getTime() - date1.getTime()) / 86400000);
    }
    debugger;

   return diff;
}

function getDomains(startDate, endDate, fn) {
    
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "GetDomains",
        traditional: true,
        data: {
            startDate: startDate,
            endDate: endDate
        },
        success: function (domainList) {

            fn(domainList);

        },
        error: function () {
            console.log("getDomains failed");
        }
    });

}


function populateDomainDropdown(domainList) {
    domainList = domainList.sort();
    var cookiesDropdownPopulate = "";
    for (var i = 0; i < domainList.length; i++) {
        if (dataValues[0].Domain.toLowerCase() === domainList[i].toLowerCase()) {
            cookiesDropdownPopulate += "<option selected>" + capitalizeFirstLetter(domainList[i]) + "</option>";
        } else {
            cookiesDropdownPopulate += "<option>" + capitalizeFirstLetter(domainList[i]) + "</option>";
        }
    }

    $("#cookies_keyword_bar_chart_dropdown").html(cookiesDropdownPopulate);
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

            fn(keywordList);

           
        },
        error: function () {
            console.log("populateKeywordData failed");
        }
    });
    
}

function populateKeywordData(domain, startDate, endDate, initialization) {
    populateNewKeywords(domain, startDate, endDate, function (d) {
        keywordMenuList = d;
        //var cookiesCheckbox = [];
        ////var cookiesCheckbox = getNewKeywords(domain);
        //cookiesCheckbox = keywordMenuList;


        var cookiesCheckbox = keywordMenuList;

        var cookiesCheckboxPopulate = "";
        var keywordDataPopulate = "";
        for (var i = 0; i < cookiesCheckbox.length; i++) {
            if (cookiesCheckbox[i]) {
                if (initialization && dataValues[0].Keyword.toLowerCase() == cookiesCheckbox[i].toLowerCase()) {
                    cookiesCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + cookiesCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '" checked>' + cookiesCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</label></div>';
                } else if (initialization) {
                    cookiesCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + cookiesCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '">' + cookiesCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</label></div>';

                } else if (i == 0) {
                    cookiesCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + cookiesCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '" checked>' + cookiesCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</label></div>';
                } else {
                    cookiesCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + cookiesCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '">' + cookiesCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</label></div>';
                }

                if (dataValues[0].Keyword.toLowerCase() == cookiesCheckbox[i].toLowerCase()) {
                    keywordDataPopulate += "<option selected>" + cookiesCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</option>";
                } else {
                    keywordDataPopulate += "<option>" + cookiesCheckbox[i].replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</option>";
                }
            }

        }

        $("#cookies_keyword_list").html(cookiesCheckboxPopulate);
        $("#cookies_keyword_data_dropdown").html(keywordDataPopulate);
    });

}


//function getCookieData(domain, keyword) {
//    $.ajax({
//        type: 'POST',
//        dataType: 'json',
//        url: "GetCookieData",
//        traditional: true,
//        data: {
//            domain: domain,
//            keyword: keyword,
//        },
//        success: function (cookieModelList) {


//        },
//        error: function () {
//            console.log("getCookieData failed");
//        }
//    });
//}

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

function drawDomainLineChart(domain, startDate, endDate) {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "GetDomainLineData",
        traditional: true,
        data: {
            domain: domain,
            startDay: startDate,
            endDate: endDate
        },
        success: function (dataPool) {

            var data = new google.visualization.DataTable();
            var lineColors = ["#9E9E9E", "#0D47A1", "#D50000", "#1E88E5", "#4CAF50", "#FF9800", "#9C27B0"];

            console.log("Getting cookie Data");

            var numRows = dataPool.length;
            var numCols = dataPool[0].length;

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

                    dataPool[i][j] = parseInt([dataPool[i][j]]);

                }
                data.addRow(dataPool[i]);
            }

            var options = globalOptions;
            options = {
                title: "Total Counts: " + capitalizeFirstLetter(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase()),
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
                // width: 1000,
                height: 500,
                colors: lineColors
            };

            var chart = new google.visualization.LineChart(document.getElementById('cookie_domain_line_chart'));
            //var chart = new google.charts.Line(document.getElementById('snippet_line_chart'));

            chart.draw(data, options);

        },
        error: function() {
            console.log("drawDomainLineChart failed");
        }
    });


}

function drawKeywordLineChart(domain, keywordList, startDay, endDate) {

    var countCheck = true;
    if (document.getElementById('keyword_percentages').checked) {
        countCheck = false;
    }

    for (var i = 0; i < keywordList.length; i++) {
        keywordList[i] = encodeURIComponent(keywordList[i]);

    }
 

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "GetKeywordLineData",
        traditional: true,
        data: {
            domain: domain,
            keywordList: keywordList,
            startDay: startDay,
            endDate: endDate,
            countCheck: countCheck
        },
        success: function (dataPool) {

            var data = new google.visualization.DataTable();

            var numRows = dataPool.length;
            var numCols = dataPool[0].length;

            data.addColumn('string', dataPool[0][0]);

            for (var i = 1; i < numCols; i++) {
                data.addColumn('number', dataPool[0][i]);
            }

            for (var i = 1; i < numRows; i++) {
                for (var j = 1; j < dataPool[i].length; j++) {
                    //if (document.getElementById('keyword_percentages').checked) {
                    //    dataPool[i][j] = parseFloat([dataPool[i][j]]);
                    //}
                    //else {
                        dataPool[i][j] = parseInt([dataPool[i][j]]);
                    //}
                }
                data.addRow(dataPool[i]);
            }

            var options = globalOptions;
            options = {
                title: "Total Seen by Keyword: " + capitalizeFirstLetter(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase()),
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
            var chart = new google.visualization.LineChart(document.getElementById('cookie_keyword_line_chart'));

            chart.draw(data, options);

        },
        error: function () {
            console.log("drawKeywordLineChart failed");
        }
    });


}

function drawKeywordBarTable(domain, keyword, startDay, endDate) {
    var countCheck = true;
    if (document.getElementById('keyword_data_percentages').checked) {
        countCheck = false;
    }

    keyword = encodeURIComponent(keyword);


    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "GetKeywordBarTableData",
        traditional: true,
        data: {
            domain: domain,
            keyword: keyword,
            startDay: startDay,
            endDate: endDate
        },
        success: function (keywordData) {

            var keywordInfo = keywordData;

            var tableHeaderPopulate = "<thead><tr><th>Date</th><th>Domain</th><th>Keyword</th><th>Total Seen</th><th>Total Parsed</th><th>Percent Parsed</th><th>Birthyears Parsed</th><th>Genders Parsed</th><th>Names Parsed</th><th>Usernames Parsed</th><th>Emails Parsed</th></tr></thead>";
            var tableBodyPopulate = "<tbody>";

            for (var i = 0; i < keywordData.length; i++) {
                if (keywordData[i][0] == null) {
                    tableBodyPopulate += '<tr><td>' + keywordData[i][0] + '</td><td>' + domain + '</td><td>' + decodeURIComponent(keyword).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + "</td></tr>";

                } else {
                    tableBodyPopulate += '<tr><td>' + keywordData[i][0] + '</td><td>' + domain + '</td><td>' + decodeURIComponent(keyword).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</td><td>' + keywordData[i][1] + '</td><td>' + keywordData[i][2] + '</td><td>' + roundToTwo(parseFloat(keywordData[i][2]) / parseFloat(keywordData[i][1]) * 100) + '</td><td>' + keywordData[i][3] + '</td><td>' + keywordData[i][4] + '</td><td>' + keywordData[i][5] + '</td><td>' + keywordData[i][6] + '</td><td>' + keywordData[i][7] + "</td></tr>";
                }
                //                tableBodyPopulate += '<tr><td>' + domainList[i][0] + '</td><td>' + domainName + '</td><td>' + keyword.replace(/"/g, '&quot;') + '</td><td>' + domainList[i][1] + '</td><td>' + domainList[i][2] + '</td><td>' + roundToTwo(parseFloat(domainList[i][2]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][3] + '</td><td>' + roundToTwo(parseFloat(domainList[i][3]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][4] + '</td><td>' + roundToTwo(parseFloat(domainList[i][4]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][5] + '</td><td>' + roundToTwo(parseFloat(domainList[i][5]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][6] + '</td><td>' + roundToTwo(parseFloat(domainList[i][6]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][7] + '</td><td>' + roundToTwo(parseFloat(domainList[i][7]) / parseFloat(domainList[i][1]) * 100) + '</td></tr>';

                //'<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + newKeywords[i].replace(/"/g, '&quot;') + '" checked>' + newKeywords[i].replace(/"/g, '&quot;') + '</label></div>';
            }

            tableBodyPopulate += "</tbody>";


            $("#keyword_table").html(tableHeaderPopulate + "" + tableBodyPopulate);

            var data = new google.visualization.DataTable();
            var lineColors;

            if (countCheck) {
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
                        data.addRow([(parseInt(startDay) + i).toString(), 0, 0, 0, 0, 0, 0, 0]);
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

            var options = globalOptions;
            options = {

                title: "Demo Stats by Keyword: " + capitalizeFirstLetter(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase()),
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
                chart = new google.visualization.LineChart(document.getElementById('cookie_keyword_bar_chart'));
            } else {
                chart = new google.visualization.ColumnChart(document.getElementById('cookie_keyword_bar_chart'));
            }

            chart.draw(data, options);

        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}

function initialize() {
    // Populate toolbar domain dropdown
    

    globalStartDate = startTimeValue;
    globalEndDate = endTimeValue;
    populateDomainDropdown(domainNameList);

    //getDomains(startTimeValue, endTimeValue, function (d) {
    //    //domainDropdownList = d;
    //    populateDomainDropdown(d);



    //});

    

    // Populate keyword checkboxes
    //populateKeywordData(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase());
    //populateKeywordData(dataValues.Domain);

    populateKeywordData(dataValues[0].Domain.toLowerCase(), startTimeValue, endTimeValue, true);

    
}

$(document).ready(function () {

    // Load domains, keywords, and graphs
    initialize();

    // Handle "Populate" buttom
    $("#cookies_populate_button").click(function () {

        globalStartDate = document.getElementById('start_date').value;
        globalEndDate = document.getElementById('end_date').value;

        console.log('Global start change: ' + globalStartDate);
        console.log('Global end change: ' + globalEndDate);

        populateKeywordData(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), globalStartDate, globalEndDate, false);

        // Replace ["all"] with GetCheckedKeywords
        drawDomainLineChart(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), globalStartDate, globalEndDate);

        // Replace ["all"] with GetCheckedKeywords
        drawKeywordLineChart(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), getCheckedValues("keyword_checkbox"), globalStartDate, globalEndDate);

        // Replace ["all"] with GetCheckedKeywords
        drawKeywordBarTable(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), document.getElementById('cookies_keyword_data_dropdown').value.toLowerCase(), globalStartDate, globalEndDate);
    });

    // Show/hide toggle for toobar
    $(function () {
        $("#toggle_cookies_nav, #toggle_cookies_in_menu").click(function () {
            if ($("#cookies_nav_wrapper").hasClass("popped")) {
                $("#cookies_nav_wrapper").animate({ top: '-1000px' }, { queue: false, duration: 500 }).removeClass("popped");
                $("#toggle_cookies_nav").animate({ top: '10px' }, { queue: false, duration: 500 });
            } else {
                $("#cookies_nav_wrapper").animate({ top: "-1px" }, { queue: false, duration: 250 }).addClass("popped");
                $("#toggle_cookies_nav").animate({ top: '-50px' }, { queue: false, duration: 50 });
            }
        });
    });

    // Handle show/hide toggle for keyword menu
    $('#toggle_keyword_line_nav').click(function () {
        $('#keyword_toolbar_container').toggle();
    });

    // Handle raw count/percentage toggle
    $("#keyword_raw_counts, #keyword_percentages").change(function () {
        drawKeywordLineChart(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), getCheckedValues("keyword_checkbox"), globalStartDate, globalEndDate);
    });

    $("#keyword_data_raw_counts, #keyword_data_percentages, #toggle_keyword_bar, #toggle_keyword_line").change(function () {
        drawKeywordBarTable(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), document.getElementById('cookies_keyword_data_dropdown').value.toLowerCase(), globalStartDate, globalEndDate);
    });

    // Update keyword list when new domain is chosen
    $("#cookies_keyword_bar_chart_dropdown").change(function () {
        populateKeywordData(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), globalStartDate, globalEndDate, false);
    });

    // Handle onclick changes to "Check/Uncheck All" buttons
    $('#cookies_keyword_checkall_button').click(function () {
        $("input:checkbox").prop('checked', true);
    });
    $('#cookies_keyword_uncheckall_button').click(function () {
        $("input:checkbox").prop('checked', false);
    });

    // When "Check/Uncheck All" buttons are clicked, refresh graph
    $("#cookies_keyword_checkall_button, #cookies_keyword_uncheckall_button").click(function () {
        drawKeywordLineChart(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), getCheckedValues("keyword_checkbox"), globalStartDate, globalEndDate);
    });

    // Whenever a keyword is selected/unselected, refresh the graph
    $("#cookies_keyword_list").change(function () {
        drawKeywordLineChart(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), getCheckedValues("keyword_checkbox"), globalStartDate, globalEndDate);
    });

    // Upon selecting a different keyword in the keyword info graph area, refresh graph
    $("#cookies_keyword_data_dropdown").change(function () {
        drawKeywordBarTable(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), document.getElementById('cookies_keyword_data_dropdown').value.toLowerCase(), globalStartDate, globalEndDate);
    });

    // Handle toggle for keyword table
    $("#toggle_keyword_chart").click(function () {
        $("#keyword_table").toggle();
    });

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
            debugger;
            var date2 = $('#end_date').datepicker('getDate');
            console.log("date2: " + date2);
            debugger;
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
        onSelect: function (date) {
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

    // Handle keyword filter
    $('#keyword_filter_box').keyup(function () {
        var valThis = $(this).val().toLowerCase();
        if (valThis == "") {
            $('#cookies_keyword_list > div').show();
        } else {
            $('#cookies_keyword_list > div').each(function () {
                var text = $(this).text().toLowerCase();
                (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
            });
        };
    });


    // Replace ["all"] with GetCheckedKeywords
    drawDomainLineChart(dataValues[0].Domain, startTimeValue, endTimeValue);

    console.log(startTimeValue);
    console.log(endTimeValue);
    // Replace ["all"] with GetCheckedKeywords
    drawKeywordLineChart(dataValues[0].Domain, [dataValues[0].Keyword], startTimeValue, endTimeValue);

    // Replace ["all"] with GetCheckedKeywords
    //drawKeywordBarTable(dataValues.Domain, dataValues.Keyword, startTimeValue, 7);
    drawKeywordBarTable(dataValues[0].Domain, dataValues[0].Keyword, startTimeValue, endTimeValue);

});