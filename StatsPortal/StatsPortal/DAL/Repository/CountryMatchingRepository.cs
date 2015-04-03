using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using StatsPortal.DAL.Extensions;
using StatsPortal.Models;

namespace StatsPortal.DAL.Repository
{
    public class CountryMatchingRepository : Repository<CountryMatchingStatsModel>
    {
        public CountryMatchingRepository(IDbConnection connection) : base(connection)
        {
        }

        protected override void Map(IDataRecord record, CountryMatchingStatsModel item)
        {
            item.Domain = record.GetValue<String>("v_domain");
            item.Country = record.GetValue<String>("v_country");
            item.Date = record.GetValue<int>("i_week_id");
            item.MatchedMachines = record.GetValue<Int64>("i_machines_matched");
            item.NameCount = record.GetValue<Int64>("i_name_count");
            item.GenderCount = record.GetValue<Int64>("i_gender_count");
            item.BirthyearCount = record.GetValue<Int64>("i_birthyear_count");
            item.EmailCount = record.GetValue<Int64>("i_email_count");
        }

        // Get all country stats for a given domain
        public IEnumerable<CountryMatchingStatsModel> GetByDomain(string domain)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Select * from dbo.test_cpearce_country_stats where v_domain = @domain";
                command.AddParameter("domain", domain);
                return ToList(command);
            }
        }

        public IEnumerable<CountryMatchingStatsModel> GetByCountryAndDomain(string country, string domain)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Select * from dbo.test_cpearce_country_stats where v_country = @country and v_domain = @domain";
                command.AddParameter("country", country);
                command.AddParameter("domain", domain);
                return ToList(command);
            }
        } 
    }
}