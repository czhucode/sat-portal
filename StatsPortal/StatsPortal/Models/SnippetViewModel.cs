﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatsPortal.Models
{
    public class SnippetViewModel
    {
        public SnippetModel[] SnippetStats { get; set; }
        public SnippetEmailModel[] SnippetEmailStats { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
    }
}