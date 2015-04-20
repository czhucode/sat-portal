$(document).ready(function() {

});

SkEnum = {
    TotalPersonsCount : 'Total_count',
    MalePredictedCount : 'M_pred_count',
    FemalePredictedCount : 'F_pred_count',
    MalePredictedPercent : 'M_pred_perc',
    FemalePredictedPercent : 'F_pred_perc',
    YoungerPredictedCount : 'Y_pred_count',
    OlderPredictedCount : 'O_pred_count',
    YoungerPredictedPercent : 'Y_pred_perc',
    OlderPredictedPercent : 'O_pred_perc',
    Lambda : 'Lambda',
    Coef1Count : 'Coef_1_count',
    Coef2Count : 'Coef_2_count',
    Coef3Count : 'Coef_3_count',
    Coef4Count: 'Coef_4_count',
    Coef1CountBoth: 'Coef_1_count_both',
    Coef2CountBoth: 'Coef_2_count_both',
    Coef3CountBoth: 'Coef_3_count_both',
    Coef4CountBoth: 'Coef_4_count_both',
    ModelCount : 'Model_count',
    NoInfoCount : 'NI_count',
    SampleCount : 'Sample_count',
    ModelPercent : 'Model_perc',
    NoInfoPercent : 'NI_perc',
    SamplePercent : 'Sample_perc',
    TypeConfModelModelCount : 'type_conf_model_model_count',
    TypeConfModelNiCount : 'type_conf_model_NI_count',
    TypeConfModelSampleCount : 'type_conf_model_sample_count',
    TypeConfNiModelCount : 'type_conf_NI_model_count',
    TypeConfNiNiCount : 'type_conf_NI_NI_count',
    TypeConfNiSampleCount : 'type_conf_NI_sample_count',
    TypeConfSampleModelCount : 'type_conf_sample_model_count',
    TypeConfSampleNiCount : 'type_conf_sample_NI_count',
    TypeConfSampleSampleCount : 'type_conf_sample_sample_count',
    TypeConfModelModelPercent : 'type_conf_model_model_perc',
    TypeConfModelNiPercent : 'type_conf_model_NI_perc',
    TypeConfModelSamplePercent : 'type_conf_model_sample_perc',
    TypeConfNiModelPercent : 'type_conf_NI_model_perc',
    TypeConfNiNiPercent : 'type_conf_NI_NI_perc',
    TypeConfNiSamplePercent : 'type_conf_NI_sample_perc',
    TypeConfSampleModelPercent : 'type_conf_sample_model_perc',
    TypeConfSampleNiPercent : 'type_conf_sample_NI_perc',
    TypeConfSampleSamplePercent : 'type_conf_sample_sample_perc',
    TrainTrue1Count : 'Train_true_1_count',
    TrainTrue2Count : 'Train_true_2_count',
    TrainTrue3Count : 'Train_true_3_count',
    TrainTrue4Count : 'Train_true_4_count',
    TrainTrue1Percent : 'Train_true_1_perc',
    TrainTrue2Percent : 'Train_true_2_perc',
    TrainTrue3Percent : 'Train_true_3_perc',
    TrainTrue4Percent : 'Train_true_4_perc',
    TrainPred1Count : 'Train_pred_1_count',
    TrainPred2Count : 'Train_pred_2_count',
    TrainPred3Count : 'Train_pred_3_count',
    TrainPred4Count : 'Train_pred_4_count',
    TrainPred1Percent : 'Train_pred_1_perc',
    TrainPred2Percent : 'Train_pred_2_perc',
    TrainPred3Percent : 'Train_pred_3_perc',
    TrainPred4Percent: 'Train_pred_4_perc',
    CvAccuracy: 'cv_accuracy',
    CvConfT1P1Count : 'cv_conf_t1_p1_count',
    CvConfT1P2Count : 'cv_conf_t1_p2_count',
    CvConfT1P3Count : 'cv_conf_t1_p3_count',
    CvConfT1P4Count : 'cv_conf_t1_p4_count',
    CvConfT2P1Count : 'cv_conf_t2_p1_count',
    CvConfT2P2Count : 'cv_conf_t2_p2_count',
    CvConfT2P3Count : 'cv_conf_t2_p3_count',
    CvConfT2P4Count : 'cv_conf_t2_p4_count',
    CvConfT3P1Count : 'cv_conf_t3_p1_count',
    CvConfT3P2Count : 'cv_conf_t3_p2_count',
    CvConfT3P3Count : 'cv_conf_t3_p3_count',
    CvConfT3P4Count : 'cv_conf_t3_p4_count',
    CvConfT4P1Count : 'cv_conf_t4_p1_count',
    CvConfT4P2Count : 'cv_conf_t4_p2_count',
    CvConfT4P3Count : 'cv_conf_t4_p3_count',
    CvConfT4P4Count : 'cv_conf_t4_p4_count',
    CvConfT1P1Percent : 'cv_conf_t1_p1_perc',
    CvConfT1P2Percent : 'cv_conf_t1_p2_perc',
    CvConfT1P3Percent : 'cv_conf_t1_p3_perc',
    CvConfT1P4Percent : 'cv_conf_t1_p4_perc',
    CvConfT2P1Percent : 'cv_conf_t2_p1_perc',
    CvConfT2P2Percent : 'cv_conf_t2_p2_perc',
    CvConfT2P3Percent : 'cv_conf_t2_p3_perc',
    CvConfT2P4Percent : 'cv_conf_t2_p4_perc',
    CvConfT3P1Percent : 'cv_conf_t3_p1_perc',
    CvConfT3P2Percent : 'cv_conf_t3_p2_perc',
    CvConfT3P3Percent : 'cv_conf_t3_p3_perc',
    CvConfT3P4Percent : 'cv_conf_t3_p4_perc',
    CvConfT4P1Percent : 'cv_conf_t4_p1_perc',
    CvConfT4P2Percent : 'cv_conf_t4_p2_perc',
    CvConfT4P3Percent : 'cv_conf_t4_p3_perc',
    CvConfT4P4Percent : 'cv_conf_t4_p4_perc'
}

function drawPredictedGenderDistribution(dataValues, country) {
    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Week Id');
    data.addColumn('number', 'Male');
    data.addColumn('number', 'Female');

    var currentWeekId = getMaxWeekId(dataValues);
    var previousWeekId = currentWeekId - 1;

    for (var weekId = currentWeekId; weekId >= previousWeekId; weekId--) {
        var valMale = getDataValue(dataValues, country, SkEnum.MalePredictedCount, weekId);
        var valFemale = getDataValue(dataValues, country, SkEnum.FemalePredictedCount, weekId);

        // Add values to the DataTable
        data.addRow([weekId.toString(), valMale, valFemale]);
    }
    
    //data.addRow(currentWeekId, getDataValue(dataValues, country, SkEnum.MalePredictedCount, previousWeekId), getDataValue(dataValues, country, SkEnum.FemalePredictedCount, previousWeekId));

    // Sort the data
    data.sort([{ column: 0 }]);

    var options = {
        title: 'Predicted Gender Distribution',
        height: 400,
        legend: {
            position: 'right'
        },
        bar: { groupWidth: '75%' },
        isStacked: true,
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('predicted_gender'));
    chart.draw(data, options);
}

function drawPredictedAgeDistribution(dataValues, country) {
    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Week Id');
    data.addColumn('number', '7');
    data.addColumn('number', '10');

    var currentWeekId = getMaxWeekId(dataValues);
    var previousWeekId = currentWeekId - 1;

    for (var weekId = currentWeekId; weekId >= previousWeekId; weekId--) {
        var valYounger = getDataValue(dataValues, country, SkEnum.YoungerPredictedCount, weekId);
        var valOlder = getDataValue(dataValues, country, SkEnum.OlderPredictedCount, weekId);

        // Add values to the DataTable
        data.addRow([weekId.toString(), valYounger, valOlder]);
    }

    //data.addRow(currentWeekId, getDataValue(dataValues, country, SkEnum.MalePredictedCount, previousWeekId), getDataValue(dataValues, country, SkEnum.FemalePredictedCount, previousWeekId));

    // Sort the data
    data.sort([{ column: 0 }]);

    var options = {
        title: 'Age Prediction Summary',
        height: 400,
        legend: {
            position: 'right'
        },
        bar: { groupWidth: '75%' },
        isStacked: true,
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('predicted_age'));
    chart.draw(data, options);
}

function drawNumberOfNonZeroCoefficients(dataValues, country) {
    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'age_gender');
    data.addColumn('number', 'Previous Week');
    data.addColumn('number', 'Current Week');
    data.addColumn('number', 'In Both Weeks');

    var currentWeekId = getMaxWeekId(dataValues);
    var previousWeekId = currentWeekId - 1;

    for (var i = 1; i < 5; i++) {

        var prevWeek = 0;
        var currWeek = 0;
        var bothWeeks = 0;

        if (i == 1) {
            prevWeek = getDataValue(dataValues, country, SkEnum.Coef1Count, previousWeekId);
            currWeek = getDataValue(dataValues, country, SkEnum.Coef1Count, currentWeekId);
            bothWeeks = getDataValue(dataValues, country, SkEnum.Coef1CountBoth, currentWeekId);
        }

        if (i == 2) {
            prevWeek = getDataValue(dataValues, country, SkEnum.Coef2Count, previousWeekId);
            currWeek = getDataValue(dataValues, country, SkEnum.Coef2Count, currentWeekId);
            bothWeeks = getDataValue(dataValues, country, SkEnum.Coef2CountBoth, currentWeekId);
        }

        if (i == 3) {
            prevWeek = getDataValue(dataValues, country, SkEnum.Coef3Count, previousWeekId);
            currWeek = getDataValue(dataValues, country, SkEnum.Coef3Count, currentWeekId);
            bothWeeks = getDataValue(dataValues, country, SkEnum.Coef3CountBoth, currentWeekId);
        }

        if (i == 4) {
            prevWeek = getDataValue(dataValues, country, SkEnum.Coef4Count, previousWeekId);
            currWeek = getDataValue(dataValues, country, SkEnum.Coef4Count, currentWeekId);
            bothWeeks = getDataValue(dataValues, country, SkEnum.Coef4CountBoth, currentWeekId);
        }

        // Add values to the DataTable
        data.addRow([i.toString(), prevWeek, currWeek, bothWeeks]);
    }

    //data.addRow(currentWeekId, getDataValue(dataValues, country, SkEnum.MalePredictedCount, previousWeekId), getDataValue(dataValues, country, SkEnum.FemalePredictedCount, previousWeekId));

    // Sort the data
    data.sort([{ column: 0 }]);

    var options = {
        title: 'Number of Non-zero Coefficients',
        height: 400,
        legend: {
            position: 'right'
        },
        bar: { groupWidth: '75%' },
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('nonzero_coefficients'));
    chart.draw(data, options);
}

function drawAssignmentTypeDistribution(dataValues, country) {
    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Week Id');
    data.addColumn('number', 'Model');
    data.addColumn('number', 'No Information');
    data.addColumn('number', 'Sample');

    var currentWeekId = getMaxWeekId(dataValues);
    var previousWeekId = currentWeekId - 1;

    for (var weekId = currentWeekId; weekId >= previousWeekId; weekId--) {
        var valModelCnt = getDataValue(dataValues, country, SkEnum.ModelCount, weekId);
        var valNoInfoCnt = getDataValue(dataValues, country, SkEnum.NoInfoCount, weekId);
        var valSampleCnt = getDataValue(dataValues, country, SkEnum.SampleCount, weekId);

        // Add values to the DataTable
        data.addRow([weekId.toString(), valModelCnt, valNoInfoCnt, valSampleCnt]);
    }

    //data.addRow(currentWeekId, getDataValue(dataValues, country, SkEnum.MalePredictedCount, previousWeekId), getDataValue(dataValues, country, SkEnum.FemalePredictedCount, previousWeekId));

    // Sort the data
    data.sort([{ column: 0 }]);

    var options = {
        title: 'Assignment Type Distribution',
        height: 400,
        legend: {
            position: 'right'
        },
        bar: { groupWidth: '75%' },
        isStacked: true,
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('assignment_type_distribution'));
    chart.draw(data, options);
}

function drawTrueAndPredictedAgeGenderDistribution(dataValues, country) {
    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Week Id');
    data.addColumn('number', '1');
    data.addColumn('number', '2');
    data.addColumn('number', '3');
    data.addColumn('number', '4');

    var currentWeekId = getMaxWeekId(dataValues);
    var previousWeekId = currentWeekId - 1;

    for (var weekId = currentWeekId; weekId >= previousWeekId; weekId--) {
        // Populate True Counts
        var valTrue1Cnt = getDataValue(dataValues, country, SkEnum.TrainTrue1Percent, weekId);
        var valTrue2Cnt = getDataValue(dataValues, country, SkEnum.TrainTrue2Percent, weekId);
        var valTrue3Cnt = getDataValue(dataValues, country, SkEnum.TrainTrue3Percent, weekId);
        var valTrue4Cnt = getDataValue(dataValues, country, SkEnum.TrainTrue4Percent, weekId);

        // Populate Predicted Counts
        var valPred1Cnt = getDataValue(dataValues, country, SkEnum.TrainPred1Percent, weekId);
        var valPred2Cnt = getDataValue(dataValues, country, SkEnum.TrainPred2Percent, weekId);
        var valPred3Cnt = getDataValue(dataValues, country, SkEnum.TrainPred3Percent, weekId);
        var valPred4Cnt = getDataValue(dataValues, country, SkEnum.TrainPred4Percent, weekId);

        // Calculate the X-Axis Labes based on the date
        var label = weekId == currentWeekId ? 'Current' : (weekId == previousWeekId ? 'Previous' : 'Unknown');
        
        // Add values to the DataTable
        data.addRow([label + ' True', valTrue1Cnt, valTrue2Cnt, valTrue3Cnt, valTrue4Cnt]);
        data.addRow([label + ' Predicted', valPred1Cnt, valPred2Cnt, valPred3Cnt, valPred4Cnt]);
    }

    //data.addRow(currentWeekId, getDataValue(dataValues, country, SkEnum.MalePredictedCount, previousWeekId), getDataValue(dataValues, country, SkEnum.FemalePredictedCount, previousWeekId));

    // Sort the data
    data.sort([{ column: 0 }]);

    var options = {
        title: 'True And Predicted AgeGender Distribution',
        height: 400,
        legend: {
            position: 'right'
        },
        bar: { groupWidth: '75%' },
        isStacked: true,
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('true_and_predicted_age_gender_distribution'));
    chart.draw(data, options);
}

function drawLambda(dataValues, country) {
    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Week Id');
    data.addColumn('number', 'Lambda');

    var currentWeekId = getMaxWeekId(dataValues);
    var previousWeekId = currentWeekId - 1;

    for (var weekId = currentWeekId; weekId >= previousWeekId; weekId--) {
        var valLambda = getDataValue(dataValues, country, SkEnum.Lambda, weekId);

        // Add values to the DataTable
        data.addRow([weekId.toString(), valLambda]);
    }

    //data.addRow(currentWeekId, getDataValue(dataValues, country, SkEnum.MalePredictedCount, previousWeekId), getDataValue(dataValues, country, SkEnum.FemalePredictedCount, previousWeekId));

    // Sort the data
    data.sort([{ column: 0 }]);

    var options = {
        title: 'Lambda Value',
        height: 400,
        legend: {
            position: 'right'
        },
        bar: { groupWidth: '75%' }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('lambda_graph'));
    chart.draw(data, options);
}

function drawAccuracy(dataValues, country) {
    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Week Id');
    data.addColumn('number', 'Accuracy');

    var currentWeekId = getMaxWeekId(dataValues);
    var previousWeekId = currentWeekId - 1;

    for (var weekId = currentWeekId; weekId >= previousWeekId; weekId--) {
        var valAccuracy = getDataValue(dataValues, country, SkEnum.CvAccuracy, weekId);

        // Add values to the DataTable
        data.addRow([weekId.toString(), valAccuracy]);
    }

    //data.addRow(currentWeekId, getDataValue(dataValues, country, SkEnum.MalePredictedCount, previousWeekId), getDataValue(dataValues, country, SkEnum.FemalePredictedCount, previousWeekId));

    // Sort the data
    data.sort([{ column: 0 }]);

    var options = {
        title: 'Accuracy Value',
        height: 400,
        legend: {
            position: 'right'
        },
        bar: { groupWidth: '75%' }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('accuracy_graph'));
    chart.draw(data, options);
}

function getDataValue(dataValues, country, variable, weekId) {

    for (var i = 0; i < dataValues.length; i++) {
        if (dataValues[i].Country == country && dataValues[i].Variable == variable && dataValues[i].WeekId == weekId) {
            return dataValues[i].Value;
        }
    }
    return null;
}

function getMaxWeekId(dataValues) {
    var max;
    for (var i = 0 ; i < dataValues.length ; i++) {
        if (!max || parseInt(dataValues[i].WeekId) > parseInt(max))
            max = dataValues[i].WeekId;
    }
    return max;
}