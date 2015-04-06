using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using StatsPortal.DAL.Extensions;
using StatsPortal.Models;

namespace StatsPortal.DAL.Repository
{
    public class CookiesRepository : Repository<CookieModel>
    {
        public CookiesRepository(IDbConnection connection) : base(connection)
        {


        }

        protected override void Map(IDataRecord record, CookieModel item)
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
        public IEnumerable<CookieModel> GetAll(string startDate, string endDate)
        {
            using (var command = _connection.CreateCommand())
            {
                List<DateTime> testDates = new List<DateTime>();
                testDates.Add(DateTime.ParseExact(startDate, "yyyyMMdd", null));
                //for (int i = 1; i < (Convert.ToInt32(endDate) - Convert.ToInt32(startDate) + 1); i++)
                for (int i = 1; i < 7; i++)
                {
                    testDates.Add(DateTime.ParseExact(startDate, "yyyyMMdd", null).AddDays(i));
                }
                string test_query = "SELECT * FROM cookiejar_stats_v2 WITH (NOLOCK) WHERE i_handoff_date IN (";
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

        public int GetMaxDate()
        {
            int item = 0;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"SELECT MAX(i_handoff_date) AS i_handoff_date FROM cookiejar_stats_v2";
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
//SELECT MAX(i_handoff_date) FROM cookiejar_stats_v2