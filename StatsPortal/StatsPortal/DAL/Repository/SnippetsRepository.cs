using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using StatsPortal.DAL.Extensions;
using StatsPortal.Models;
namespace StatsPortal.DAL.Repository
{
    public class SnippetsRepository : Repository<SnippetModel>
    {
        public SnippetsRepository(IDbConnection connection) : base(connection)
        {
        }


        protected override void Map(IDataRecord record, SnippetModel item)
        {
            item.Domain = record.GetValue<String>("v_domain_name");
            item.Keyword = record.GetValue<String>("v_keyword");
            item.TotalCount = record.GetValue<int>("i_records_seen");
            item.TotalParsed = record.GetValue<int>("i_records_written");
            item.EmailParsed = record.GetValue<int>("i_email_written");
            item.GenderParsed = record.GetValue<int>("i_gender_written");
            item.BirthyearParsed = record.GetValue<int>("i_birth_year_written");
            item.NameParsed = record.GetValue<int>("i_name_written");
            item.UsernameParsed = record.GetValue<int>("i_username_written");
            item.Date = record.GetValue<int>("i_handoff_date").ToString();
        }

        // List All fields from the table
        public IEnumerable<SnippetModel> GetAll(string domain, string startDate, string endDate)
        {

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null)).Days < 1)
            {
                endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
            }
            
            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null)).Days > 64)
            {
                endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(63).ToString("yyyyMMdd");
            }

            using (var command = _connection.CreateCommand())
            {

                //List<string> testDates = new List<string>();
                //testDates.Add(startDate);
                List<DateTime> testDates = new List<DateTime>();
                testDates.Add(DateTime.ParseExact(startDate, "yyyyMMdd", null));

                var dayCount = (DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null)).Days + 1;

                //for (int i = 1; i < (Convert.ToInt32(endDate) - Convert.ToInt32(startDate) + 1); i++)
                for (int i = 1; i < dayCount; i++)
                {
                    testDates.Add(DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(i));
                }
                string test_query = "SELECT * FROM snippet_stats_v2 WITH (NOLOCK) WHERE v_domain_name = '" + domain +
                                    "' AND i_handoff_date IN (";
                for (int i = 0; i < testDates.Count; i++)
                {
                    if (i == testDates.Count - 1)
                    {
                        test_query += "'" + testDates[i].ToString("yyyyMMdd") + "'";
                    }
                    else
                    {
                        test_query += "'" + testDates[i].ToString("yyyyMMdd") + "',";
                    }
                }

                test_query += ")";
                command.CommandText = test_query;
                return ToList(command);
            }

        }

        public IEnumerable<string> GetDomains(string startDate, string endDate)
        {

            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null)).Days < 1)
            {
                endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
            }
            if ((DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null)).Days > 64)
            {
                endDate = DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(63).ToString("yyyyMMdd");
            }

            using (var command = _connection.CreateCommand())
            {

                var items = new List<string>();
               // List<string> testDates = new List<string>();
                //testDates.Add(startDate);
                List<DateTime> testDates = new List<DateTime>();
                testDates.Add(DateTime.ParseExact(startDate, "yyyyMMdd", null));

                var dayCount = (DateTime.ParseExact(endDate, "yyyyMMdd", null) - DateTime.ParseExact(startDate, "yyyyMMdd", null)).Days + 1;

                //for (int i = 1; i < (Convert.ToInt32(endDate) - Convert.ToInt32(startDate) + 1); i++)
                for (int i = 1; i < dayCount; i++)
                {
                    testDates.Add(DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(i));
                }
                string test_query =
                    "SELECT TOP 1000 (v_domain_name) FROM snippet_stats_v2 WITH (NOLOCK) WHERE i_handoff_date IN (";
                for (int i = 0; i < testDates.Count; i++)
                {
                    if (i == testDates.Count - 1)
                    {
                        test_query += "'" + testDates[i].ToString("yyyyMMdd") + "'";
                    }
                    else
                    {
                        test_query += "'" + testDates[i].ToString("yyyyMMdd") + "',";
                    }
                }
                test_query +=
                    ") AND v_domain_name IS NOT NULL GROUP BY v_domain_name ORDER BY SUM(i_records_seen) desc";
                command.CommandText = test_query;
                using (var reader = command.ExecuteReader())
                {

                    while (reader.Read())
                    {
                        items.Add(reader.GetValue<String>("v_domain_name"));
                    }

                }
                return items;
            }

        }

        public int GetMaxDate()
        {
            int item = 0;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"SELECT MAX(i_handoff_date) AS i_handoff_date FROM snippet_stats_v2";
                using (var reader = command.ExecuteReader())
                {

                    while (reader.Read())
                    {
                        item = reader.GetValue<int>("i_handoff_date");
                    }

                }
                return item;
                //return ToList(command);
            }
        }

        public int GetMinDate()
        {
            int item = 0;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"SELECT MIN(i_handoff_date) AS i_handoff_date FROM snippet_stats_v2";
                using (var reader = command.ExecuteReader())
                {

                    while (reader.Read())
                    {
                        item = reader.GetValue<int>("i_handoff_date");
                    }

                }
                return item;
                //return ToList(command);
            }
        } 


    }
}