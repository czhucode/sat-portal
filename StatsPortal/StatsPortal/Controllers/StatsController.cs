using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Ajax.Utilities;
using StatsPortal.Models;

namespace StatsPortal.Controllers
{
    public class StatsController : Controller
    {
        private CountryMatchingStats[] matchingStats;
        private MatchingStats[] countryStats;
        private MatchedIdsModel[] matchedIdsStats;
        private LookupModel[] lookupStats;

        //private StatsViewModel model = new StatsViewModel();

        public StatsController()
        {
            Init();
        }

        //
        // GET: /Stats/
        public ActionResult Index()
        {
            var domains = new List<String> { "LinkedIn" };

            return View(domains);
        }

        public ActionResult Matching(string domain)
        {
            var model = new StatsViewModel();

            var mStats = from m in matchingStats
                where m.Country.Equals("Totals") && m.Domain.ToLower().Equals(domain.ToLower())
                select m;

            var d = matchingStats.Max(i => i.Date);
            //MatchingStats[] countryStats =  countryStats
            //                                .Select(x => new MatchingStats(){Date = x.Date, Country = x.Country, MatchedMachines = x.MatchedMachines, Domain = x.Domain})
            //                                .Where(x => x.Date == d && !x.Country.Equals("Overall") && !x.Country.Equals("Lookup") && x.Domain.ToLower().Equals(domain.ToLower()))
            //                                .ToArray();

            MatchingStats[] cStats = countryStats
                                        .Where(x => x.Date == d && !x.Country.Equals("Totals") && x.Domain.ToLower().Equals(domain.ToLower()))
                                        .ToArray();

            MatchedIdsModel[] mIds = matchedIdsStats
                                        .Where(m => m.Domain.ToLower().Equals(domain.ToLower()))
                                        .ToArray();

            LookupModel[] lookup = lookupStats
                                    .Where(l => l.Domain.ToLower().Equals(domain.ToLower()))
                                    .ToArray();

            model.CountryStats = cStats;
            model.MatchingStats = mStats.ToArray();
            model.MatchedIdsStats = mIds;
            model.LookupStats = lookup;

            return View(model);
        }

        public JsonResult CountryMatchingStats(string country, string domain)
        {
            var cStats = from c in matchingStats
                               where c.Country.Equals(country) && c.Domain.ToLower().Equals(domain.ToLower())
                               orderby c.Date descending 
                               select c;

            return Json(cStats, JsonRequestBehavior.AllowGet);
        }

        //private IEnumerable<CountryMatchingStats> LoadCountryStats()
        //{
        //    var stats = new CountryMatchingStats[] { };

        //    if (stats.Length == 0)
        //    {
        //        string[] lines =
        //            System.IO.File.ReadAllLines(
        //                @"\\csiadsat07\temp\cpearce\web_portal\test_files\MatchingStats.txt");

        //        stats = new CountryMatchingStats[lines.Length];

        //        for (int i = 0; i < lines.Length; i++)
        //        {
        //            string[] fields = lines[i].Split('\t');

        //            stats[i] = new CountryMatchingStats();

        //            stats[i].Country = fields[0];
        //            stats[i].MatchedMachines = Convert.ToInt32(fields[2]);
        //            stats[i].NameCount = Convert.ToInt32(fields[3]);

        //            if (fields[fields.Length - 1].Trim().ToLower().Equals("google") ||
        //                fields[fields.Length - 1].Trim().ToLower().Equals("facebook"))
        //            {
        //                stats[i].GenderCount = Convert.ToInt32(fields[4]);
        //                stats[i].BirthyearCount = Convert.ToInt32(fields[5]);

        //                if(fields[fields.Length - 1].Trim().ToLower().Equals("google"))
        //                    stats[i].EmailCount = Convert.ToInt32(fields[6]);
        //            }

        //            if (fields[fields.Length - 1].Trim().ToLower().Equals("linkedin"))
        //            {
        //                stats[i].BirthyearCount = Convert.ToInt32(fields[4]);
        //                stats[i].EmailCount = Convert.ToInt32(fields[5]);
        //            }
                    
                    
        //            /*stats[i].Date = DateTime.ParseExact(fields[fields.Length - 1], "yyyyMMdd", CultureInfo.InvariantCulture,
        //                DateTimeStyles.None);*/
        //            stats[i].Date = Convert.ToInt32(fields[fields.Length - 2].Trim());
        //            stats[i].Domain = fields[fields.Length - 1].Trim();
        //        }
        //    }

        //    return stats;
        //}

        public void Init()
        {
            var matching = new List<CountryMatchingStats>();
            var lookup = new List<LookupModel>();
            var matchedIds = new List<MatchedIdsModel>();
            var country = new List<MatchingStats>();

            string[] lines =
                    System.IO.File.ReadAllLines(
                        @"\\csiadsat07\temp\cpearce\web_portal\test_files\MatchingStats.txt");

            for (int i = 0; i < lines.Length; i++)
            {
                string[] fields = lines[i].Split('\t');

                if (!fields[0].ToLower().Equals("lookup") && !fields[0].ToLower().Equals("overall"))
                {
                    matching.Add(getMatchingStats(fields));
                }
                else if (fields[0].ToLower().Equals("lookup"))
                {
                    lookup.Add(getLookupStats(fields));
                }
                else if (fields[0].ToLower().Equals("overall"))
                {
                    matchedIds.Add(getMatchedIdsStats(fields));
                }
            }

            // Lastly use matching stats to load country stats
            foreach (var m in matching)
            {
                country.Add(new MatchingStats()
                {
                    Date = m.Date,
                    Country = m.Country,
                    MatchedMachines = m.MatchedMachines,
                    Domain = m.Domain
                });
            }

            // Convert them all to array
            matchingStats = matching.ToArray();
            countryStats = country.ToArray();
            lookupStats = lookup.ToArray();
            matchedIdsStats = matchedIds.ToArray();
        }


        private CountryMatchingStats getMatchingStats(string[] fields)
        {
            var stat = new CountryMatchingStats();

            stat.Country = fields[0];
            stat.MatchedMachines = Convert.ToInt32(fields[2]);
            stat.NameCount = Convert.ToInt32(fields[3]);

            if (fields[fields.Length - 1].Trim().ToLower().Equals("google") ||
                fields[fields.Length - 1].Trim().ToLower().Equals("facebook"))
            {
                stat.GenderCount = Convert.ToInt32(fields[4]);
                stat.BirthyearCount = Convert.ToInt32(fields[5]);

                if (fields[fields.Length - 1].Trim().ToLower().Equals("google"))
                    stat.EmailCount = Convert.ToInt32(fields[6]);
            }

            if (fields[fields.Length - 1].Trim().ToLower().Equals("linkedin"))
            {
                stat.BirthyearCount = Convert.ToInt32(fields[4]);
                stat.EmailCount = Convert.ToInt32(fields[5]);
            }


            /*stats[i].Date = DateTime.ParseExact(fields[fields.Length - 1], "yyyyMMdd", CultureInfo.InvariantCulture,
                DateTimeStyles.None);*/
            stat.Date = Convert.ToInt32(fields[fields.Length - 2].Trim());
            stat.Domain = fields[fields.Length - 1].Trim();

            return stat;
        }

        private LookupModel getLookupStats(string[] fields)
        {
            var stat = new LookupModel();

            stat.LookupCount = Convert.ToInt32(fields[1].Trim());
            stat.NameCount = Convert.ToInt32(fields[2].Trim());

            if (fields[fields.Length - 1].Trim().ToLower().Equals("google") ||
                fields[fields.Length - 1].Trim().ToLower().Equals("facebook"))
            {
                stat.GenderCount = Convert.ToInt32(fields[3]);
                stat.BirthyearCount = Convert.ToInt32(fields[4]);

                if (fields[fields.Length - 1].Trim().ToLower().Equals("google"))
                    stat.EmailCount = Convert.ToInt32(fields[5]);
            }

            if (fields[fields.Length - 1].Trim().ToLower().Equals("linkedin"))
            {
                stat.BirthyearCount = Convert.ToInt32(fields[3]);
                stat.EmailCount = Convert.ToInt32(fields[4]);
            }

            stat.Date = Convert.ToInt32(fields[fields.Length - 2].Trim());
            stat.Domain = fields[fields.Length - 1].Trim();

            return stat;
        }

        private MatchedIdsModel getMatchedIdsStats(string[] fields)
        {
            var stat = new MatchedIdsModel();

            stat.EligibleIdsCount = Convert.ToInt32(fields[1].Trim());
            stat.MatchedIdsCount = Convert.ToInt32(fields[2].Trim());
            stat.NameCount = Convert.ToInt32(fields[3].Trim());

            if (fields[fields.Length - 1].Trim().ToLower().Equals("google") ||
                fields[fields.Length - 1].Trim().ToLower().Equals("facebook"))
            {
                stat.GenderCount = Convert.ToInt32(fields[4]);
                stat.BirthyearCount = Convert.ToInt32(fields[5]);

                if (fields[fields.Length - 1].Trim().ToLower().Equals("google"))
                    stat.EmailCount = Convert.ToInt32(fields[6]);
            }

            if (fields[fields.Length - 1].Trim().ToLower().Equals("linkedin"))
            {
                stat.BirthyearCount = Convert.ToInt32(fields[4]);
                stat.EmailCount = Convert.ToInt32(fields[5]);
            }

            stat.Date = Convert.ToInt32(fields[fields.Length - 2].Trim());
            stat.Domain = fields[fields.Length - 1].Trim();

            return stat;
        }
    }
}