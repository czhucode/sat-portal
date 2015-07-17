using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class RIDetectorModel
    {
        public RIActiveMachineChangeEventsModel[] RIActiveMachineChangeEventsStats { get; set; }
        public RIActivePersonChangeEventsModel[] RIActivePersonChangeEventsStats { get; set; }
        public RIActivePersonWithByChangeEventsModel[] RIActivePersonWithByChangeEventsStats { get; set; }
        public RIActivePersonWithGenChangeEventsModel[] RIActivePersonWithGenChangeEventsStats { get; set; }
    }
}