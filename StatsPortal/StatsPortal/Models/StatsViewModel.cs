using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class StatsViewModel
    {
        public CountryMatchingStatsModel[] MatchingStats { get; set; }
        public CountryMatchingModel[] CountryStats { get; set; }
        public LookupModel[] LookupStats { get; set; }
        public MatchedIdsModel[] MatchedIdsStats { get; set; }
    }
}