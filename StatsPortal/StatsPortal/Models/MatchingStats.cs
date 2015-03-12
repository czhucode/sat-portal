using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class MatchingStats
    {
        public long Date { get; set; }
        public string Country { get; set; }
        public long MatchedMachines { get; set; }
        public string Domain { get; set; }
    }
}