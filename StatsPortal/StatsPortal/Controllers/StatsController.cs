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
        private StatsViewModel model = new StatsViewModel();

        //
        // GET: /Stats/
        public ActionResult Index()
        {
            var domains = new List<String> { "LinkedIn" };

            return View(domains);
        }

        public ActionResult LinkedinMatching()
        {
            var stats = LoadCountryStats();
            var matchingStats = from s in stats
                where s.Country.Equals("Overall")
                select s;

            long d = 20150213;
            MatchingStats[] countryStats =  stats
                                            .Select(x => new MatchingStats(){Date = x.Date, Country = x.Country, MatchedMachines = x.MatchedMachines})
                                            .Where(x => x.Date == d && !x.Country.Equals("Overall"))
                                            .ToArray();

            model.CountryStats = countryStats;
            model.MatchingStats = matchingStats.ToArray();

            return View(model);
        }

        public JsonResult CountryMatchingStats(string country)
        {
            var stats = LoadCountryStats();

            var countryStats = from s in stats
                               where s.Country.Equals(country)
                               select s;

            return Json(countryStats, JsonRequestBehavior.AllowGet);
        }

        private IEnumerable<CountryMatchingStats> LoadCountryStats()
        {
            var stats = new CountryMatchingStats[] { };

            if (stats.Length == 0)
            {
                string[] lines =
                    System.IO.File.ReadAllLines(
                        @"\\csiadsat07\temp\cpearce\web_portal\test_files\LinkedinMatchingCountryStats.txt");

                stats = new CountryMatchingStats[lines.Length];

                for (int i = 0; i < lines.Length; i++)
                {
                    string[] fields = lines[i].Split('\t');

                    stats[i] = new CountryMatchingStats();

                    stats[i].Country = fields[0];
                    stats[i].MatchedMachines = Convert.ToInt32(fields[2]);
                    stats[i].NameCount = Convert.ToInt32(fields[3]);
                    stats[i].EmailCount = Convert.ToInt32(fields[5]);
                    stats[i].BirthyearCount = Convert.ToInt32(fields[4]);
                    /*stats[i].Date = DateTime.ParseExact(fields[fields.Length - 1], "yyyyMMdd", CultureInfo.InvariantCulture,
                        DateTimeStyles.None);*/
                    stats[i].Date = Convert.ToInt32(fields[fields.Length - 1].Trim());
                }
            }

            return stats;
        }
    }
}