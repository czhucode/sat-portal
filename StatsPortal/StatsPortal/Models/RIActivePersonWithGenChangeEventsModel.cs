using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class RIActivePersonWithGenChangeEventsModel
    {
        public double GenChangePercent { get; set; }
        public double CurrPercentWithGen { get; set; }
        public String WeekDelta { get; set; }
        public string CountryName { get; set; }
        public string ComputerLocation { get; set; }
        public int WeekID { get; set; }
    }
}