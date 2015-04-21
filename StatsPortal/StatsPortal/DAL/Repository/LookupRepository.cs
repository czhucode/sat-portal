using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using StatsPortal.DAL.Extensions;
using StatsPortal.Models;

namespace StatsPortal.DAL.Repository
{
    public class LookupRepository : Repository<LookupModel>
    {
        public LookupRepository(IDbConnection connection) : base(connection)
        {
        }

        protected override void Map(IDataRecord record, LookupModel item)
        {
            item.Domain = record.GetValue<String>("v_domain");
            item.Date = record.GetValue<int>("i_week_id");
            item.LookupCount = record.GetValue<Int64>("i_lookup_count");
            item.NameCount = record.GetValue<Int64>("i_name_count");
            item.GenderCount = record.GetValue<Int64>("i_gender_count");
            item.BirthyearCount = record.GetValue<Int64>("i_birthyear_count");
            item.EmailCount = record.GetValue<Int64>("i_email_count");
        }

        // List All fields from the table
        public IEnumerable<LookupModel> GetAll()
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Select * from dbo.matching_lookup_stats";
                return ToList(command);
            }
        }

        public IEnumerable<LookupModel> GetWhereDomainIs(string domain)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Select * from dbo.matching_lookup_stats where v_domain = @domain";
                command.AddParameter("domain", domain);
                return ToList(command);
            }
        } 
    }
}