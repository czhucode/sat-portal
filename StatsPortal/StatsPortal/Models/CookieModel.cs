using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class CookieModel
    {

        public string Domain { get; set; }
        public string Keyword { get; set; }
        public long TotalCount { get; set; }
        public long TotalParsed { get; set; }
        public long EmailParsed { get; set; }
        public long GenderParsed { get; set; }
        public long BirthyearParsed { get; set; }
        public long NameParsed { get; set; }
        public long UsernameParsed { get; set; }
        public string Date { get; set; }

    }
}