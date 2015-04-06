google.load("visualization", "1", { packages: ["corechart"] });
google.load("visualization", "1", { packages: ["line"] });
google.load("visualization", "1.1", { packages: ["bar"] });


function populateDomainDropdown() {
    
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "GetDomains",
        traditional: true,
        data:{},
        success: function (domainList) {

            var cookiesDropdownPopulate = "";
            for (var i = 0; i < domainList.length; i++) {
                if (domainList[i].toLowerCase() === dataValues.Domain.toLowerCase()) {
                    cookiesDropdownPopulate += "<option selected>" + capitalizeFirstLetter(domainList[i]) + "</option>";
                } else {
                    cookiesDropdownPopulate += "<option>" + capitalizeFirstLetter(domainList[i]) + "</option>";
                }
            }
            debugger;
            $("#cookies_keyword_bar_chart_dropdown").html(cookiesDropdownPopulate);

        },
        error: function () {
            console.log("populateDomainDropdown failed");
        }
    });

}


function populateKeywordData(domain) {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "GetKeywords",
        traditional: true,
        data: {
            domain: domain
        },
        success: function (keywordList) {

            //var cookiesCheckbox = getNewKeywords(domain);
            var cookiesCheckbox = keywordList;

            var cookiesCheckboxPopulate = "";
            var keywordDataPopulate = "";
            for (var i = 0; i < cookiesCheckbox.length; i++) {
                if (i == 0) {
                    cookiesCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + cookiesCheckbox[i].replace(/"/g, '&quot;') + '" checked>' + cookiesCheckbox[i].replace(/"/g, '&quot;') + '</label></div>';
                } else {
                    cookiesCheckboxPopulate += '<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + cookiesCheckbox[i].replace(/"/g, '&quot;') + '">' + cookiesCheckbox[i].replace(/"/g, '&quot;') + '</label></div>';

                }
                if (cookiesCheckbox[i].toString().toLowerCase === dataValues.Keyword.toString().toLowerCase) {
                    keywordDataPopulate += "<option selected>" + cookiesCheckbox[i].replace(/"/g, '&quot;') + "</option>";

                } else {
                    keywordDataPopulate += "<option>" + cookiesCheckbox[i].replace(/"/g, '&quot;') + "</option>";
                }
            }

            $("#cookies_keyword_list").html(cookiesCheckboxPopulate);
            $("#cookies_keyword_data_dropdown").html(keywordDataPopulate);

        },
        error: function () {
            console.log("populateKeywordData failed");
        }
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

function drawDomainLineChart(domain, keywordList, days, startDay) {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "GetDomainLineData",
        traditional: true,
        data: {
            domain: domain,
            keywordList: keywordList,
            days: days,
            startDay: startDay
        },
        success: function (dataPool) {

            var data = new google.visualization.DataTable();

            console.log("Getting cookie Data");

            var numRows = dataPool.length;
            var numCols = dataPool[0].length;

            data.addColumn('string', dataPool[0][0]);
            data.addColumn('number', "Seen");
            data.addColumn('number', "Parsed");
            data.addColumn('number', "Name");
            data.addColumn('number', "Username");
            data.addColumn('number', "Gender");
            data.addColumn('number', "Birthyear");
            data.addColumn('number', "Email");


            for (var i = 1; i < numRows; i++) {
                for (var j = 1; j < dataPool[i].length; j++) {

                    dataPool[i][j] = parseInt([dataPool[i][j]]);

                }
                data.addRow(dataPool[i]);
            }


            var options = {
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
                height: 500
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

function drawKeywordLineChart(domain, keywordList, days, startDay) {

    var countCheck = true;
    if (document.getElementById('keyword_percentages').checked) {
        countCheck = false;
    }

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "GetKeywordLineData",
        traditional: true,
        data: {
            domain: domain,
            keywordList: keywordList,
            days: days,
            startDay: startDay,
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


            var options = {
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

function drawKeywordBarTable(domain, keyword, startDay, days) {
    var countCheck = true;
    if (document.getElementById('keyword_data_percentages').checked) {
        countCheck = false;
    }

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "GetKeywordBarTableData",
        traditional: true,
        data: {
            domain: domain,
            keyword: keyword,
            startDay: startDay,
            days: days
        },
        success: function (keywordData) {

            var keywordInfo = keywordData;

            var tableHeaderPopulate = "<thead><tr><th>Date</th><th>Domain</th><th>Keyword</th><th>Total Seen</th><th>Total Parsed</th><th>Percent Parsed</th><th>Emails Parsed</th><th>Genders Parsed</th><th>Birthyears Parsed</th><th>Names Parsed</th><th>Usenames Parsed</th></tr></thead>";
            var tableBodyPopulate = "<tbody>";

            for (var i = 0; i < keywordData.length; i++) {
                if (keywordData[i][0] == null) {
                    tableBodyPopulate += '<tr><td>' + keywordData[i][0] + '</td><td>' + domain + '</td><td>' + keyword.replace(/"/g, '&quot;') + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + "</td></tr>";

                } else {
                    tableBodyPopulate += '<tr><td>' + keywordData[i][0] + '</td><td>' + domain + '</td><td>' + keyword.replace(/"/g, '&quot;') + '</td><td>' + keywordData[i][1] + '</td><td>' + keywordData[i][2] + '</td><td>' + roundToTwo(parseFloat(keywordData[i][2]) / parseFloat(keywordData[i][1]) * 100) + '</td><td>' + keywordData[i][3] + '</td><td>' + keywordData[i][4] + '</td><td>' + keywordData[i][5] + '</td><td>' + keywordData[i][6] + '</td><td>' + keywordData[i][7] + "</td></tr>";
                }
                //                tableBodyPopulate += '<tr><td>' + domainList[i][0] + '</td><td>' + domainName + '</td><td>' + keyword.replace(/"/g, '&quot;') + '</td><td>' + domainList[i][1] + '</td><td>' + domainList[i][2] + '</td><td>' + roundToTwo(parseFloat(domainList[i][2]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][3] + '</td><td>' + roundToTwo(parseFloat(domainList[i][3]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][4] + '</td><td>' + roundToTwo(parseFloat(domainList[i][4]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][5] + '</td><td>' + roundToTwo(parseFloat(domainList[i][5]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][6] + '</td><td>' + roundToTwo(parseFloat(domainList[i][6]) / parseFloat(domainList[i][1]) * 100) + '</td><td>' + domainList[i][7] + '</td><td>' + roundToTwo(parseFloat(domainList[i][7]) / parseFloat(domainList[i][1]) * 100) + '</td></tr>';

                //'<div class="checkbox"><label><input type="checkbox" class="keyword_checkbox" value="' + newKeywords[i].replace(/"/g, '&quot;') + '" checked>' + newKeywords[i].replace(/"/g, '&quot;') + '</label></div>';
            }

            tableBodyPopulate += "</tbody>";


            $("#keyword_table").html(tableHeaderPopulate + "" + tableBodyPopulate);

            var data = new google.visualization.DataTable();

            if (countCheck) {
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
                        data.addRow([(parseInt(startDay) + i).toString(), 0, 0, 0, 0, 0, 0, 0]);
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


            var options = {

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
                }

            };

            var chart = new google.visualization.ColumnChart(document.getElementById('cookie_keyword_bar_chart'));

            chart.draw(data, options);

        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}

function initialize() {
    // Populate toolbar domain dropdown
    populateDomainDropdown();

    // Populate keyword checkboxes
    //populateKeywordData(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase());
    populateKeywordData(dataValues.Domain);

    // Replace ["all"] with GetCheckedKeywords
    drawDomainLineChart(dataValues.Domain, ["all"], 7, startTimeValue);

    console.log(startTimeValue);
    console.log(endTimeValue);
    // Replace ["all"] with GetCheckedKeywords
    drawKeywordLineChart(dataValues.Domain, dataValues.Keyword, 7, startTimeValue);

    // Replace ["all"] with GetCheckedKeywords
    //drawKeywordBarTable(dataValues.Domain, dataValues.Keyword, startTimeValue, 7);
    drawKeywordBarTable(dataValues.Domain, dataValues.Keyword, startTimeValue, 7);
}

$(document).ready(function () {

    // Load domains, keywords, and graphs
    initialize();

    // Handle "Populate" buttom
    $("#cookies_populate_button").click(function () {

        populateKeywordData(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase());

        // Replace ["all"] with GetCheckedKeywords
        drawDomainLineChart(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), ["all"], 7, startTimeValue);

        // Replace ["all"] with GetCheckedKeywords
        drawKeywordLineChart(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), getCheckedValues("keyword_checkbox"), 7, startTimeValue);

        // Replace ["all"] with GetCheckedKeywords
        drawKeywordBarTable(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), document.getElementById('cookies_keyword_data_dropdown').value.toLowerCase(), startTimeValue, 7);
    });

    // Show/hide toggle for toobar
    $(function () {
        $("#toggle_cookies_nav, #toggle_cookies_in_menu").click(function () {
            if ($("#cookies_nav").hasClass("popped")) {
                $("#cookies_nav").animate({ top: '-1000px' }, { queue: false, duration: 500 }).removeClass("popped");
                $("#toggle_cookies_nav").animate({ top: '5%' }, { queue: false, duration: 500 });
            } else {
                $("#cookies_nav").animate({ top: "-1px" }, { queue: false, duration: 250 }).addClass("popped");
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
        drawKeywordLineChart(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), getCheckedValues("keyword_checkbox"), 7, startTimeValue);
    });

    $("#keyword_data_raw_counts, #keyword_data_percentages").change(function () {
        drawKeywordBarTable(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), document.getElementById('cookies_keyword_data_dropdown').value.toLowerCase(), startTimeValue, 7);
    });

    // Update keyword list when new domain is chosen
    $("#cookies_keyword_bar_chart_dropdown").change(function () {
        populateKeywordData(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase());
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
        drawKeywordLineChart(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), getCheckedValues("keyword_checkbox"), 7, startTimeValue);
    });

    // Whenever a keyword is selected/unselected, refresh the graph
    $("#cookies_keyword_list").change(function () {
        drawKeywordLineChart(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), getCheckedValues("keyword_checkbox"), 7, startTimeValue);
    });

    // Upon selecting a different keyword in the keyword info graph area, refresh graph
    $("#cookies_keyword_data_dropdown").change(function () {
        drawKeywordBarTable(document.getElementById('cookies_keyword_bar_chart_dropdown').value.toLowerCase(), document.getElementById('cookies_keyword_data_dropdown').value.toLowerCase(), startTimeValue, 7);
    });

    // Handle toggle for keyword table
    $("#toggle_keyword_chart").click(function () {
        $("#keyword_table").toggle();
    });


});