using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using timeLogApp.Data.Entities;
using timeLogApp.Data.Providers;
using timeLogApp.Shared.Extensions;

namespace timeLogApp.Web.Tests.Mocks
{
    public class MockDataProvider: IDataProvider
    {

        public MockDataProvider(List<Entry> entries)
        {
            Entries = GetEntries();
        }

        public List<Entry> Entries { get; private set; }

        private List<Entry> GetEntries()
        {
            return new List<Entry>()
            {
                new Entry() { EntryId = 1, EntryDate = new DateTime(2014, 4, 15), StartH = 09, StartM = 00, EndH = 10, EndM = 00, ProjectCode = "CSU0071", Description = "Description 15" },
                new Entry() { EntryId = 2, EntryDate = new DateTime(2014, 4, 15), StartH = 10, StartM = 00, EndH = 10, EndM = 30, ProjectCode = "CSU0072", Description = "Description 15" },
                new Entry() { EntryId = 3, EntryDate = new DateTime(2014, 4, 15), StartH = 10, StartM = 30, EndH = 11, EndM = 00, ProjectCode = "CSU0071", Description = "Description 15" },

                new Entry() { EntryId = 4, EntryDate = new DateTime(2014, 4, 16), StartH = 09, StartM = 00, EndH = 10, EndM = 00, ProjectCode = "CSU0071", Description = "Description 16" },
                new Entry() { EntryId = 5, EntryDate = new DateTime(2014, 4, 16), StartH = 10, StartM = 00, EndH = 10, EndM = 30, ProjectCode = "CSU0072", Description = "Description 16" },
                new Entry() { EntryId = 6, EntryDate = new DateTime(2014, 4, 16), StartH = 10, StartM = 30, EndH = 11, EndM = 00, ProjectCode = "CSU0071", Description = "Description 16" },

                new Entry() { EntryId = 7, EntryDate = new DateTime(2014, 4, 17), StartH = 09, StartM = 00, EndH = 10, EndM = 00, ProjectCode = "CSU0071", Description = "Description 17" },
                new Entry() { EntryId = 8, EntryDate = new DateTime(2014, 4, 17), StartH = 10, StartM = 00, EndH = 10, EndM = 30, ProjectCode = "CSU0072", Description = "Description 17" },
                new Entry() { EntryId = 9, EntryDate = new DateTime(2014, 4, 17), StartH = 10, StartM = 30, EndH = 11, EndM = 00, ProjectCode = "CSU0071", Description = "Description 17" }
            };
        }
        
        public int UpdateEntry(IEntry entry)
        {
            var concreteEntry = (Entry)entry;

            if (concreteEntry.EntryId < 1)
            {
                concreteEntry.EntryId = Entries.Max(x => x.EntryId) + 1;
                Entries.Add(concreteEntry);
            }
            else
            {
                var existingIndex = Entries.FindIndex(x => x.EntryId == concreteEntry.EntryId);

                if (existingIndex < 0)
                {
                    return -1;
                }

                Entries[existingIndex] = concreteEntry;
            }

            return entry.EntryId;
        }

        public IEnumerable<IEntry> GetEntries(DateTime date)
        {
            return Entries.Where(x => x.EntryDate == date);
        }

        public IEnumerable<IEntry> GetMultiDayEntries(DateTime startDate, DateTime endDate)
        {
            return Entries.Where(x => x.EntryDate.IsBetween(startDate, endDate));
        }

        public void DeleteEntry(int entryId)
        {
            var existingIndex = Entries.FindIndex(x => x.EntryId == entryId);

            if (existingIndex < 0)
            {
                return;
            }

            Entries.RemoveAt(existingIndex);
        }
    }
}
