using System;
using System.Text.RegularExpressions;

namespace timeLogApp.Web.Extensions
{
    public static class StringExtensions
    {
        public static DateTime ParseUtcDate(this string inputDate)
        {
            var splitDate = inputDate.Split('-');
            return new DateTime(int.Parse(splitDate[0]),
                int.Parse(splitDate[1]),
                int.Parse(splitDate[2]),
                0, 0, 0,
                DateTimeKind.Utc);
        }

        public static bool IsYmdDate(this string inputDate)
        {
            return Regex.IsMatch(inputDate, @"^\d{4}-\d{1,2}-\d{1,2}$");
        }
    }
}