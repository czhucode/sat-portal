using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using Microsoft.Ajax.Utilities;
using StatsPortal.DAL;
using StatsPortal.DAL.Repository;
using StatsPortal.Models;

namespace StatsPortal.Controllers
{
    public class RIDetectorController : Controller
    {
        private IEnumerable<RIActiveMachineChangeEventsModel> RIActiveMachineChangeEventsStats;
        private IEnumerable<RIActivePersonChangeEventsModel> RIActivePersonChangeEventsStats;
        private IEnumerable<RIActivePersonWithByChangeEventsModel> RIActivePersonWithByChangeEventsStats;
        private IEnumerable<RIActivePersonWithGenChangeEventsModel> RIActivePersonWithGenChangeEventsStats;

        public ActionResult RIDetector()
        {
            // Use the Connection factory to create connections to multiple databases.
            var factory = new ConnectionFactory("SAT01");

            // Declare the ViewModel 
            var model = new RIDetectorModel();

            using (IDbConnection conn = factory.CreateConnection()) { 

                //conn.Open();
                // Initialize the repos
                var RIActiveMachineChangeEventsRepo = new RIActiveMachineChangeEventsRepository(conn);
                var RIActivePersonChangeEventsRepo = new RIActivePersonChangeEventsRepository(conn);
                var RIActivePersonWithByChangeEventsRepo = new RIActivePersonWithByChangeEventsRepository(conn);
                var RIActivePersonWithGenChangeEventsRepo = new RIActivePersonWithGenChangeEventsRepository(conn);

                var maxWeedID = RIActiveMachineChangeEventsRepo.GetMaxWeekID();
                
                RIActiveMachineChangeEventsStats = RIActiveMachineChangeEventsRepo.GetByWeekID(maxWeedID);
                RIActivePersonChangeEventsStats = RIActivePersonChangeEventsRepo.GetByWeekID(maxWeedID);
                RIActivePersonWithByChangeEventsStats = RIActivePersonWithByChangeEventsRepo.GetByWeekID(maxWeedID);
                RIActivePersonWithGenChangeEventsStats = RIActivePersonWithGenChangeEventsRepo.GetByWeekID(maxWeedID);

                // Load the entire table
              
                model.RIActiveMachineChangeEventsStats = RIActiveMachineChangeEventsStats.ToArray();
                model.RIActivePersonChangeEventsStats = RIActivePersonChangeEventsStats.ToArray();
                model.RIActivePersonWithByChangeEventsStats = RIActivePersonWithByChangeEventsStats.ToArray();
                model.RIActivePersonWithGenChangeEventsStats = RIActivePersonWithGenChangeEventsStats.ToArray();
              
            }
            
            return View(model);
        }
    }
}