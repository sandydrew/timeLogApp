using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using timeLogApp.Data.Entities;

namespace timeLogApp.Data.Providers.File
{
    public static class FileEntryExtensions
    {
        public static FileEntry AsFileEntry(this Entry entry)
        {
            return new FileEntry()
            {
                EntryId = entry.EntryId,
                EntryDate = entry.EntryDate,
                StartH = entry.StartH,
                StartM = entry.StartM,
                EndH = entry.EndH,
                EndM = entry.EndM,
                ProjectCode = entry.ProjectCode,
                Description = entry.Description
            };
        }

        public static Entry AsEntry(this FileEntry entry)
        {
            return new Entry()
            {
                EntryId = entry.EntryId,
                EntryDate = entry.EntryDate,
                StartH = entry.StartH,
                StartM = entry.StartM,
                EndH = entry.EndH,
                EndM = entry.EndM,
                ProjectCode = entry.ProjectCode,
                Description = entry.Description
            };
        }
    }
}
