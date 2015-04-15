using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class SKModel
    {

        public string Country { get; set; }
        public int WeekId { get; set; }
        public string Variable { get; set; }
        public string Description { get; set; }
        public double Value { get; set; }

    //    public enum Variables
    //    { 

    //    // Move to enum
    //    TotalPersonsCount { get; set; } // Total_count
    //    public int MalePredictedCount { get; set; } // M_pred_count
    //    public int FemalePredictedCount { get; set; } // F_pred_count
    //    public double MalePredictedPercent { get; set; } // M_pred_perc
    //    public double FemalePredictedPercent { get; set; } // F_pred_perc
    //    public int YoungerPredictedCount { get; set; } // Y_pred_count
    //    public int OlderPredictedCount { get; set; } // O_pred_count
    //    public double YoungerPredictedPercent { get; set; } // Y_pred_perc
    //    public double OlderPredictedPercent { get; set; } // O_pred_perc
    //    public double Lambda { get; set; } // Lambda
    //    public int Coef1Count { get; set; } // Coef_1_count
    //    public int Coef2Cuont { get; set; } // Coef_2_count
    //    public int Coef3Count { get; set; } // Coef_3_count
    //    public int Coef4Count { get; set; } // Coef_4_count
    //    // in both weeks added to CSV?
    //    public int ModelCount { get; set; } // Model_count
    //    public int NoInfoCount { get; set; } // NI_count
    //    public int SampleCount { get; set; } // Sample_count
    //    public double ModelPercent { get; set; } // Model_perc
    //    public double NoInfoPercent { get; set; } // NI_perc
    //    public double SamplePercent { get; set; } // Sample_perc
    //    public int TypeConfModelModelCount { get; set; } // type_conf_model_model_count
    //    public int TypeConfModelNiCount { get; set; } // type_conf_model_NI_count
    //    public int TypeConfModelSampleCount { get; set; } // type_conf_model_sample_count
    //    public int TypeConfNiModelCount { get; set; } // type_conf_NI_model_count
    //    public int TypeConfNiNiCount { get; set; } // type_conf_NI_NI_count
    //    public int TypeConfNiSampleCount { get; set; } // type_conf_NI_sample_count
    //    public int TypeConfSampleModelCount { get; set; } // type_conf_sample_model_count
    //    public int TypeConfSampleNiCount { get; set; } // type_conf_sample_NI_count
    //    public int TypeConfSampleSampleCount { get; set; } // type_conf_sample_sample_count
    //    public double TypeConfModelModelPercent { get; set; } // type_conf_model_model_perc
    //    public double TypeConfModelNiPercent { get; set; } // type_conf_model_NI_perc
    //    public double TypeConfModelSamplePercent { get; set; } // type_conf_model_sample_perc
    //    public double TypeConfNiModelPercent { get; set; } // type_conf_NI_model_perc
    //    public double TypeConfNiNiPercent { get; set; } // type_conf_NI_NI_perc
    //    public double TypeConfNiSamplePercent { get; set; } // type_conf_NI_sample_perc
    //    public double TypeConfSampleModelPercent { get; set; } // type_conf_sample_model_perc
    //    public double TypeConfSampleNiPercent { get; set; } // type_conf_sample_NI_perc
    //    public double TypeConfSampleSamplePercent { get; set; } // type_conf_sample_sample_perc
    //    public int TrainTrue1Count { get; set; } // Train_true_1_count
    //    public int TrainTrue2Count { get; set; } // Train_true_2_count
    //    public int TrainTrue3Count { get; set; } // Train_true_3_count
    //    public int TrainTrue4Count { get; set; } // Train_true_4_count
    //    public double TrainTrue1Percent { get; set; } // Train_true_1_perc
    //    public double TrainTrue2Percent { get; set; } // Train_true_2_perc
    //    public double TrainTrue3Percent { get; set; } // Train_true_3_perc
    //    public double TrainTrue4Percent { get; set; } // Train_true_4_perc
    //    public int TrainPred1Count { get; set; } // Train_pred_1_count
    //    public int TrainPred2Count { get; set; } // Train_pred_2_count
    //    public int TrainPred3Count { get; set; } // Train_pred_3_count
    //    public int TrainPred4Count { get; set; } // Train_pred_4_count
    //    public double TrainPred1Percent { get; set; } // Train_pred_1_perc
    //    public double TrainPred2Percent { get; set; } // Train_pred_2_perc
    //    public double TrainPred3Percent { get; set; } // Train_pred_3_perc
    //    public double TrainPred4Percent { get; set; } // Train_pred_4_perc
    //    public int CvConfT1P1Count { get; set; } // cv_conf_t1_p1_count
    //    public int CvConfT1P2Count { get; set; } // cv_conf_t1_p2_count
    //    public int CvConfT1P3Count { get; set; } // cv_conf_t1_p3_count
    //    public int CvConfT1P4Count { get; set; } // cv_conf_t1_p4_count
    //    public int CvConfT2P1Count { get; set; } // cv_conf_t2_p1_count
    //    public int CvConfT2P2Count { get; set; } // cv_conf_t2_p2_count
    //    public int CvConfT2P3Count { get; set; } // cv_conf_t2_p3_count
    //    public int CvConfT2P4Count { get; set; } // cv_conf_t2_p4_count
    //    public int CvConfT3P1Count { get; set; } // cv_conf_t3_p1_count
    //    public int CvConfT3P2Count { get; set; } // cv_conf_t3_p2_count
    //    public int CvConfT3P3Count { get; set; } // cv_conf_t3_p3_count
    //    public int CvConfT3P4Count { get; set; } // cv_conf_t3_p4_count
    //    public int CvConfT4P1Count { get; set; } // cv_conf_t4_p1_count
    //    public int CvConfT4P2Count { get; set; } // cv_conf_t4_p2_count
    //    public int CvConfT4P3Count { get; set; } // cv_conf_t4_p3_count
    //    public int CvConfT4P4Count { get; set; } // cv_conf_t4_p4_count
    //    public double CvConfT1P1Percent { get; set; } // cv_conf_t1_p1_perc
    //    public double CvConfT1P2Percent { get; set; } // cv_conf_t1_p2_perc
    //    public double CvConfT1P3Percent { get; set; } // cv_conf_t1_p3_perc
    //    public double CvConfT1P4Percent { get; set; } // cv_conf_t1_p4_perc
    //    public double CvConfT2P1Percent { get; set; } // cv_conf_t2_p1_perc
    //    public double CvConfT2P2Percent { get; set; } // cv_conf_t2_p2_perc
    //    public double CvConfT2P3Percent { get; set; } // cv_conf_t2_p3_perc
    //    public double CvConfT2P4Percent { get; set; } // cv_conf_t2_p4_perc
    //    public double CvConfT3P1Percent { get; set; } // cv_conf_t3_p1_perc
    //    public double CvConfT3P2Percent { get; set; } // cv_conf_t3_p2_perc
    //    public double CvConfT3P3Percent { get; set; } // cv_conf_t3_p3_perc
    //    public double CvConfT3P4Percent { get; set; } // cv_conf_t3_p4_perc
    //    public double CvConfT4P1Percent { get; set; } // cv_conf_t4_p1_perc
    //    public double CvConfT4P2Percent { get; set; } // cv_conf_t4_p2_perc
    //    public double CvConfT4P3Percent { get; set; } // cv_conf_t4_p3_perc
    //    public double CvConfT4P4Percent { get; set; } // cv_conf_t4_p4_perc
    //}
}
}