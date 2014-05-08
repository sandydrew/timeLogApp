using System;

namespace timeLogApp.Data.Entities
{
    public interface IEntry
    {
        int EntryId { get; set; }
        DateTime EntryDate { get; set; }
        int StartH { get; set; }
        int StartM { get; set; }
        int EndH { get; set; }
        int EndM { get; set; }
        string ProjectCode { get; set; }
        string Description { get; set; }
    }
}