using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class SnippetEmailModel
    {

        public string Domain { get; set; }
        public string Keyword { get; set; }
        public string Date { get; set; }
        public long AvgTotalCount90 { get; set; }
        public long AvgTotalParsed90 { get; set; }
        public long AvgTotalCount60 { get; set; }
        public long AvgTotalParsed60 { get; set; }
        public long AvgTotalCount30 { get; set; }
        public long AvgTotalParsed30 { get; set; }
        public long LastDayTotalCount { get; set; }
        public long LastDayTotalParsed { get; set; }
        public double PercentEmailParsed { get; set; }
        public double PercentGenderParsed { get; set; }
        public double PercentBirthyearParsed { get; set; }
        public double PercentNameParsed { get; set; }
        public double PercentUsernameParsed { get; set; }


    }
}