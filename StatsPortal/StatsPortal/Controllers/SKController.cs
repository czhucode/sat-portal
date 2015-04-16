using System;
using System.Collections.Generic;
using System.Data;
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
            // Use the Connection factory to create connections to multiple databases.
            var factory = new ConnectionFactory("SAT01");
            

            using (IDbConnection conn = factory.CreateConnection())
            {
                // Initialize the repository
                var SKRepo = new SKRepository(conn);

                var skModel = SKRepo.GetAll();

                return View(skModel);
            }

            
        }

    }
}

