using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StatsPortal.DAL;
using StatsPortal.DAL.Repository;
using StatsPortal.Models;

namespace StatsPortal.Controllers
{
    public class SKController : Controller
    {

        public void Init()
        {
            //SKModel m = new SKModel();
            //m.Variable = Variables.MalePredictedCount;
        }

        public ActionResult SK()
        {

            return View();
        }

    }
}

