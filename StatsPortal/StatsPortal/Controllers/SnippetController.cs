using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StatsPortal.Models;

namespace StatsPortal.Controllers
{
    public class SnippetController : Controller
    {

        private SnippetModel[] stats = new SnippetModel[] { };

        public void Init()
        {
            if (stats.Length == 0)
            {
                string[] lines =
                    System.IO.File.ReadAllLines(@"\\csiadsat07\temp\cpearce\web_portal\test_files\snippet_test_data_large.txt");

                stats = new SnippetModel[lines.Length];

                for (int i = 0; i < lines.Length; i++)
                {
                    string[] fields = lines[i].Split('\t');

                    stats[i] = new SnippetModel();

                    stats[i].Domain = fields[0];
                    stats[i].Keyword = fields[1];
                    stats[i].Date = DateTime.ParseExact(fields[2], "yyyyMMdd", CultureInfo.InvariantCulture,
                        DateTimeStyles.None);
                    stats[i].AvgTotalCount90 = Convert.ToInt64(fields[3]);
                    stats[i].AvgTotalParsed90 = Convert.ToInt64(fields[4]);
                    stats[i].AvgTotalCount60 = Convert.ToInt64(fields[5]);
                    stats[i].AvgTotalParsed60 = Convert.ToInt64(fields[6]);
                    stats[i].AvgTotalCount30 = Convert.ToInt64(fields[7]);
                    stats[i].AvgTotalParsed30 = Convert.ToInt64(fields[8]);
                    stats[i].LastDayTotalCount = Convert.ToInt64(fields[9]);
                    stats[i].LastDayTotalParsed = Convert.ToInt64(fields[10]);
                    stats[i].PercentEmailParsed = Convert.ToDouble(fields[11]);
                    stats[i].PercentGenderParsed = Convert.ToDouble(fields[12]);
                    stats[i].PercentBirthyearParsed = Convert.ToDouble(fields[13]);
                    stats[i].PercentNameParsed = Convert.ToDouble(fields[14]);
                    stats[i].PercentUsernameParsed = Convert.ToDouble(fields[15]);
                }
            }
        }

        public ActionResult Index()
        {
            var domains = new List<String> { "LinkedIn", "Facebook", "Google", "Youtube" };

            return View(domains);
        }

        public ActionResult Snippet(string domain)
        {
            Init();

            //var matchingStats = from s in stats
            //                    where s.Domain.Equals(domain.ToLower())
            //                    select s;

            return View(stats);
        }

	}
}