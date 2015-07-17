using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using StatsPortal.DAL.Extensions;
using StatsPortal.Models;

namespace StatsPortal.DAL.Repository
{
    public class RIActivePersonWithGenChangeEventsRepository : Repository<RIActivePersonWithGenChangeEventsModel>
    {
        public RIActivePersonWithGenChangeEventsRepository(IDbConnection connection)
            : base(connection)
        {
        }

        protected override void Map(IDataRecord record, RIActivePersonWithGenChangeEventsModel item)
        {
            item.GenChangePercent = record.GetValue<Double>("% Gender Changes");
            item.CurrPercentWithGen = record.GetValue<Double>("Current % with Gender");
            item.WeekDelta = record.GetValue<String>("Week Delta");
            item.CountryName = record.GetValue<String>("Country Name");
            item.ComputerLocation = record.GetValue<String>("Computer Location");
            item.WeekID = record.GetValue<int>("comScore Week");
        }

        // List All fields from the table
        public IEnumerable<RIActivePersonWithGenChangeEventsModel> GetAll()
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Select * from dbo.active_persons_with_gender_change_events";
                return ToList(command);
            }
        }

        // List All fields from the table by WeedID
        public IEnumerable<RIActivePersonWithGenChangeEventsModel> GetByWeekID(int weekID)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Select * from dbo.active_persons_with_gender_change_events where [comScore Week] = " + weekID;
                return ToList(command);
            }
        }

        public int GetMaxWeekID()
        {
            int maxWeekID = 0;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Select MAX([comScore Week]) as max_weekid from dbo.active_persons_with_gender_change_events";
                using (var reader = command.ExecuteReader())
                {

                    while (reader.Read())
                    {
                        maxWeekID = reader.GetValue<int>("max_weekid");
                    }

                }
                return maxWeekID;
            }
        }
    }
}