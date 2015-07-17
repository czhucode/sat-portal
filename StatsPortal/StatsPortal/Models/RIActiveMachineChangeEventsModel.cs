using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class RIActiveMachineChangeEventsModel
    {
        public double ChangePercent { get; set; }
        public int MachinesCount { get; set; }
        public String WeekDelta { get; set; }
        public string CountryName { get; set; }
        public string ComputerLocation { get; set; }
        public int WeekID { get; set; }
    }
}