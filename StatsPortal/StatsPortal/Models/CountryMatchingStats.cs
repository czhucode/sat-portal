using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class CountryMatchingStats
    {
        public DateTime Date { get; set; }
        public string Country { get; set; }
        public long MatchedMachines { get; set; }
        public long NameCount { get; set; }
        public long BirthyearCount { get; set; }
        public long EmailCount { get; set; }
    }
}