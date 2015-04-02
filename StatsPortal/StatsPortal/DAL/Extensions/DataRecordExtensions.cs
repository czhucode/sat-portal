using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace StatsPortal.DAL.Extensions
{
    public static class DataRecordExtensions
    {
        public static T GetValue<T>(this IDataRecord record, string colName)
        {
            int colIndex = record.GetOrdinal(colName);
            return record.GetValueOrDefault<T>(colIndex);
        }

        public static T GetValueOrDefault<T>(this IDataRecord record, int colIndex)
        {
            return (T)(record.IsDBNull(colIndex) ? default(T) : record.GetValue(colIndex));
        }
    }
}