using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class StatsViewModel
    {
        public CountryMatchingStats[] MatchingStats { get; set; }
        public MatchingStats[] CountryStats { get; set; }
        public LookupModel[] LookupStats { get; set; }
        public MatchedIdsModel[] MatchedIdsStats { get; set; }
    }
}