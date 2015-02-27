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
    }
}