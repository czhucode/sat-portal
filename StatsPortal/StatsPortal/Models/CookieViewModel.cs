using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class CookieViewModel
    {
        public CookieModel CookieStats { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
    }
}