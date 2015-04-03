using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Reflection.Emit;
using System.Web;
using System.Web.Mvc;
using Microsoft.Ajax.Utilities;
using StatsPortal.Models;
using System.Data;
using System.Data.SqlClient;
using StatsPortal.DAL;
using StatsPortal.DAL.Repository;
using StatsPortal.Models;

namespace StatsPortal.Controllers
{
    public class SnippetController : Controller
    {

        private static SnippetViewModel model = new SnippetViewModel();

        public void Init()
        {

        }

        //public ActionResult Index()
        //{

        //}

        public ActionResult Snippet(string domain, string startDate, string endDate)
        {

            // Use the Connection factory to create connections to multiple databases.
            var factory = new ConnectionFactory("SAT04");
            IDbConnection conn = factory.CreateConnection();

            var snippetRepo = new SnippetsRepository(conn);

            if (domain.IsNullOrWhiteSpace())
            {
                domain = "aol";
            }

            if (startDate.IsNullOrWhiteSpace())
            {
                startDate = "20150301";
            }

            if (endDate.IsNullOrWhiteSpace())
            {
                endDate = "20150307";
            }

            //model.SnippetStats = LoadSnippetData();

            //DataTable dataPool = GetData(startDate, endDate);

            //SnippetModel[] stats = new SnippetModel[dataPool.Rows.Count];

            //for (int i = 0; i < stats.Length; i++)
            //{

            //    stats[i] = new SnippetModel();

            //    stats[i].Domain = dataPool.Rows[i][1].ToString();
            //    stats[i].Keyword = dataPool.Rows[i][2].ToString();
            //    stats[i].TotalCount = Convert.ToInt64(dataPool.Rows[i][3].ToString());
            //    stats[i].TotalParsed = Convert.ToInt64(dataPool.Rows[i][4].ToString());
            //    stats[i].EmailParsed = Convert.ToInt64(dataPool.Rows[i][5].ToString());
            //    stats[i].GenderParsed = Convert.ToInt64(dataPool.Rows[i][6].ToString());
            //    stats[i].BirthyearParsed = Convert.ToInt64(dataPool.Rows[i][7].ToString());
            //    stats[i].NameParsed = Convert.ToInt64(dataPool.Rows[i][8].ToString());
            //    stats[i].UsernameParsed = Convert.ToInt64(dataPool.Rows[i][9].ToString());
            //    stats[i].Date = dataPool.Rows[i][0].ToString();

            //}

            model.SnippetStats = snippetRepo.GetAll(domain, startDate, endDate).ToArray();
            
            return View(model);
        }

        //public JsonResult ReloadData(string domain, string startDate, string endDate)
        //{
        //    // Use the Connection factory to create connections to multiple databases.
        //    var factory = new ConnectionFactory("SAT04");
        //    IDbConnection conn = factory.CreateConnection();

        //    var snippetRepo = new SnippetsRepository(conn);

        //    if (domain.IsNullOrWhiteSpace())
        //    {
        //        domain = "aol";
        //    }

        //    if (startDate.IsNullOrWhiteSpace())
        //    {
        //        startDate = "20150301";
        //    }

        //    if (endDate.IsNullOrWhiteSpace())
        //    {
        //        endDate = "20150307";}

        

        //    model.SnippetStats = snippetRepo.GetAll(domain, startDate, endDate).ToArray();

        //    return Json(model.SnippetStats.First(), JsonRequestBehavior.AllowGet);
        //}

        //public DataTable GetData(string startDate, string endDate)
        //{
        //    // Create temp data table to be returned
        //    DataTable tempDataTable = new DataTable();

        //    // Create connection string
        //    string SQLConnectionString = "user id=hokie_prod;password=com321score;server=csiadsat04;database=Roster_Info";


        //    using (SqlConnection connection = new SqlConnection(SQLConnectionString))
        //    {

        //        // Open connection 
        //        connection.Open();


        //        List<string> testDates = new List<string>();
        //        testDates.Add(startDate);

        //        //for (int i = 1; i < (Convert.ToInt32(endDate) - Convert.ToInt32(startDate) + 1); i++)
        //        for (int i = 1; i < 7; i++)
        //        {
        //            testDates.Add((Convert.ToInt32(startDate) + i).ToString());
        //        }
        //        string test_query = "SELECT * FROM snippet_stats_v2 WITH (NOLOCK) WHERE i_handoff_date IN (";
        //        for (int i = 0; i < testDates.Count; i++)
        //        {
        //            if (i == testDates.Count - 1)
        //            {
        //                test_query += "'" + testDates[i] + "'";
        //            }
        //            else
        //            {
        //                test_query += "'" + testDates[i] + "',";
        //            }
        //        }

        //        test_query += ")";
        //        int testing = 0;

        //        using (SqlDataAdapter a = new SqlDataAdapter(test_query, connection))
        //        {
        //            DataTable t = new DataTable();
        //            a.Fill(t);
        //            tempDataTable = t;
        //        }

        //        connection.Close();

        //    }

        //    return tempDataTable;
        //}

        //private SnippetModel[] LoadSnippetData()
        //{
        //    SnippetModel[] stats = new SnippetModel[] { };

        //    if (stats.Length == 0)
        //    {
        //        List<string> lines =
        //            System.IO.File.ReadAllLines(@"\\csiadsat07\temp\cpearce\web_portal\test_files\snippet_counts_combined_v2.txt").ToList();


        //        lines.RemoveAll(item => item.Trim() == "");


        //        stats = new SnippetModel[lines.Count];

        //        for (int i = 0; i < lines.Count; i++)
        //        {
        //            string[] fields = lines[i].Split('\t');

        //            //if (fields[1].ToLower().Equals(domain.ToLower()) || domain.Equals("ALL"))
        //            //{

        //            stats[i] = new SnippetModel();

        //            stats[i].Domain = fields[1];
        //            stats[i].Keyword = fields[2];
        //            stats[i].TotalCount = Convert.ToInt64(fields[3]);
        //            stats[i].TotalParsed = Convert.ToInt64(fields[4]);
        //            stats[i].EmailParsed = Convert.ToInt64(fields[5]);
        //            stats[i].GenderParsed = Convert.ToInt64(fields[6]);
        //            stats[i].BirthyearParsed = Convert.ToInt64(fields[7]);
        //            stats[i].NameParsed = Convert.ToInt64(fields[8]);
        //            stats[i].UsernameParsed = Convert.ToInt64(fields[9]);
        //            stats[i].Date = fields[0];
        //            //}
        //        }
        //    }

        //    return stats;
        //}

        public string[] getColumns(SnippetModel[] data, string domain, string[] keywordList)
        {
            List<string> keywords = new List<string>();

            for (int i = 0; i < data.Length; i++)
            {
                if (data[i].Domain.ToLower().Equals(domain.ToLower()))
                {

                    int pos = -1;
                    if (keywordList != null)
                    {
                        pos = Array.IndexOf(keywordList.ToArray(), data[i].Keyword);
                    }
                        if (pos > -1)
                        {
                            if (!keywords.Contains(data[i].Keyword))
                            {
                                keywords.Add(data[i].Keyword);
                            }
                        }
                    
                }
            }

            int keywordCount = keywords.Count;

            string[] columns = new string[keywordCount + 1];

            columns[0] = "Date";

            for (int i = 1; i < (keywordCount + 1); i++)
            {
                columns[i] = keywords[i - 1];
            }

            return columns;

        }

        public JsonResult getColumnFormatData(string domain, string startDay, int days, string[] keywordList, bool countCheck)
        {
            //model.SnippetStats = LoadSnippetData();


            Dictionary<Tuple<string, string, string>, double> dict = new Dictionary<Tuple<string, string, string>, double>();
            for (int i = 0; i < model.SnippetStats.Length; i++)
            {
                if (model.SnippetStats[i].Domain.ToLower().Equals(domain.ToLower()))
                {
                    int pos = -1;
                    if (keywordList != null)
                    {
                        pos = Array.IndexOf(keywordList.ToArray(), model.SnippetStats[i].Keyword);
                    }
                        if (pos > -1)
                        {
                            if (!dict.ContainsKey(new Tuple<string, string, string>(model.SnippetStats[i].Domain,
                                model.SnippetStats[i].Keyword,
                                model.SnippetStats[i].Date)))
                            {
                                Tuple<string, string, string> tup =
                                    new Tuple<string, string, string>(model.SnippetStats[i].Domain,
                                        model.SnippetStats[i].Keyword,
                                        model.SnippetStats[i].Date);

                                if (countCheck)
                                {
                                    dict.Add(tup, Convert.ToDouble(model.SnippetStats[i].TotalCount));
                                }
                                else
                                {
                                    dict.Add(tup, (Convert.ToDouble(model.SnippetStats[i].TotalParsed) / Convert.ToDouble(model.SnippetStats[i].TotalCount)) * 100);
                                }
                            }
                        }
                    }
                
            }


            string[][] chartData = new string[days + 1][];
            chartData[0] = getColumns(model.SnippetStats, domain, keywordList);

            for (int i = 0; i < days; i++)
            {
                // Create row to be added
                string[] tempString = new string[chartData[0].Length];

                // Add the date to the first column
                string currentDate = (Convert.ToInt32(startDay) + i).ToString();;
                tempString[0] = currentDate;

                // Generate values for the rest of the columns
                for (int j = 1; j < chartData[0].Length; j ++)
                {
                    if (dict.ContainsKey(new Tuple<string, string, string>(domain, chartData[0][j], currentDate)))
                    {
                        tempString[j] =
                            dict[new Tuple<string, string, string>(domain, chartData[0][j], currentDate)].ToString();
                    }
                    else
                    {
                        tempString[j] = "0";
                    }
                }

                chartData[i + 1] = tempString;
            }

            

            
            return Json(chartData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getDomainLineData(string domain, string startDay, int days, string[] keywordList)
        {
            //model.SnippetStats = LoadSnippetData();


            Dictionary<Tuple<string, string, string>, long[]> dict = new Dictionary<Tuple<string, string, string>, long[]>();
            for (int i = 0; i < model.SnippetStats.Length; i++)
            {
                if (model.SnippetStats[i].Domain.ToLower().Equals(domain.ToLower()))
                {
                        if (!dict.ContainsKey(new Tuple<string, string, string>(model.SnippetStats[i].Domain,
                            model.SnippetStats[i].Keyword,
                            model.SnippetStats[i].Date)))
                        {
                            Tuple<string, string, string> tup =
                                new Tuple<string, string, string>(model.SnippetStats[i].Domain,
                                    model.SnippetStats[i].Keyword,
                                    model.SnippetStats[i].Date);


                            dict.Add(tup, new long[] { model.SnippetStats[i].NameParsed, model.SnippetStats[i].UsernameParsed, model.SnippetStats[i].GenderParsed, model.SnippetStats[i].BirthyearParsed, model.SnippetStats[i].EmailParsed, model.SnippetStats[i].TotalCount, model.SnippetStats[i].TotalParsed });

                        }
                    }
                

            }


            string[][] chartData = new string[days + 1][];
            chartData[0] = getColumns(model.SnippetStats, domain, keywordList);

            for (int i = 0; i < days; i++)
            {
                // Create row to be added
                string[] tempString = new string[8];
                long nameCount = 0;
                long usernameCount = 0;
                long genderCount = 0;
                long birthyearCount = 0;
                long emailCount = 0;
                long totalCount = 0;
                long totalParsed = 0;

                // Add the date to the first column
                string currentDate = (Convert.ToInt32(startDay) + i).ToString(); ;
                tempString[0] = currentDate;

                // Generate values for the rest of the columns
                for (int j = 1; j < chartData[0].Length; j++)
                {
                    if (dict.ContainsKey(new Tuple<string, string, string>(domain, chartData[0][j], currentDate)))
                    {
                        nameCount += dict[new Tuple<string, string, string>(domain, chartData[0][j], currentDate)][0];
                        usernameCount += dict[new Tuple<string, string, string>(domain, chartData[0][j], currentDate)][1];
                        genderCount += dict[new Tuple<string, string, string>(domain, chartData[0][j], currentDate)][2];
                        birthyearCount += dict[new Tuple<string, string, string>(domain, chartData[0][j], currentDate)][3];
                        emailCount += dict[new Tuple<string, string, string>(domain, chartData[0][j], currentDate)][4];
                        totalCount += dict[new Tuple<string, string, string>(domain, chartData[0][j], currentDate)][5];
                        totalParsed += dict[new Tuple<string, string, string>(domain, chartData[0][j], currentDate)][6];
                    }

                  
                }

                    tempString[1] = totalCount.ToString();
                    tempString[2] = totalParsed.ToString();
                    tempString[3] = nameCount.ToString();
                    tempString[4] = usernameCount.ToString();
                    tempString[5] = genderCount.ToString();
                    tempString[6] = birthyearCount.ToString();
                    tempString[7] = emailCount.ToString();



                chartData[i + 1] = tempString;
            }




            return Json(chartData, JsonRequestBehavior.AllowGet);
        }



        public JsonResult GetDomainList()
        {
            List<string> domainList = new List<string>();

            //List<string> lines =
            //    System.IO.File.ReadAllLines(@"\\csiadsat07\temp\cpearce\web_portal\test_files\snippet_counts_combined_v2.txt").ToList();


            //lines.RemoveAll(item => item.Trim() == "");

            for (int i = 0; i < model.SnippetStats.Length; i++)
            {
                if (!domainList.Contains(model.SnippetStats[i].Domain))
                {
                    domainList.Add(model.SnippetStats[i].Domain);
                }
            }

            domainList.Sort();



            return Json(domainList, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetKeywordData(string domain, string keyword, string startDay, int dayCount)
        {
            //model.SnippetStats = LoadSnippetData();

            string[][] fullKeywordData = new string[dayCount][];
            for (int j = 0; j < dayCount; j ++)
            {
                string currentDate = (Convert.ToInt32(startDay) + j).ToString();
                string[] keywordData = new string[8];
                for (int i = 0; i < model.SnippetStats.Length; i++)
                {
                    if (model.SnippetStats[i].Domain.ToLower().Equals(domain.ToLower()) && model.SnippetStats[i].Keyword.ToLower().Equals(keyword.ToLower()) && model.SnippetStats[i].Date.Equals(currentDate))
                    {
                        keywordData[0] = model.SnippetStats[i].Date;
                        keywordData[1] = model.SnippetStats[i].TotalCount.ToString();
                        keywordData[2] = model.SnippetStats[i].TotalParsed.ToString();
                        keywordData[3] = model.SnippetStats[i].EmailParsed.ToString();
                        keywordData[4] = model.SnippetStats[i].GenderParsed.ToString();
                        keywordData[5] = model.SnippetStats[i].BirthyearParsed.ToString();
                        keywordData[6] = model.SnippetStats[i].NameParsed.ToString();
                        keywordData[7] = model.SnippetStats[i].UsernameParsed.ToString();
                    }
                    fullKeywordData[j] = keywordData;
                }
            }


            return Json(fullKeywordData, JsonRequestBehavior.AllowGet);
        }

	}
}