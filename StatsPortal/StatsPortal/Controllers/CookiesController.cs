using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Security.Policy;
using System.Web;
using System.Web.Mvc;
using System.Runtime.Serialization.Json;
using System.Web.UI.WebControls.Expressions;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using StatsPortal.Models;
using System.Data;
using System.Data.SqlClient;
using StatsPortal.DAL;
using StatsPortal.DAL.Repository;
using StatsPortal.Models;

namespace StatsPortal.Controllers
{
    public class CookiesController : Controller
    {
        // Global list of Models created from SQL data

        private static IEnumerable<CookieModel> models;

        public void Init()
        {
            

        }

        //public ActionResult Index(){}

        // Returns default data when page is loaded
        public ActionResult Cookies(string domain, string startDate, string endDate)
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

            var model = new CookieViewModel();


            DateTime end = new DateTime();
            DateTime start = new DateTime();

            // Use the Connection factory to create connections to multiple databases.
            var factory = new ConnectionFactory("SAT04");
            using (IDbConnection conn = factory.CreateConnection())
            {
                //IDbConnection conn = factory.CreateConnection();

                var cookieRepo = new CookiesRepository(conn);
                // If we have not selected a domain, choose Facebook as the default
                if (domain.IsNullOrWhiteSpace())
                {
                    domain = "google.com";
                }

                //if (startDate.IsNullOrWhiteSpace())
                //{
                //    startDate = (cookieRepo.GetMaxDate()).ToString();
                //    //startDate = "20150301";
                //}

                //if (endDate.IsNullOrWhiteSpace())
                //{
                //    endDate = cookieRepo.GetMaxDate().ToString();
                //    //endDate = "20150307";
                //}
                end = DateTime.ParseExact(cookieRepo.GetMaxDate().ToString(), "yyyyMMdd", null);
                start = end.AddDays(-30);


                //// Create list to hold models
                //List<CookieModel> cookieMonster = new List<CookieModel>();

                //// Get data
                //DataTable dataPool = GetData(startDate, endDate);

                //// Read lines from file and put into a list
                //List<string> lines =
                //    System.IO.File.ReadAllLines(
                //        @"\\csiadsat07\temp\cpearce\web_portal\test_files\cookie_counts_combined.txt").ToList();

                //// Remove any blank lines
                //lines.RemoveAll(item => item.Trim() == "");

                // Loop through the lines in the file. For each line, if the domain matches the selected domain, put data into a CookieModel
                //for (int i = 0; i < dataPool.Rows.Count; i++)
                //{
                //    CookieModel tempCookieModel = new CookieModel();

                //        tempCookieModel.Domain = dataPool.Rows[i][1].ToString();
                //        tempCookieModel.Keyword = dataPool.Rows[i][2].ToString();
                //        tempCookieModel.TotalCount = Convert.ToInt64(dataPool.Rows[i][3].ToString());
                //        tempCookieModel.TotalParsed = Convert.ToInt64(dataPool.Rows[i][4].ToString());
                //        tempCookieModel.EmailParsed = Convert.ToInt64(dataPool.Rows[i][5].ToString());
                //        tempCookieModel.GenderParsed = Convert.ToInt64(dataPool.Rows[i][6].ToString());
                //        tempCookieModel.BirthyearParsed = Convert.ToInt64(dataPool.Rows[i][7].ToString());
                //        tempCookieModel.NameParsed = Convert.ToInt64(dataPool.Rows[i][8].ToString());
                //        tempCookieModel.UsernameParsed = Convert.ToInt64(dataPool.Rows[i][9].ToString());
                //        tempCookieModel.Date = dataPool.Rows[i][0].ToString();

                //        cookieMonster.Add(tempCookieModel);



                //}

                // Sort models by domain and keyword for more organized display
                //var domainKeywordSort = from element in cookieMonster
                //    orderby element.Domain ascending, element.Keyword ascending
                //    select element;
                model.CookieStats = ReloadData(domain, startDate, endDate);
                model.startDate = start.ToString("yyyyMMdd");
                model.endDate = end.ToString("yyyyMMdd");
                model.maxDate = end.ToString("yyyyMMdd");
                model.minDate = DateTime.ParseExact(cookieRepo.GetMinDate().ToString(), "yyyyMMdd", null).ToString("yyyyMMdd");
            }

           
            // Return the view with the data
            //CookieModel testing = models.Where(item => item.Domain.ToLower().Equals("facebook.com")).First();

            //return View(models.First());
            return View(model);
        }


        private CookieModel[] ReloadData(string domain, string startDate, string endDate)
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

            var model = new CookieViewModel();
            DateTime end = new DateTime();
            DateTime start = new DateTime();
            // Use the Connection factory to create connections to multiple databases.
            var factory = new ConnectionFactory("SAT04");
            using (IDbConnection conn = factory.CreateConnection())
            {
                
                var cookieRepo = new CookiesRepository(conn);

                if (domain.IsNullOrWhiteSpace())
                {
                    domain = "google.com";
                }

                
                if (String.IsNullOrEmpty(endDate))
                {
                    end = DateTime.ParseExact(cookieRepo.GetMaxDate().ToString(), "yyyyMMdd", null);
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



                model.CookieStats = cookieRepo.GetAll(domain, start.ToString("yyyyMMdd"), end.ToString("yyyyMMdd")).ToArray();
                model.startDate = start.ToString("yyyyMMdd");
                model.endDate = end.ToString("yyyyMMdd");

                //return model.SnippetStats;
            }

        // Returns data for a given domain/keyword(s) and returns in a list of CookieModels
        //private List<CookieModel> LoadCookieData(string domain, string[] keywordList, string startDate, string endDate)
        //{

        //    // If we have not selected a domain, choose Facebook as the default
        //    if (domain.IsNullOrWhiteSpace())
        //    {
        //        domain = "facebook.com";
        //    }
        //    // Change to current date - 1 week
        //    if (startDate.IsNullOrWhiteSpace())
        //    {
        //        startDate = "20150301";
        //    }
        //    // Change to current date
        //    if (endDate.IsNullOrWhiteSpace())
        //    {
        //        endDate = "20150307";
        //    }

        //    // Create list to hold models
        //    List<CookieModel> cookieMonster = new List<CookieModel>();


        //    // Get data
        //    DataTable dataPool = GetData(startDate, endDate);

        //    //// Read lines from file and put into a list
        //    //List<string> lines =
        //    //    System.IO.File.ReadAllLines(
        //    //        @"\\csiadsat07\temp\cpearce\web_portal\test_files\cookie_counts_combined.txt").ToList();

        //    //// Remove any blank lines
        //    //lines.RemoveAll(item => item.Trim() == "");

        //    // Loop through each line in the file
        //    for (int i = 0; i < dataPool.Rows.Count; i++)
        //    {

        //        // Create a temp model to be added to the list of models
        //        CookieModel tempCookieModel = new CookieModel();

        //        // Check to see if the current line's keyword is in the keyword list. If so, add the line's demos to the model
        //        int pos = -1;
        //        if (keywordList != null)
        //        {
        //            pos = Array.IndexOf(keywordList, dataPool.Rows[i][2].ToString().ToLower());

        //            if (pos > -1 || (keywordList.Length == 1 && keywordList[0].ToLower().Equals("all")))
        //            {
        //                tempCookieModel.Domain = dataPool.Rows[i][1].ToString();
        //                tempCookieModel.Keyword = dataPool.Rows[i][2].ToString();
        //                tempCookieModel.TotalCount = Convert.ToInt64(dataPool.Rows[i][3].ToString());
        //                tempCookieModel.TotalParsed = Convert.ToInt64(dataPool.Rows[i][4].ToString());
        //                tempCookieModel.EmailParsed = Convert.ToInt64(dataPool.Rows[i][5].ToString());
        //                tempCookieModel.GenderParsed = Convert.ToInt64(dataPool.Rows[i][6].ToString());
        //                tempCookieModel.BirthyearParsed = Convert.ToInt64(dataPool.Rows[i][7].ToString());
        //                tempCookieModel.NameParsed = Convert.ToInt64(dataPool.Rows[i][8].ToString());
        //                tempCookieModel.UsernameParsed = Convert.ToInt64(dataPool.Rows[i][9].ToString());
        //                tempCookieModel.Date = dataPool.Rows[i][0].ToString();

        //                cookieMonster.Add(tempCookieModel);

        //            }
        //        }
        //    }

        //    // Return the list of models
        //    return cookieMonster;
        //}

        //public DataTable GetData(string startDate, string endDate)
        //{
        //    //// Create temp data table to be returned
            //DataTable tempDataTable = new DataTable();

            //// Create connection string
            //string SQLConnectionString = "user id=hokie_prod;password=com321score;server=csiadsat04;database=Roster_Info";

            
            //using (SqlConnection connection = new SqlConnection(SQLConnectionString))
            //{

            //    // Open connection 
            //    connection.Open();


            //    //string testDomain = "facebook.com";
            //    //string startDate = "20150325";
            //    List<string> testDates = new List<string>();
            //    testDates.Add(startDate);
            //    //for (int i = 1; i < (Convert.ToInt32(endDate) - Convert.ToInt32(startDate) + 1); i++)
            //    for (int i = 1; i < 7; i++)
            //    {
            //        testDates.Add((Convert.ToInt32(startDate) + i).ToString());
            //    }
            //    string test_query = "SELECT * FROM cookiejar_stats_v2 WITH (NOLOCK) WHERE i_handoff_date IN (";
            //    for (int i = 0; i < testDates.Count; i++)
            //    {
            //        if (i == testDates.Count - 1)
            //        {
            //            test_query += "'" + testDates[i] + "'";
            //        }
            //        else
            //        {
            //            test_query += "'" + testDates[i] + "',";
            //        }
            //    }

            //    test_query += ")";
            //    int testing = 0;

            //    using (SqlDataAdapter a = new SqlDataAdapter(test_query, connection))
            //    {
            //        DataTable t = new DataTable();
            //        a.Fill(t);
            //        tempDataTable = t;
            //    }

            //    connection.Close();

            //}

            //return tempDataTable;

        //}

            return model.CookieStats;
        }

        // Returns the distinct domains in the data
        public JsonResult GetDomains(string startDate, string endDate)
        {
            //List<string> domainList = new List<string>();
            //List<CookieModel> tempList = models.ToList();


            ////List<string> lines =
            ////   System.IO.File.ReadAllLines(@"\\csiadsat07\temp\cpearce\web_portal\test_files\cookie_counts_combined.txt").ToList();


            ////lines.RemoveAll(item => item.Trim() == "");

            //for (int i = 0; i < tempList.Count; i++)
            //{

            //    //string[] fields = lines[i].Split('\t');

            //    if (!domainList.Contains(tempList[i].Domain))
            //    {
            //        domainList.Add(tempList[i].Domain);
            //    }


            //}

            //domainList.Sort();

            //return Json(domainList, JsonRequestBehavior.AllowGet);

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null)).Days < 1)
            {
                endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
            }

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null)).Days > 64)
            {
                endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(63).ToString("yyyyMMdd");
            }

            List<string> domainList = new List<string>();

            //var model = new SnippetViewModel();
            // Use the Connection factory to create connections to multiple databases.
            var factory = new ConnectionFactory("SAT04");
            using (IDbConnection conn = factory.CreateConnection())
            {
                //IDbConnection conn = factory.CreateConnection();

                var cookieRepo = new CookiesRepository(conn);

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

                domainList = cookieRepo.GetDomains(startDate, endDate).ToList();

                domainList.Sort();
            }


            return Json(domainList, JsonRequestBehavior.AllowGet);



        }

        // Returns a list of keywords associated with a specific domain
        public JsonResult GetKeywords(string domain, string startDate, string endDate)
        {
            //List<string> keywordList = new List<string>();
            //List<CookieModel> tempModel = models.ToList();


            ////List<string> lines =
            ////   System.IO.File.ReadAllLines(@"\\csiadsat07\temp\cpearce\web_portal\test_files\cookie_counts_combined.txt").ToList();


            ////lines.RemoveAll(item => item.Trim() == "");

            //for (int i = 0; i < tempModel.Count; i++)
            //{
                

            //    //string[] fields = lines[i].Split('\t');

            //    if (tempModel[i].Domain.ToLower().Equals(domain.ToLower()))
            //    {
            //        if (!keywordList.Contains(tempModel[i].Keyword))
            //        {
            //            keywordList.Add(tempModel[i].Keyword);
            //        }
            //    }


            //}

            //keywordList.Sort();

            //return Json(keywordList, JsonRequestBehavior.AllowGet);

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null)).Days < 1)
            {
                endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
            }

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null)).Days > 64)
            {
                endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(63).ToString("yyyyMMdd");
            }

            var data = ReloadData(domain, startDate, endDate);

            List<string> keywords = new List<string>();

            foreach (CookieModel s in data)
            {
                if (!keywords.Contains(s.Keyword))
                {
                    keywords.Add(s.Keyword);
                }
            }

            keywords.Sort();

            return Json(keywords, JsonRequestBehavior.AllowGet);
        }

        //// Returns data for a given domain/keyword(s) and returns in a list of CookieModels
        //public JsonResult GetCookieData(string domain, string[] keywordList)
        //{
        //    List<CookieModel> cookieMonster = new List<CookieModel>();


        //    List<string> lines =
        //       System.IO.File.ReadAllLines(@"\\csiadsat07\temp\cpearce\web_portal\test_files\cookie_counts_combined.txt").ToList();


        //    lines.RemoveAll(item => item.Trim() == "");

        //    for (int i = 0; i < lines.Count; i++)
        //    {
                
        //        CookieModel tempCookieModel = new CookieModel();
        //        string[] fields = lines[i].Split('\t');

        //        if (fields[1].ToLower().Equals(domain) || domain.ToLower().Equals("all"))
        //        {
        //            if (Array.IndexOf(keywordList, fields[2].ToLower()) > -1)
        //            {
        //                tempCookieModel.Domain = fields[1];
        //                tempCookieModel.Keyword = fields[2];
        //                tempCookieModel.TotalCount = Convert.ToInt64(fields[3]);
        //                tempCookieModel.TotalParsed = Convert.ToInt64(fields[4]);
        //                tempCookieModel.EmailParsed = Convert.ToInt64(fields[5]);
        //                tempCookieModel.GenderParsed = Convert.ToInt64(fields[6]);
        //                tempCookieModel.BirthyearParsed = Convert.ToInt64(fields[7]);
        //                tempCookieModel.NameParsed = Convert.ToInt64(fields[8]);
        //                tempCookieModel.UsernameParsed = Convert.ToInt64(fields[9]);
        //                tempCookieModel.Date = fields[0];

        //                cookieMonster.Add(tempCookieModel);
        //            }
        //        }
        //    }


        //    return Json(cookieMonster, JsonRequestBehavior.AllowGet);
        //}

        // Returns data needed to build the domain-level line graph
        public JsonResult GetDomainLineData(string domain, string startDay, string endDate)
        {

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days < 1)
            {
                endDate = DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
            }

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days > 64)
            {
                endDate = DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(63).ToString("yyyyMMdd");
            }

            //List<CookieModel> data = LoadCookieData(domain, keywordList, startDay, (Convert.ToInt32(startDay) + days - 1).ToString());
            var data = ReloadData(domain, startDay, endDate);

            var days = (DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days + 1;


            List<string> keywords = new List<string>();
            foreach (CookieModel s in data)
            {
                if (!keywords.Contains(s.Keyword))
                {
                    keywords.Add(s.Keyword);
                }
            }

            Dictionary<Tuple<string, string, string>, long[]> dict =
                new Dictionary<Tuple<string, string, string>, long[]>();
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


                        dict.Add(tup,
                            new long[]
                            {
                                data[i].NameParsed, data[i].UsernameParsed, data[i].GenderParsed,
                                data[i].BirthyearParsed,
                                data[i].EmailParsed, data[i].TotalCount, data[i].TotalParsed
                            });

                    }
                }
            }


            string[][] chartData = new string[days + 1][];
            chartData[0] = new string[8] {"Date","Total Count","Total Parsed","Name Count","Username Count","Gender Count","Birthyear Count","Email Count"};

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
                for (int j = 0; j < keywords.Count; j++)
                {
                    if (dict.ContainsKey(new Tuple<string, string, string>(domain, keywords[j], currentDate)))
                    {
                        nameCount += dict[new Tuple<string, string, string>(domain, keywords[j], currentDate)][0];
                        usernameCount += dict[new Tuple<string, string, string>(domain, keywords[j], currentDate)][1];
                        genderCount += dict[new Tuple<string, string, string>(domain, keywords[j], currentDate)][2];
                        birthyearCount += dict[new Tuple<string, string, string>(domain, keywords[j], currentDate)][3];
                        emailCount += dict[new Tuple<string, string, string>(domain, keywords[j], currentDate)][4];
                        totalCount += dict[new Tuple<string, string, string>(domain, keywords[j], currentDate)][5];
                        totalParsed += dict[new Tuple<string, string, string>(domain, keywords[j], currentDate)][6];
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


            //string test = (Convert.ToInt32("20150307") - Convert.ToInt32(startDay) + 1).ToString();
            //string test2 = DateTime.Now.AddDays(-1.0).ToString("yyyyMMdd");

            return Json(chartData, JsonRequestBehavior.AllowGet);


        }

        // Returns data needed to build the keyword-level line graph
        public JsonResult GetKeywordLineData(string domain, string[] keywordList, string startDay, string endDate, bool countCheck)
        {

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days < 1)
            {
                endDate = DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
            }

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days > 64)
            {
                endDate = DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(63).ToString("yyyyMMdd");
            }

            //List<CookieModel> data = LoadCookieData(domain, keywordList, startDay, (Convert.ToInt32(startDay) + days - 1).ToString());
            var data = ReloadData(domain, startDay, endDate);

            var days = (DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days + 1;


            if (keywordList != null)
            {
                for (int i = 0; i < keywordList.Length; i++)
                {
                    keywordList[i] = System.Uri.UnescapeDataString(keywordList[i]);
                }
            }
            //for (int i = 0; i < keywordList.Length; i++)
            //{
            //    keywordList[i] = HttpUtility.HtmlDecode(keywordList[i]);
            //}
            //List<string> keywords = new List<string>();
            //foreach (CookieModel c in data)
            //{
            //    if (c.Domain.ToLower().Equals(domain.ToLower()))
            //    {
            //        if (!keywords.Contains(c.Keyword))
            //        {
            //            keywords.Add(c.Keyword);
            //        }
            //    }
            //}

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
                                dict.Add(tup,
                                    (Convert.ToDouble(data[i].TotalParsed)/Convert.ToDouble(data[i].TotalCount))*100);
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
            string[] columns = new string[keywordList.Length + 1];

            columns[0] = "Date";

            for (int i = 1; i < (keywordList.Length + 1); i++)
            {
                columns[i] = keywordList[i - 1];
            }
            chartData[0] = columns;

            for (int i = 0; i < days; i++)
            {
                // Create row to be added
                string[] tempString = new string[chartData[0].Length];

                // Add the date to the first column
                string currentDate = (DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(i)).ToString("yyyyMMdd");
                tempString[0] = currentDate;

                // Generate values for the rest of the columns
                for (int j = 1; j < chartData[0].Length; j++)
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

        // Returns data needed to build the keyword-level bar graph and display table
        public JsonResult GetKeywordBarTableData(string domain, string keyword, string startDay, string endDate)
        {

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days < 1)
            {
                endDate = DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
            }

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days > 64)
            {
                endDate = DateTime.ParseExact(startDay, "yyyyMMdd", null).AddDays(63).ToString("yyyyMMdd");
            }

            //List<CookieModel> data = LoadCookieData(domain, new string[] {keyword}, startDay, (Convert.ToInt32(startDay) + days - 1).ToString());
            var data = ReloadData(domain, startDay, endDate);

            var dayCount = (DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDay, "yyyyMMdd", null)).Days + 1;
            
            keyword = System.Uri.UnescapeDataString(keyword);

            string[][] fullKeywordData = new string[dayCount][];
            for (int j = 0; j < dayCount; j++)
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
                            //keywordData[0] = data[i].Date;
                            keywordData[1] = data[i].TotalCount.ToString();
                            keywordData[2] = data[i].TotalParsed.ToString();
                            keywordData[3] = data[i].EmailParsed.ToString();
                            keywordData[4] = data[i].GenderParsed.ToString();
                            keywordData[5] = data[i].BirthyearParsed.ToString();
                            keywordData[6] = data[i].NameParsed.ToString();
                            keywordData[7] = data[i].UsernameParsed.ToString();
                        }
                        fullKeywordData[j] = keywordData;
                    }
                }
            }


            return Json(fullKeywordData, JsonRequestBehavior.AllowGet);
        }

    }
}