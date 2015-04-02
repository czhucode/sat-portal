using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace StatsPortal.DAL
{
    public abstract class Repository<T> where T : new ()
    {
        protected readonly IDbConnection _connection;

        protected Repository(IDbConnection connection)
        {
            _connection = connection;
        }

        protected IEnumerable<T> ToList(IDbCommand command)
        {
            using (var reader = command.ExecuteReader())
            {
                var items = new List<T>();
                while (reader.Read())
                {
                    var item = new T();
                    Map(reader, item);
                    items.Add(item);
                }

                return items;
            }
        }

        protected abstract void Map(IDataRecord record, T item);
    }
}