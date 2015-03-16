﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class MatchedIdsModel
    {
        public long Date { get; set; }
        public long EligibleIdsCount { get; set; }
        public long MatchedIdsCount { get; set; }
        public long NameCount { get; set; }
        public long BirthyearCount { get; set; }
        public long GenderCount { get; set; }
        public long EmailCount { get; set; }
        public string Domain { get; set; }
    }
}