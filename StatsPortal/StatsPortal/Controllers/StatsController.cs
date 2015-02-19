using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StatsPortal.Models;

namespace StatsPortal.Controllers
{
    public class StatsController : Controller
    {
        private MatchingStats[] stats = new MatchingStats[] { };

        public void Init()
        {
            if (stats.Length == 0)
            {
                string[] lines =
                    System.IO.File.ReadAllLines(@"C:\Users\asouza\Documents\linkedin_stats\LinkedinMatchingStats.txt");

                stats = new MatchingStats[lines.Length];

                for (int i = 0; i < lines.Length; i++)
                {
                    string[] fields = lines[i].Split('\t');

                    stats[i] = new MatchingStats();

                    stats[i].Date = DateTime.ParseExact(fields[0], "yyyyMMdd", CultureInfo.InvariantCulture,
                        DateTimeStyles.None);
                    stats[i].Domain = fields[1];
                    stats[i].EligibleMachineCount = Convert.ToInt64(fields[2]);
                    stats[i].MachinesMatched = Convert.ToInt64(fields[3]);
                    stats[i].MatchedPercentage = Convert.ToDouble(fields[4]);
                    stats[i].NameCount = Convert.ToInt64(fields[5]);
                    stats[i].BirthyearCount = Convert.ToInt64(fields[6]);
                    stats[i].EmailCount = Convert.ToInt64(fields[7]);
                    stats[i].PercentageName = Convert.ToDouble(fields[8]);
                    stats[i].PercentageBirthyear = Convert.ToDouble(fields[9]);
                    stats[i].PercentageEmail = Convert.ToDouble(fields[10]);
                }
            }
        }

        //
        // GET: /Stats/
        public ActionResult Index()
        {
            var domains = new List<String> { "LinkedIn", "Facebook", "Google" };

            return View(domains);
        }

        public ActionResult Matching(string domain)
        {
            Init();

            var matchingStats = from s in stats
                                where s.Domain.Equals(domain.ToLower())
                                select s;

            return View(matchingStats);
        }
	}
}