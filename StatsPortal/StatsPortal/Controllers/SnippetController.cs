using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Ajax.Utilities;
using StatsPortal.Models;
using WebGrease.Extensions;

namespace StatsPortal.Controllers
{
    public class SnippetController : Controller
    {

        private SnippetViewModel model = new SnippetViewModel();

        public void Init()
        {
            SnippetModel[] stats = new SnippetModel[] { };
            SnippetEmailModel[] emailStats = new SnippetEmailModel[] {};

            if (stats.Length == 0)
            {
                List<string> lines =
                    System.IO.File.ReadAllLines(@"\\csiadsat07\temp\cpearce\web_portal\test_files\snippet_counts_combined_v2.txt").ToList();


                lines.RemoveAll(item => item.Trim() == "");
    
                
                stats = new SnippetModel[lines.Count];

                for (int i = 0; i < lines.Count; i++)
                {
                    string[] fields = lines[i].Split('\t');

                    //if (fields[1].ToLower().Equals(domain.ToLower()) || domain.Equals("ALL"))
                    //{

                        stats[i] = new SnippetModel();

                        stats[i].Domain = fields[1];
                        stats[i].Keyword = fields[2];
                        stats[i].TotalCount = Convert.ToInt64(fields[3]);
                        stats[i].TotalParsed = Convert.ToInt64(fields[4]);
                        stats[i].EmailParsed = Convert.ToInt64(fields[5]);
                        stats[i].GenderParsed = Convert.ToInt64(fields[6]);
                        stats[i].BirthyearParsed = Convert.ToInt64(fields[7]);
                        stats[i].NameParsed = Convert.ToInt64(fields[8]);
                        stats[i].UsernameParsed = Convert.ToInt64(fields[9]);
                        stats[i].Date = fields[0];
                    //}
                }
            }

            if (emailStats.Length == 0)
            {
                string[] lines =
                    System.IO.File.ReadAllLines(@"\\csiadsat07\temp\cpearce\web_portal\test_files\snippet_email.txt");

                emailStats = new SnippetEmailModel[lines.Length];

                for (int i = 0; i < lines.Length; i++)
                {
                    try
                    {
                        string[] fields = lines[i].Split('\t');

                        emailStats[i] = new SnippetEmailModel();

                        emailStats[i].Domain = fields[0];
                        emailStats[i].Keyword = fields[1];
                        emailStats[i].Date = fields[2];
                        emailStats[i].AvgTotalCount90 = Convert.ToInt64(fields[3]);
                        emailStats[i].AvgTotalParsed90 = Convert.ToInt64(fields[4]);
                        emailStats[i].AvgTotalCount60 = Convert.ToInt64(fields[5]);
                        emailStats[i].AvgTotalParsed60 = Convert.ToInt64(fields[6]);
                        emailStats[i].AvgTotalCount30 = Convert.ToInt64(fields[7]);
                        emailStats[i].AvgTotalParsed30 = Convert.ToInt64(fields[8]);
                        emailStats[i].LastDayTotalCount = Convert.ToInt64(fields[9]);
                        emailStats[i].LastDayTotalParsed = Convert.ToInt64(fields[10]);
                        emailStats[i].PercentEmailParsed = Convert.ToDouble(fields[11]);
                        emailStats[i].PercentGenderParsed = Convert.ToDouble(fields[12]);
                        emailStats[i].PercentBirthyearParsed = Convert.ToDouble(fields[13]);
                        emailStats[i].PercentNameParsed = Convert.ToDouble(fields[14]);
                        emailStats[i].PercentUsernameParsed = Convert.ToDouble(fields[15]);
                    }
                    catch (Exception e)
                    {
                        Debug.WriteLine(e.ToString());
                    }
                }
            }

            model.SnippetStats = stats;
            model.SnippetEmailStats = emailStats;

        }

        public ActionResult Index()
        {
            var domains = new List<String> { "LinkedIn", "Facebook", "Google", "Youtube" };

            return View(domains);
        }

        public ActionResult Snippet(string domain)
        {
            Init();

            return View(model);
        }

        private IEnumerable<SnippetModel> LoadSnippetData()
        {
            SnippetModel[] stats = new SnippetModel[] { };

            if (stats.Length == 0)
            {
                string[] lines =
                    System.IO.File.ReadAllLines(@"\\csiadsat07\temp\cpearce\web_portal\test_files\snippet_counts_combined.txt");

                stats = new SnippetModel[lines.Length];

                for (int i = 0; i < lines.Length; i++)
                {
                    string[] fields = lines[i].Split('\t');

                    stats[i] = new SnippetModel();

                    stats[i].Domain = fields[1];
                    stats[i].Keyword = fields[2];
                    stats[i].TotalCount = Convert.ToInt64(fields[3]);
                    stats[i].TotalParsed = Convert.ToInt64(fields[4]);
                    stats[i].EmailParsed = Convert.ToInt64(fields[5]);
                    stats[i].GenderParsed = Convert.ToInt64(fields[6]);
                    stats[i].BirthyearParsed = Convert.ToInt64(fields[7]);
                    stats[i].NameParsed = Convert.ToInt64(fields[8]);
                    stats[i].UsernameParsed = Convert.ToInt64(fields[9]);
                    stats[i].Date = fields[0];
                }
            }

            return stats;
        }

        private IEnumerable<SnippetEmailModel> LoadSnippetEmailData()
        {
            SnippetEmailModel[] emailStats = new SnippetEmailModel[] { };

            if (emailStats.Length == 0)
            {
                string[] lines =
                    System.IO.File.ReadAllLines(@"\\csiadsat07\temp\cpearce\web_portal\test_files\snippet_email.txt");

                emailStats = new SnippetEmailModel[lines.Length];

                for (int i = 0; i < lines.Length; i++)
                {
                    string[] fields = lines[i].Split('\t');

                    emailStats[i] = new SnippetEmailModel();

                    emailStats[i].Domain = fields[0];
                    emailStats[i].Keyword = fields[1];
                    emailStats[i].Date = fields[2];
                    emailStats[i].AvgTotalCount90 = Convert.ToInt64(fields[3]);
                    emailStats[i].AvgTotalParsed90 = Convert.ToInt64(fields[4]);
                    emailStats[i].AvgTotalCount60 = Convert.ToInt64(fields[5]);
                    emailStats[i].AvgTotalParsed60 = Convert.ToInt64(fields[6]);
                    emailStats[i].AvgTotalCount30 = Convert.ToInt64(fields[7]);
                    emailStats[i].AvgTotalParsed30 = Convert.ToInt64(fields[8]);
                    emailStats[i].LastDayTotalCount = Convert.ToInt64(fields[9]);
                    emailStats[i].LastDayTotalParsed = Convert.ToInt64(fields[10]);
                    emailStats[i].PercentEmailParsed = Convert.ToDouble(fields[11]);
                    emailStats[i].PercentGenderParsed = Convert.ToDouble(fields[12]);
                    emailStats[i].PercentBirthyearParsed = Convert.ToDouble(fields[13]);
                    emailStats[i].PercentNameParsed = Convert.ToDouble(fields[14]);
                    emailStats[i].PercentUsernameParsed = Convert.ToDouble(fields[15]);

                }
            }

            return emailStats;
        }

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
            Init();


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
            Init();


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

            List<string> lines =
                System.IO.File.ReadAllLines(@"\\csiadsat07\temp\cpearce\web_portal\test_files\snippet_counts_combined_v2.txt").ToList();


            lines.RemoveAll(item => item.Trim() == "");

            for (int i = 0; i < lines.Count; i++)
            {
                string[] fields = lines[i].Split('\t');
                if (!domainList.Contains(fields[1]))
                {
                    domainList.Add(fields[1]);
                }
            }

            domainList.Sort();



            return Json(domainList, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetKeywordData(string domain, string keyword, string startDay, int dayCount)
        {
            Init();

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