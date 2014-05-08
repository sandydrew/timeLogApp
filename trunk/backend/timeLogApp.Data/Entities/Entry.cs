using System;

namespace timeLogApp.Data.Entities
{
    public class Entry : IEntry
    {
        public int EntryId { get; set; }
        public DateTime EntryDate { get; set; }
        public int StartH { get; set; }
        public int StartM { get; set; }
        private DateTime? _startDate;
        public DateTime StartDate
        {
            get
            {
                return (DateTime)(_startDate ?? (_startDate = EntryDate.AddHours(StartH).AddMinutes(StartM)));
            }
        }
        public int EndH { get; set; }
        public int EndM { get; set; }
        public string ProjectCode { get; set; }
        public string Description { get; set; }
    }
}
