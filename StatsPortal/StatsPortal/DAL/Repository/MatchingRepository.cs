using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using StatsPortal.DAL.Extensions;
using StatsPortal.Models;

namespace StatsPortal.DAL.Repository
{
    public class MatchingRepository : Repository<MatchedIdsModel>
    {
        public MatchingRepository(IDbConnection connection) : base(connection)
        {
        }

        protected override void Map(IDataRecord record, MatchedIdsModel item)
        {
            item.Domain = record.GetValue<String>("v_domain");
            item.EligibleIdsCount = record.GetValue<Int64>("i_eligible_ids");
            item.Date = record.GetValue<int>("i_week_id");
            item.MatchedIdsCount = record.GetValue<Int64>("i_matched_ids");
            item.NameCount = record.GetValue<Int64>("i_name_count");
            item.GenderCount = record.GetValue<Int64>("i_gender_count");
            item.BirthyearCount = record.GetValue<Int64>("i_birthyear_count");
            item.EmailCount = record.GetValue<Int64>("i_email_count");
        }

        // List All fields from the table
        public IEnumerable<MatchedIdsModel> GetAll()
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Select * from dbo.matching_id_stats";
                return ToList(command);
            }
        }
    }
}