//google.load("visualization", "1", { packages: ["corechart"] });
//google.load("visualization", "1", { packages: ["line"] });

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function roundToTwo(value) {
    return (Math.round(value * 100) / 100);
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

//function drawSnippetLineChart(datavalues) {

//    var data = new google.visualization.DataTable();
//    data.addColumn('string', 'Date');
//    data.addColumn('number', 'Google');
//    data.addColumn('number', 'Facebook');
//    data.addColumn('number', 'YouTube');

//    data.addRows([
//      ["20150213", 2277376, 9537435, 2060438],
//      ["20150214", 2264598, 9532156, 2165894],
//      ["20150215", 2204588, 9032156, 2215854],
//      ["20150216", 2014589, 8999843, 2185963],
//      ["20150217", 2189659, 9004568, 2205482],
//      ["20150218", 2203655, 9098756, 2208945],
//      ["20150219", 2215689, 9105489, 2215900],
//      ["20150220", 2204983, 9099875, 2205489],
//      ["20150221", 1236548, 9102235, 2211598],
//      ["20150222", 1596489, 8854862, 2210569],
//      ["20150223", 2210059, 8869845, 2211003],
//      ["20150224", 2265897, 8964553, 2199986],
//      ["20150225", 2245689, 9000548, 2205489],
//      ["20150226", 2245698, 9004586, 2212354]
//    ]);

//    var options = {
//        chart: {
//            title: 'Snippets Parsed',
//            //subtitle: 'in millions of dollars (USD)'
//        },
//    };

//    var chart = new google.charts.Line(document.getElementById('snippet_line_chart'));

//    chart.draw(data, options);

//}


////function drawSnippetKeywordBarPercent(dataValues) {

////    var data = new google.visualization.DataTable();

////    data.addColumn('string', 'Keyword');
////    data.addColumn('number', 'Percent Parsed');

////    for (var i = 0; i < dataValues.length; i++) {
////        if (dataValues[i].Domain.toLowerCase() === document.getElementById('snippet_keyword_bar_chart_dropdown').value.toLowerCase()) {

////            if ($.inArray(dataValues[i].Keyword, getCheckedValues("keyword_checkbox")) > -1) {
////                console.log((dataValues[i].LastDayTotalParsed / dataValues[i].LastDayTotalCount) * 100);
////                data.addRow([dataValues[i].Keyword, (dataValues[i].LastDayTotalParsed / dataValues[i].LastDayTotalCount) * 100]);
////            }
////        }
////    }

////    var options = {
////        title: '' + document.getElementById('snippet_keyword_bar_chart_dropdown').value + ' Keywords Counted/Parsed for 02/25/2015',
////        bars: 'horizontal', // Required for Material Bar Charts.
////        //height: (data.getNumberOfRows() * 50)
////    }

////    var chart = new google.visualization.BarChart(document.getElementById("snippet_keyword_chart_percent"));

////    chart.draw(data, options);
////}


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

//    drawSnippetKeywordBar(dataValues);

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
//        drawSnippetCombo();
//    });

//    $('#snippet_keyword_checkall_button').click(function () {
//        $("input:checkbox").prop('checked', true);
//    });
//    $('#snippet_keyword_uncheckall_button').click(function () {
//        $("input:checkbox").prop('checked', false);
//    });

//    $(function () {
//        $("#toggle_snippet_nav, #toggle_snippet_in_menu").click(function () {
//            if ($("#snippet_nav").hasClass("popped")) {
//                $("#snippet_nav").animate({ bottom: '-1000px' }, { queue: false, duration: 500 }).removeClass("popped");
//                $("#toggle_snippet_nav").animate({ bottom: '3%' }, { queue: false, duration: 500 });
//            } else {
//                $("#snippet_nav").animate({ bottom: "-1px" }, { queue: false, duration: 250 }).addClass("popped");
//                $("#toggle_snippet_nav").animate({ bottom: '-50px' }, { queue: false, duration: 50 });
//            }
//        });
//    });

//});

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
});

function collapseSubMenu2() {
    $('#sub_menu_2').toggleClass('hidden');
    if ($('#menu_2 a span').hasClass('glyphicon-plus')) {
        $('#menu_2 a span').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    } else {
        $('#menu_2 a span').removeClass('glyphicon-minus').addClass('glyphicon-plus');
    }
}

function collapseSubMenu1() {
    $('#sub_menu_1').toggleClass('hidden');
    if ($('#menu_1 a span').hasClass('glyphicon-plus')) {
        $('#menu_1 a span').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    } else {
        $('#menu_1 a span').removeClass('glyphicon-minus').addClass('glyphicon-plus');
    }
}