using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace timeLogApp.Shared.Extensions
{
    public static class DateTimeExtensions
    {
        public static bool IsBetween(this DateTime inputDate, DateTime startDate, DateTime endDate)
        {
            return inputDate >= startDate && inputDate < endDate;
        }
    }
}
