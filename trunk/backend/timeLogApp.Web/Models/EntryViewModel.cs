using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace timeLogApp.Web.Models
{
    public class EntryViewModel
    {
        public int entryId { get; set; }
        public DateTime entryDate { get; set; }
        public int timeZoneOffset { get; set; }
        public int startH { get; set; }
        public int startM { get; set; }
        public int endH { get; set; }
        public int endM { get; set; }
        public string projectCode { get; set; }
        public string description { get; set; }
    }
}