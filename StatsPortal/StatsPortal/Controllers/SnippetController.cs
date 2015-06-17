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

        //private static SnippetViewModel model = new SnippetViewModel();
        private SnippetModel[] snippetModel;

        public void Init()
        {

        }

        //public ActionResult Index()
        //{

        //}

        public ActionResult Snippet(string domain, string startDate, string endDate)
        {

            if (!startDate.IsNullOrWhiteSpace() && !endDate.IsNullOrWhiteSpace())
            {
                // Confirm valid date parameters
                if (
                    (DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null))
                        .Days > 64)
                {
                    endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(63).ToString("yyyyMMdd");
                }

                if (
                    (DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null))
                        .Days < 1)
                {
                    endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
                }
            }

            var model = new SnippetViewModel();

            DateTime end = new DateTime();
            DateTime start = new DateTime();

            // Use the Connection factory to create connections to multiple databases.
            var factory = new ConnectionFactory("SAT04");
            using (IDbConnection conn = factory.CreateConnection())
            {


                var snippetRepo = new SnippetsRepository(conn);

                if (domain.IsNullOrWhiteSpace())
                {
                    domain = "google";
                }

                //if (startDate.IsNullOrWhiteSpace())
                //{
                //    startDate = "20150301";
                //}

                //if (endDate.IsNullOrWhiteSpace())
                //{
                //    endDate = "20150307";
                //}
                end = DateTime.ParseExact(snippetRepo.GetMaxDate().ToString(), "yyyyMMdd", null);
                start = end.AddDays(-30);

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

                //var snippetData = snippetRepo.GetAll(domain, startDate, endDate).ToArray();
                model.SnippetStats = ReloadData(domain, startDate, endDate);
                model.startDate = start.ToString("yyyyMMdd");
                model.endDate = end.ToString("yyyyMMdd");
                model.maxDate = end.ToString("yyyyMMdd");
                model.minDate = DateTime.ParseExact(snippetRepo.GetMinDate().ToString(), "yyyyMMdd", null).ToString("yyyyMMdd");
                //model.domainList = snippetRepo.GetDomains(start.ToString("yyyyMMdd"), end.ToString("yyyyMMdd")).ToList();
            }

            return View(model);
        }

        private SnippetModel[] ReloadData(string domain, string startDate, string endDate)
        {

            if (!startDate.IsNullOrWhiteSpace() && !endDate.IsNullOrWhiteSpace())
            {
                // Confirm valid date parameters
                if (
                    (DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null))
                        .Days > 64)
                {
                    endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(63).ToString("yyyyMMdd");
                }

                if (
                    (DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null))
                        .Days < 1)
                {
                    endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
                }

                if (Convert.ToInt32(startDate) > Convert.ToInt32(endDate))
                {
                    startDate = "";
                    endDate = "";
                }
            }

            var model = new SnippetViewModel();
            DateTime end = new DateTime();
            DateTime start = new DateTime();
            // Use the Connection factory to create connections to multiple databases.
            var factory = new ConnectionFactory("SAT04");
            using (IDbConnection conn = factory.CreateConnection())
            {
                
                var snippetRepo = new SnippetsRepository(conn);

                if (domain.IsNullOrWhiteSpace())
                {
                    domain = "google";
                }

                
                if (String.IsNullOrEmpty(endDate))
                {
                    end = DateTime.ParseExact(snippetRepo.GetMaxDate().ToString(), "yyyyMMdd", null);
                }
                else
                {
                    end = DateTime.ParseExact(endDate, "yyyyMMdd", null);
                }
                if (String.IsNullOrEmpty(startDate))
                {
                    start = end.AddDays(-30);
                }
                else
                {
                    start = DateTime.ParseExact(startDate, "yyyyMMdd", null);
                }



                model.SnippetStats = snippetRepo.GetAll(domain, start.ToString("yyyyMMdd"), end.ToString("yyyyMMdd")).ToArray();
                model.startDate = start.ToString("yyyyMMdd");
                model.endDate = end.ToString("yyyyMMdd");

                //return model.SnippetStats;
            }
            

            //var snippetRepo = new SnippetsRepository(conn);

            //if (domain.IsNullOrWhiteSpace())
            //{
            //    domain = "google";
            //}

            //if (startDate.IsNullOrWhiteSpace())
            //{
            //    startDate = "20150301";
            //}

            //if (endDate.IsNullOrWhiteSpace())
            //{
            //    endDate = "20150307";
            //}



            //model.SnippetStats = snippetRepo.GetAll(domain, startDate, endDate).ToArray();

            return model.SnippetStats;
        }

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

        public JsonResult getColumnFormatData(string domain, string startDay, string endDate, string[] keywordList, bool countCheck)
        {

            // Confirm valid date parameters
            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days > 64)
            {
                endDate = DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(63).ToString("yyyyMMdd");
            }

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days < 1)
            {
                endDate = DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
            }

            //model.SnippetStats = LoadSnippetData();
            var data = ReloadData(domain, startDay, endDate);

            var days = (DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days + 1;

            if (keywordList != null)
            {
                for (int i = 0; i < keywordList.Length; i++)
                {
                    keywordList[i] = System.Uri.UnescapeDataString(keywordList[i]);
                }
            }

            Dictionary<Tuple<string, string, string>, double> dict = new Dictionary<Tuple<string, string, string>, double>();
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
                            if (!dict.ContainsKey(new Tuple<string, string, string>(data[i].Domain,
                                data[i].Keyword,
                                data[i].Date)))
                            {
                                Tuple<string, string, string> tup =
                                    new Tuple<string, string, string>(data[i].Domain,
                                        data[i].Keyword,
                                        data[i].Date);

                                if (countCheck)
                                {
                                    dict.Add(tup, Convert.ToDouble(data[i].TotalCount));
                                }
                                else
                                {
                                    dict.Add(tup, (Convert.ToDouble(data[i].TotalParsed) / Convert.ToDouble(data[i].TotalCount)) * 100);
                                }
                            }
                        }
                    }
                
            }
            if (keywordList == null)
            {
                keywordList = new string[0];
            }

            string[][] chartData = new string[days + 1][];
            chartData[0] = getColumns(data, domain, keywordList);

            for (int i = 0; i < days; i++)
            {
                // Create row to be added
                string[] tempString = new string[chartData[0].Length];

                // Add the date to the first column
                string currentDate = (DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(i)).ToString("yyyyMMdd");
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

        public JsonResult getDomainLineData(string domain, string startDay, string endDate)
        {

            // Confirm valid date parameters
            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days > 64)
            {
                endDate = DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(63).ToString("yyyyMMdd");
            }

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days < 1)
            {
                endDate = DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
            }

            //model.SnippetStats = LoadSnippetData();
            var data = ReloadData(domain, startDay, endDate);

            var days = (DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days + 1;

            List<string> keywords = new List<string>();
            foreach (SnippetModel s in data)
            {
                if (!keywords.Contains(s.Keyword))
                {
                    keywords.Add(s.Keyword);
                }
            }

            int x = 0;


            Dictionary<Tuple<string, string, string>, long[]> dict = new Dictionary<Tuple<string, string, string>, long[]>();
            for (int i = 0; i < data.Length; i++)
            {
                if (data[i].Domain.ToLower().Equals(domain.ToLower()))
                {
                        if (!dict.ContainsKey(new Tuple<string, string, string>(data[i].Domain,
                            data[i].Keyword,
                            data[i].Date)))
                        {
                            Tuple<string, string, string> tup =
                                new Tuple<string, string, string>(data[i].Domain,
                                    data[i].Keyword,
                                    data[i].Date);


                            dict.Add(tup, new long[] { data[i].NameParsed, data[i].UsernameParsed, data[i].GenderParsed, data[i].BirthyearParsed, data[i].EmailParsed, data[i].TotalCount, data[i].TotalParsed });

                        }
                    }
                

            }


            string[][] chartData = new string[days + 1][];
            chartData[0] = getColumns(data, domain, keywords.ToArray());

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
                string currentDate = (DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(i)).ToString("yyyyMMdd");
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



        public JsonResult GetDomainList(string startDate, string endDate)
        {

            // Confirm valid date parameters
            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null)).Days > 64)
            {
                endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(63).ToString("yyyyMMdd");
            }

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null)).Days < 1)
            {
                endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
            }

            List<string> domainList = new List<string>();

            //var model = new SnippetViewModel();
            // Use the Connection factory to create connections to multiple databases.
            var factory = new ConnectionFactory("SAT04");
            using (IDbConnection conn = factory.CreateConnection())
            {
                //IDbConnection conn = factory.CreateConnection();

                var snippetRepo = new SnippetsRepository(conn);

                //List<string> lines =
                //    System.IO.File.ReadAllLines(@"\\csiadsat07\temp\cpearce\web_portal\test_files\snippet_counts_combined_v2.txt").ToList();


                ////lines.RemoveAll(item => item.Trim() == "");

                //for (int i = 0; i < model.SnippetStats.Length; i++)
                //{
                //    if (!domainList.Contains(model.SnippetStats[i].Domain))
                //    {
                //        domainList.Add(model.SnippetStats[i].Domain);
                //    }
                //}

                domainList = snippetRepo.GetDomains(startDate, endDate).ToList();

                domainList.Sort();
            }


            return Json(domainList, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetKeywordData(string domain, string keyword, string startDay, string endDate)
        {

            // Confirm valid date parameters
            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days > 64)
            {
                endDate = DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(63).ToString("yyyyMMdd");
            }

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days < 1)
            {
                endDate = DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
            }

            //model.SnippetStats = LoadSnippetData();
            var data = ReloadData(domain, startDay, endDate);

            var dayCount = (DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days + 1;

            keyword = System.Uri.UnescapeDataString(keyword);

            string[][] fullKeywordData = new string[dayCount][];
            for (int j = 0; j < dayCount; j ++)
            {
                string currentDate = (DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(j)).ToString("yyyyMMdd");

                string[] keywordData = new string[8];
                keywordData[0] = currentDate;
                keywordData[1] = "0";
                keywordData[2] = "0";
                keywordData[3] = "0";
                keywordData[4] = "0";
                keywordData[5] = "0";
                keywordData[6] = "0";
                keywordData[7] = "0";

                for (int i = 0; i < data.Length; i++)
                {
                    if (!data[i].Keyword.IsNullOrWhiteSpace())
                    {
                        if (data[i].Domain.ToLower().Equals(domain.ToLower()) &&
                            data[i].Keyword.ToLower().Equals(keyword.ToLower()) && data[i].Date.Equals(currentDate))
                        {
                            keywordData[1] = data[i].TotalCount.ToString();
                            keywordData[2] = data[i].TotalParsed.ToString();
                            keywordData[3] = data[i].NameParsed.ToString();
                            keywordData[4] = data[i].UsernameParsed.ToString();
                            keywordData[5] = data[i].GenderParsed.ToString();
                            keywordData[6] = data[i].BirthyearParsed.ToString();
                            keywordData[7] = data[i].EmailParsed.ToString();
                        }
                        fullKeywordData[j] = keywordData;
                    }
                }

            }


            return Json(fullKeywordData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetKeywords(string domain, string startDate, string endDate)
        {

            // Confirm valid date parameters
            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null)).Days > 64)
            {
                endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(63).ToString("yyyyMMdd");
            }

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null)).Days < 1)
            {
                endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
            }


            var data = ReloadData(domain, startDate, endDate);

            List<string> keywords = new List<string>();

            foreach (SnippetModel s in data)
            {
                if (!keywords.Contains(s.Keyword))
                {
                    keywords.Add(s.Keyword);
                }
            }

            keywords.Sort();

            return Json(keywords, JsonRequestBehavior.AllowGet);
        }

	}
}