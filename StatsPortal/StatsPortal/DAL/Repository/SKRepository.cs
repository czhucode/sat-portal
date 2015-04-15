using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using StatsPortal.DAL.Extensions;
using StatsPortal.Models;

namespace StatsPortal.DAL.Repository
{
    public class SKRepository : Repository<SKModel>
    {
        public SKRepository(IDbConnection connection) : base(connection)
        {
        }

        protected override void Map(IDataRecord record, SKModel item)
        {
            item.Country = record.GetValue<String>("country");
            item.WeekId = record.GetValue<int>("time_period_id");
            item.Variable = record.GetValue<String>("variable");
            item.Description = record.GetValue<String>("description");
            item.Value = record.GetValue<Double>("value");
            
            //fill enum
            
        }
    }
}