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
                    System.IO.File.ReadAllLines(@"\\csiadsat07\temp\cpearce\web_portal\test_files\snippet_counts_large.txt");

                stats = new SnippetModel[lines.Length];

                for (int i = 0; i < lines.Length; i++)
                {
                    string[] fields = lines[i].Split('\t');

                    stats[i] = new SnippetModel();

                    stats[i].Domain = fields[0];
                    stats[i].Keyword = fields[1];
                    stats[i].TotalCount = Convert.ToInt64(fields[2]);
                    stats[i].TotalParsed = Convert.ToInt64(fields[3]);
                    stats[i].EmailParsed = Convert.ToInt64(fields[4]);
                    stats[i].GenderParsed = Convert.ToInt64(fields[5]);
                    stats[i].BirthyearParsed = Convert.ToInt64(fields[6]);
                    stats[i].NameParsed = Convert.ToInt64(fields[7]);
                    stats[i].UsernameParsed = Convert.ToInt64(fields[8]);
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