using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using timeLogApp.Data.Entities;

namespace timeLogApp.Data.Providers.File
{
    public class FileEntry: IEntry
    {
        public int EntryId { get; set; }
        public DateTime EntryDate { get; set; }
        public int StartH { get; set; }
        public int StartM { get; set; }
        public int EndH { get; set; }
        public int EndM { get; set; }
        public string ProjectCode { get; set; }
        public string Description { get; set; }
    }
}
