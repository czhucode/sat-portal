using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using Microsoft.Ajax.Utilities;
using StatsPortal.DAL;
using StatsPortal.DAL.Repository;
using StatsPortal.Models;

namespace StatsPortal.Controllers
{
    public class StatsController : Controller
    {
        private IEnumerable<CountryMatchingStatsModel> matchingStats;
        private CountryMatchingModel[] countryStats;
        private IEnumerable<MatchedIdsModel> matchedIdsStats;
        private IEnumerable<LookupModel> lookupStats;

        public ActionResult Index()
        {
            var domains = new List<String> { "LinkedIn" };

            return View(domains);
        }

        public ActionResult Matching(string domain)
        {
            // Use the Connection factory to create connections to multiple databases.
            var factory = new ConnectionFactory("SAT01");
            IDbConnection conn = factory.CreateConnection();
            
            // Initialize the repos
            var lookupRepo = new LookupRepository(conn);
            var countryRepo = new CountryMatchingRepository(conn);
            var matchRepo = new MatchingRepository(conn);

            // Load the entire table
            lookupStats = lookupRepo.GetAll();
            matchingStats = countryRepo.GetByDomain(domain);
            matchedIdsStats = matchRepo.GetAll();

            // Declare the ViewModel 
            var model = new StatsViewModel();

            var d = matchingStats.Max(i => i.Date);

            var mStats = matchingStats
                        .Where(x => x.Country.Equals("TOTALS"))
                        .ToArray();

            var cStats = matchingStats
                        .Select(x => new CountryMatchingModel() { Date = x.Date, Country = x.Country, MatchedMachines = x.MatchedMachines, Domain = x.Domain })
                        .Where(x => x.Date == d && !x.Country.Equals("TOTALS"))
                        .ToArray();

            var mIds = matchedIdsStats
                        .Where(m => m.Domain.ToLower().Equals(domain.ToLower()))
                        .ToArray();

            //var lookup = lookupStats
            //            .Where(l => l.Domain.ToLower().Equals(domain.ToLower()))
            //            .ToArray();

            var lookup = lookupRepo.GetWhereDomainIs(domain).ToArray();

            model.CountryStats = cStats;
            model.MatchingStats = mStats;
            model.MatchedIdsStats = mIds;
            model.LookupStats = lookup;

            return View(model);
        }

        public JsonResult CountryMatchingStats(string country, string domain)
        {
            // Use the Connection factory to create connections to multiple databases.
            var factory = new ConnectionFactory("SAT01");

            // Initialize the repos
            var countryRepo = new CountryMatchingRepository(factory.CreateConnection());

            // Call the repo API
            var cStats = countryRepo
                        .GetByCountryAndDomain(country, domain)
                        .OrderByDescending(x => x.Date);

            return Json(cStats, JsonRequestBehavior.AllowGet);
        }
    }
}