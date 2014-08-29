using System;
using System.Collections.Generic;
using timeLogApp.Data.Entities;

namespace timeLogApp.Data.Providers
{
    public interface IDataProvider
    {
        int UpdateEntry(IEntry entry);
        IEnumerable<IEntry> GetEntries(DateTime date);
        IEnumerable<IEntry> GetMultiDayEntries(DateTime startDate, DateTime endDate);
        void DeleteEntry(int entryId);
    }
}