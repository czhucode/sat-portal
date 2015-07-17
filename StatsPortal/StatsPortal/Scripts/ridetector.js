google.load('visualization', '1.0', { packages: ['corechart', 'table'] });

function drawActiveMachineChanges(dataValues, week_delta) {
    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'CountryName');
    data.addColumn('number', 'MachinesCount');
    data.addColumn('number', 'ChangePercent');
    //data.addColumn('string', 'WeekDelta');
    data.addColumn('string', 'ComputerLocation');
    data.addColumn('number', 'MachinesCount');
    //data.addColumn('number', 'WeekID');

    var maxWeekID = getMaxWeekId(dataValues);
    var changePercent = 0;
    var machinesCount = 0;
    var weekDelta = "";
    var countryName = "";
    var computerLocation = "";
    var weekID = 0;

    for (var i = 0; i < dataValues.length; i++) {
        if (dataValues[i].WeekDelta == week_delta && dataValues[i].WeekID == maxWeekID) {
            changePercent = dataValues[i].ChangePercent * 0.01;
            machinesCount = dataValues[i].MachinesCount;
            weekDelta = dataValues[i].WeekDelta;
            countryName = dataValues[i].CountryName;//.substring(0, 2).toUpperCase();
            computerLocation = dataValues[i].ComputerLocation;
            weekID = maxWeekID;//we will always focus on the current week report
            data.addRow([countryName, machinesCount, changePercent, computerLocation, machinesCount]);
        }
    }

    var options = {
        //animation: { easing: 'inAndOut', startup: true, duration: 1500 },
        sizeAxis: {minSize: 6, maxSize: 25},
        title: 'Active Machines Change Event - ' + maxWeekID + 'w',
        titleTextStyle: {
            color: '#757575',
            fontSize: 16,
            bold: false
        },
        explorer: {
            actions: ['dragToZoom', 'rightClickToReset'],
            keepInBounds: true
        },

        hAxis: {
            title: 'Machines Count',
            logScale: false,   
            titleTextStyle: {
                color: '#757575',
                fontSize: 12,
                bold: false
            }
        },
        vAxis: {
            title: 'Change Percent',
            format: 'percent',
            logScale: false,
            titleTextStyle: {
                color: '#757575',
                fontSize: 12,
                bold: false
            }
        },

        bubble: { opacity:0.5, textStyle: { fontSize: 8, auraColor: 'none' } },
        chartArea: { height: '70%', width : '60%' },
        height: '50%',
        tooltip: { trigger: 'focus' }
    };

    var chart;
   
    // Instantiate the chart
    if (week_delta == '1') {
        chart = new google.visualization.BubbleChart(document.getElementById('active_machine_weekly'));
    }
    else {
        chart = new google.visualization.BubbleChart(document.getElementById('active_machine_monthly'));
    }

    //draw our chart, passing in some options.
    chart.draw(data, options);

    $("a[href='#active_machine_monthly']").one('shown.bs.tab', function () { drawActiveMachineChanges(dataValues, '4'); });
}
function drawActivePersonChanges(dataValues, week_delta){
    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'CountryName');
    data.addColumn('number', 'PersonsCount');
    data.addColumn('number', 'ChangePercent');
    //data.addColumn('string', 'WeekDelta');
    data.addColumn('string', 'ComputerLocation');
    data.addColumn('number', 'PersonsCount');
    //data.addColumn('number', 'WeekID');

    var maxWeekID = getMaxWeekId(dataValues);
    var changePercent = 0;
    var personsCount = 0;
    var weekDelta = "";
    var countryName = "";
    var computerLocation = "";
    var weekID = 0;

    for (var i = 0; i < dataValues.length; i++) {
        if (dataValues[i].WeekDelta == week_delta && dataValues[i].WeekID == maxWeekID) {
            changePercent = dataValues[i].ChangePercent * 0.01;
            personsCount = dataValues[i].PersonsCount;
            weekDelta = dataValues[i].WeekDelta;
            countryName = dataValues[i].CountryName;
            computerLocation = dataValues[i].ComputerLocation;
            weekID = maxWeekID;//we will always focus on the current week report
            data.addRow([countryName, personsCount, changePercent, computerLocation, personsCount]);
        }
    }

    var options = {
        //animation: { easing: 'inAndOut', startup: true, duration: 1500 },
        sizeAxis: { minSize: 6, maxSize: 25 },
        title: 'Active Persons Change Event - ' + maxWeekID + 'w',
        titleTextStyle: {
            color: '#757575',
            fontSize: 16,
            bold: false
        },
        explorer: {
            actions: ['dragToZoom', 'rightClickToReset'],
            keepInBounds: true
        },

        hAxis: {
            title: 'Persons Count',
            logScale: false,
            titleTextStyle: {
                color: '#757575',
                fontSize: 12,
                bold: false
            }
        },
        vAxis: {
            title: 'Change Percent',
            format: 'percent',
            logScale: false,
            titleTextStyle: {
                color: '#757575',
                fontSize: 12,
                bold: false
            }
        },

        bubble: { textStyle: { fontSize: 8, auraColor: 'none' } },
        chartArea: { height: '70%', width: '60%' },
        height: '50%',
        tooltip: { trigger: 'focus' }
    };

    var chart;

    // Instantiate the chart
    if (week_delta == '1') {
        chart = new google.visualization.BubbleChart(document.getElementById('active_person_weekly'));
    }
    else {
        chart = new google.visualization.BubbleChart(document.getElementById('active_person_monthly'));
    }

    //draw our chart, passing in some options.
    chart.draw(data, options);

    $("a[href='#active_person_monthly']").one('shown.bs.tab', function () { drawActivePersonChanges(dataValues, '4'); });

}
function drawActivePersonWithByChanges(dataValues, week_delta) {
    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'CountryName');
    data.addColumn('number', 'CurrentPercentWithBirthyearDemo');
    data.addColumn('number', 'BirthyearChangePercent');
    //data.addColumn('string', 'WeekDelta');
    data.addColumn('string', 'ComputerLocation');
    data.addColumn('number', 'CurrentPercentWithBirthyearDemo');
    //data.addColumn('number', 'WeekID');

    var maxWeekID = getMaxWeekId(dataValues);
    var changePercent = 0;
    var currentPercent = 0;
    var weekDelta = "";
    var countryName = "";
    var computerLocation = "";
    var weekID = 0;

    for (var i = 0; i < dataValues.length; i++) {
        if (dataValues[i].WeekDelta == week_delta && dataValues[i].WeekID == maxWeekID) {
            changePercent = dataValues[i].ByChangePercent * 0.01;
            currentPercent = dataValues[i].CurrPercentWithBy;
            weekDelta = dataValues[i].WeekDelta;
            countryName = dataValues[i].CountryName;
            computerLocation = dataValues[i].ComputerLocation;
            weekID = maxWeekID;//we will always focus on the current week report
            data.addRow([countryName, currentPercent, changePercent, computerLocation, currentPercent]);
        }
    }

    var options = {
        //animation: { easing: 'inAndOut', startup: true, duration: 1500 },
        sizeAxis: { minSize: 6, maxSize: 20 },
        title: 'Active Persons With Birthyear Change Event - ' + maxWeekID + 'w',
        titleTextStyle: {
            color: '#757575',
            fontSize: 16,
            bold: false
        },
        explorer: {
            actions: ['dragToZoom', 'rightClickToReset'],
            keepInBounds: true
        },

        hAxis: {
            title: 'Current Persons with Birthyear Percent',
            format: 'percent',
            logScale: false,
            minValue: 0.8,
            titleTextStyle: {
                color: '#757575',
                fontSize: 12,
                bold: false
            }
        },
        vAxis: {
            title: 'Person with Birthyear Change Percent',
            format: 'percent',
            logScale: false,
            titleTextStyle: {
                color: '#757575',
                fontSize: 12,
                bold: false
            }
        },

        bubble: { textStyle: { fontSize: 8, auraColor: 'none' } },
        chartArea: { height: '70%', width: '60%' },
        height: '50%',
        tooltip: { trigger: 'focus' }
    };

    var chart;

    // Instantiate the chart
    if (week_delta == '1') {
        chart = new google.visualization.BubbleChart(document.getElementById('active_person_withby_weekly'));
    }
    else {
        chart = new google.visualization.BubbleChart(document.getElementById('active_person_withby_monthly'));
    }

    //draw our chart, passing in some options.
    chart.draw(data, options);

    $("a[href='#active_person_withby_monthly']").one('shown.bs.tab', function () { drawActivePersonWithByChanges(dataValues, '4'); });

}
function drawActivePersonWithGenChanges(dataValues, week_delta) {
    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'CountryName');
    data.addColumn('number', 'CurrentPercentWithGenderDemo');
    data.addColumn('number', 'GenderChangePercent');
    //data.addColumn('string', 'WeekDelta');
    data.addColumn('string', 'ComputerLocation');
    data.addColumn('number', 'CurrentPercentWithGenderDemo');
    //data.addColumn('number', 'WeekID');

    var maxWeekID = getMaxWeekId(dataValues);
    var changePercent = 0;
    var currentPercent = 0;
    var weekDelta = "";
    var countryName = "";
    var computerLocation = "";
    var weekID = 0;

    for (var i = 0; i < dataValues.length; i++) {
        if (dataValues[i].WeekDelta == week_delta && dataValues[i].WeekID == maxWeekID) {
            changePercent = dataValues[i].GenChangePercent * 0.01;
            currentPercent = dataValues[i].CurrPercentWithGen ;
            weekDelta = dataValues[i].WeekDelta;
            countryName = dataValues[i].CountryName;
            computerLocation = dataValues[i].ComputerLocation;
            weekID = maxWeekID;//we will always focus on the current week report
            data.addRow([countryName, currentPercent, changePercent, computerLocation, currentPercent]);
        }
    }

    var options = {
        //animation: { easing: 'inAndOut', startup: true, duration: 1500 },
        sizeAxis: { minSize: 6, maxSize: 20 },
        title: 'Active Persons With Gender Change Event - ' + maxWeekID + 'w',
        titleTextStyle: {
            color: '#757575',
            fontSize: 16,
            bold: false
        },
        explorer: {
            actions: ['dragToZoom', 'rightClickToReset'],
            keepInBounds: true
        },

        hAxis: {
            title: 'Current Persons with Gender Percent',
            logScale: false,
            format: 'percent',
            minValue: 0.8,
            titleTextStyle: {
                color: '#757575',
                fontSize: 12,
                bold: false
            }
        },
        vAxis: {
            title: 'Person with Gender Change Percent',
            format: 'percent',
            logScale: false,
            titleTextStyle: {
                color: '#757575',
                fontSize: 12,
                bold: false
            }
        },

        bubble: { textStyle: { fontSize: 8, auraColor:'none' } },
        chartArea: { height: '70%', width: '60%' },
        height: '50%',
        tooltip: { trigger: 'focus' }
    };

    var chart;

    // Instantiate the chart
    if (week_delta == '1') {
        chart = new google.visualization.BubbleChart(document.getElementById('active_person_withgen_weekly'));
    }
    else {
        chart = new google.visualization.BubbleChart(document.getElementById('active_person_withgen_monthly'));
    }

    //draw our chart, passing in some options.
    chart.draw(data, options);

    $("a[href='#active_person_withgen_monthly']").one('shown.bs.tab', function () { drawActivePersonWithGenChanges(dataValues, '4'); });

}

function getMaxWeekId(dataValues) {
    var max;
    for (var i = 0 ; i < dataValues.length ; i++) {
        if (!max || parseInt(dataValues[i].WeekID) > parseInt(max))
            max = dataValues[i].WeekID;
    }
    return max;
}

function getWeekId() {
   //will add a function to get selected/entered week id here
}

function drawActiveMachineChanges_table(dataValues, week_delta) {
    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('number', 'ChangePercent %');
    data.addColumn('number', 'MachinesCount');
    //data.addColumn('string', 'WeekDelta');
    data.addColumn('string', 'CountryName');
    data.addColumn('string', 'ComputerLocation');
    data.addColumn('number', 'WeekID');

    var maxWeekID = getMaxWeekId(dataValues);
    var changePercent = 0;
    var machinesCount = 0;
    var weekDelta = "";
    var countryName = "";
    var computerLocation = "";
    var weekID = 0;

    for (var i = 0; i < dataValues.length; i++) {
        if (dataValues[i].WeekDelta == week_delta && dataValues[i].WeekID == maxWeekID) {
            changePercent = dataValues[i].ChangePercent;
            machinesCount = dataValues[i].MachinesCount;
            weekDelta = dataValues[i].WeekDelta;
            countryName = dataValues[i].CountryName;//.substring(0, 2).toUpperCase();
            computerLocation = dataValues[i].ComputerLocation;
            weekID = maxWeekID;//we will always focus on the current week report
            data.addRow([changePercent, machinesCount, countryName, computerLocation, weekID]);
        }
    }

    var options = { allowHtml: true, showRowNumber: false, width: '100%', height: '100%', sortColumn: 1, sortAscending: false };

    var chart;

    var formatter = new google.visualization.ColorFormat();
    formatter.addRange(0, 100, 'black', '#9FF781');
    formatter.addRange(-100, 0, 'black', '#F78181');
    formatter.format(data, 0);

    formatter = new google.visualization.NumberFormat({suffix: '%',fractionDigits:3});
    formatter.format(data, 0);

    // Instantiate the chart
    if (week_delta == '1') {
        chart = new google.visualization.Table(document.getElementById('active_machine_weekly'));
    }
    else {
        chart = new google.visualization.Table(document.getElementById('active_machine_monthly'));
    }

    //draw our chart, passing in some options.
    chart.draw(data, options);

    $("a[href='#active_machine_monthly']").one('shown.bs.tab', function () { drawActiveMachineChanges_table(dataValues, '4'); });
}

function drawActivePersonChanges_table(dataValues, week_delta) {
    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('number', 'ChangePercent %');
    data.addColumn('number', 'PersonsCount');
    //data.addColumn('string', 'WeekDelta');
    data.addColumn('string', 'CountryName');
    data.addColumn('string', 'ComputerLocation');
    data.addColumn('number', 'WeekID');

    var maxWeekID = getMaxWeekId(dataValues);
    var changePercent = 0;
    var personsCount = 0;
    var weekDelta = "";
    var countryName = "";
    var computerLocation = "";
    var weekID = 0;

    for (var i = 0; i < dataValues.length; i++) {
        if (dataValues[i].WeekDelta == week_delta && dataValues[i].WeekID == maxWeekID) {
            changePercent = dataValues[i].ChangePercent;
            personsCount = dataValues[i].PersonsCount;
            weekDelta = dataValues[i].WeekDelta;
            countryName = dataValues[i].CountryName;
            computerLocation = dataValues[i].ComputerLocation;
            weekID = maxWeekID;//we will always focus on the current week report
            data.addRow([changePercent, personsCount, countryName, computerLocation, weekID]);
        }
    }

    var options = { allowHtml: true, showRowNumber: false, width: '100%', height: '100%', sortColumn: 1, sortAscending: false };

    var chart;

    var formatter = new google.visualization.ColorFormat();
    formatter.addRange(0, 100, 'black', '#9FF781');
    formatter.addRange(-100, 0, 'black', '#F78181');
    formatter.format(data, 0);

    formatter = new google.visualization.NumberFormat({ suffix: '%', fractionDigits: 3 });
    formatter.format(data, 0);

    // Instantiate the chart
    if (week_delta == '1') {
        chart = new google.visualization.Table(document.getElementById('active_person_weekly'));
    }
    else {
        chart = new google.visualization.Table(document.getElementById('active_person_monthly'));
    }

    //draw our chart, passing in some options.
    chart.draw(data, options);

    $("a[href='#active_person_monthly']").one('shown.bs.tab', function () { drawActivePersonChanges_table(dataValues, '4'); });

}

function drawActivePersonWithByChanges_table(dataValues, week_delta) {
    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('number', 'BirthyearChangePercent %');
    data.addColumn('number', 'CurrentPercentWithBirthyearDemo %');
    //data.addColumn('string', 'WeekDelta');
    data.addColumn('string', 'CountryName');
    data.addColumn('string', 'ComputerLocation');
    data.addColumn('number', 'WeekID');

    var maxWeekID = getMaxWeekId(dataValues);
    var changePercent = 0;
    var currentPercent = 0;
    var weekDelta = "";
    var countryName = "";
    var computerLocation = "";
    var weekID = 0;

    for (var i = 0; i < dataValues.length; i++) {
        if (dataValues[i].WeekDelta == week_delta && dataValues[i].WeekID == maxWeekID) {
            changePercent = dataValues[i].ByChangePercent;
            currentPercent = dataValues[i].CurrPercentWithBy * 100;
            weekDelta = dataValues[i].WeekDelta;
            countryName = dataValues[i].CountryName;
            computerLocation = dataValues[i].ComputerLocation;
            weekID = maxWeekID;//we will always focus on the current week report
            data.addRow([changePercent, currentPercent, countryName, computerLocation, weekID]);
        }
    }

    var options = { allowHtml: true, showRowNumber: false, width: '100%', height: '100%', sortColumn: 1, sortAscending: false };

    var chart;

    var formatter = new google.visualization.ColorFormat();
    formatter.addRange(0, 100, 'black', '#9FF781');
    formatter.addRange(-100, 0, 'black', '#F78181');
    formatter.format(data, 0);

    formatter = new google.visualization.NumberFormat({ suffix: '%', fractionDigits: 3 });
    formatter.format(data, 0);
    formatter.format(data, 1);
    // Instantiate the chart
    if (week_delta == '1') {
        chart = new google.visualization.Table(document.getElementById('active_person_withby_weekly'));
    }
    else {
        chart = new google.visualization.Table(document.getElementById('active_person_withby_monthly'));
    }

    //draw our chart, passing in some options.
    chart.draw(data, options);

    $("a[href='#active_person_withby_monthly']").one('shown.bs.tab', function () { drawActivePersonWithByChanges_table(dataValues, '4'); });

}

function drawActivePersonWithGenChanges_table(dataValues, week_delta) {
    // Create the data table.
    var data = new google.visualization.DataTable();

    
    data.addColumn('number', 'GenderChangePercent %');
    data.addColumn('number', 'CurrentPercentWithGenderDemo %');
    //data.addColumn('string', 'WeekDelta');
    data.addColumn('string', 'CountryName');
    data.addColumn('string', 'ComputerLocation');
    data.addColumn('number', 'WeekID');

    var maxWeekID = getMaxWeekId(dataValues);
    var changePercent = 0;
    var currentPercent = 0;
    var weekDelta = "";
    var countryName = "";
    var computerLocation = "";
    var weekID = 0;

    for (var i = 0; i < dataValues.length; i++) {
        if (dataValues[i].WeekDelta == week_delta && dataValues[i].WeekID == maxWeekID) {
            changePercent = dataValues[i].GenChangePercent;
            currentPercent = dataValues[i].CurrPercentWithGen * 100;
            weekDelta = dataValues[i].WeekDelta;
            countryName = dataValues[i].CountryName;
            computerLocation = dataValues[i].ComputerLocation;
            weekID = maxWeekID;//we will always focus on the current week report
            data.addRow([changePercent, currentPercent, countryName, computerLocation, weekID]);
        }
    }

    var options = { allowHtml: true, showRowNumber: false, width: '100%', height: '100%', sortColumn: 1, sortAscending: false };

    var chart;

    var formatter = new google.visualization.ColorFormat();
    formatter.addRange(0, 100, 'white', '#9FF781');
    formatter.addRange(-100, 0, 'black', '#F78181');
    formatter.format(data, 0);

    formatter = new google.visualization.NumberFormat({ suffix: '%', fractionDigits: 3 });
    formatter.format(data, 0);
    formatter.format(data, 1);

    // Instantiate the chart
    if (week_delta == '1') {
        chart = new google.visualization.Table(document.getElementById('active_person_withgen_weekly'));
    }
    else {
        chart = new google.visualization.Table(document.getElementById('active_person_withgen_monthly'));
    }

    //draw our chart, passing in some options.
    chart.draw(data, options);

    $("a[href='#active_person_withgen_monthly']").one('shown.bs.tab', function () { drawActivePersonWithGenChanges_table(dataValues, '4'); });

}

