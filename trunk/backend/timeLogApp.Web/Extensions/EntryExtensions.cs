using timeLogApp.Data.Entities;
using timeLogApp.Web.Models;

namespace timeLogApp.Web.Extensions
{
    public static class EntryExtensions
    {
        public static EntryViewModel AsViewModel(this IEntry entry)
        {
            return new EntryViewModel()
            {
                entryId = entry.EntryId,
                entryDate = entry.EntryDate,
                startH = entry.StartH,
                startM = entry.StartM,
                endH = entry.EndH,
                endM = entry.EndM,
                projectCode = entry.ProjectCode,
                description = entry.Description
            };
        }

        public static Entry AsEntry(this EntryViewModel entry)
        {
            return new Entry()
            {
                EntryId = entry.entryId,
                EntryDate = entry.entryDate.AddMinutes(entry.timeZoneOffset * -1),
                StartH = entry.startH,
                StartM = entry.startM,
                EndH = entry.endH,
                EndM = entry.endM,
                ProjectCode = entry.projectCode,
                Description = entry.description
            };
        }
    }
}