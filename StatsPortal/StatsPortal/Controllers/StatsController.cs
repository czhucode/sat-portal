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

        public ActionResult Matching(string domain)
        {
            var stats = LoadCountryStats();
            var matchingStats = from s in stats
                where s.Country.Equals("Overall") && s.Domain.ToLower().Equals(domain.ToLower())
                select s;

            var d = stats.Max(i => i.Date);
            MatchingStats[] countryStats =  stats
                                            .Select(x => new MatchingStats(){Date = x.Date, Country = x.Country, MatchedMachines = x.MatchedMachines, Domain = x.Domain})
                                            .Where(x => x.Date == d && !x.Country.Equals("Overall") && x.Domain.ToLower().Equals(domain.ToLower()))
                                            .ToArray();

            model.CountryStats = countryStats;
            model.MatchingStats = matchingStats.ToArray();

            return View(model);
        }

        public JsonResult CountryMatchingStats(string country, string domain)
        {
            var stats = LoadCountryStats();

            var countryStats = from s in stats
                               where s.Country.Equals(country) && s.Domain.ToLower().Equals(domain.ToLower())
                               orderby s.Date descending 
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
                        @"\\csiadsat07\temp\cpearce\web_portal\test_files\MatchingStats.txt");

                stats = new CountryMatchingStats[lines.Length];

                for (int i = 0; i < lines.Length; i++)
                {
                    string[] fields = lines[i].Split('\t');

                    stats[i] = new CountryMatchingStats();

                    stats[i].Country = fields[0];
                    stats[i].MatchedMachines = Convert.ToInt32(fields[2]);
                    stats[i].NameCount = Convert.ToInt32(fields[3]);

                    if (fields[fields.Length - 1].Trim().ToLower().Equals("google") ||
                        fields[fields.Length - 1].Trim().ToLower().Equals("facebook"))
                    {
                        stats[i].GenderCount = Convert.ToInt32(fields[4]);
                        stats[i].BirthyearCount = Convert.ToInt32(fields[5]);

                        if(fields[fields.Length - 1].Trim().ToLower().Equals("google"))
                            stats[i].EmailCount = Convert.ToInt32(fields[6]);
                    }

                    if (fields[fields.Length - 1].Trim().ToLower().Equals("linkedin"))
                    {
                        stats[i].BirthyearCount = Convert.ToInt32(fields[4]);
                        stats[i].EmailCount = Convert.ToInt32(fields[5]);
                    }
                    
                    
                    /*stats[i].Date = DateTime.ParseExact(fields[fields.Length - 1], "yyyyMMdd", CultureInfo.InvariantCulture,
                        DateTimeStyles.None);*/
                    stats[i].Date = Convert.ToInt32(fields[fields.Length - 2].Trim());
                    stats[i].Domain = fields[fields.Length - 1].Trim();
                }
            }

            return stats;
        }
    }
}