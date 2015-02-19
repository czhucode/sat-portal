using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class MatchingStats
    {
        public DateTime Date { get; set; }
        public string Domain { get; set; }
        public long EligibleMachineCount { get; set; }
        public long MachinesMatched { get; set; }
        public double MatchedPercentage { get; set; }
        public long NameCount { get; set; }
        public long BirthyearCount { get; set; }
        public long EmailCount { get; set; }
        public double PercentageName { get; set; }
        public double PercentageBirthyear { get; set; }
        public double PercentageEmail { get; set; }
    }
}