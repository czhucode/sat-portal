using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class RIActivePersonWithByChangeEventsModel
    {
        public double ByChangePercent { get; set; }
        public double CurrPercentWithBy { get; set; }
        public String WeekDelta { get; set; }
        public string CountryName { get; set; }
        public string ComputerLocation { get; set; }
        public int WeekID { get; set; }
    }
}