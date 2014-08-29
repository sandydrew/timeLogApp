using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using timeLogApp.Data.Entities;
using timeLogApp.Shared.Extensions;

namespace timeLogApp.Data.Providers.File
{
    public class FileDataProvider : IDataProvider
    {
        private string PhysicalFilePath { get; set; }
        public FileDataProvider(string physicalFilePath)
        {
            PhysicalFilePath = physicalFilePath;
            EnsureFile();
        }

        public int UpdateEntry(IEntry entry)
        {
            var entries = GetAllEntries();
            var concreteEntry = (Entry)entry;

            //ensure the date doesn't have any hours, mins or seconds
            concreteEntry.EntryDate = concreteEntry.EntryDate.Date;

            if (concreteEntry.EntryId == 0)
            {
                //insert new.
                concreteEntry.EntryId = entries.Any() ? entries.Max(x => x.EntryId) + 1 : 1;
                entries.Add(concreteEntry);
            }
            else
            {
                var existingIndex = entries.FindIndex(x => x.EntryId == concreteEntry.EntryId);
                if (existingIndex < 0)
                {
                    return -1;
                }

                entries[existingIndex] = concreteEntry;
            }

            SaveAllEntries(entries);

            return concreteEntry.EntryId;
        }

        public IEnumerable<IEntry> GetEntries(DateTime date)
        {
            return GetAllEntries().Where(x => x.EntryDate.ToUniversalTime() == date);
        }

        public IEnumerable<IEntry> GetMultiDayEntries(DateTime startDate, DateTime endDate)
        {
            return GetAllEntries()
                    .Where(x => x.EntryDate.ToUniversalTime().IsBetween(startDate, endDate));
        }

        public void DeleteEntry(int entryId)
        {
            var entries = GetAllEntries();
            var existingIndex = entries.FindIndex(x => x.EntryId == entryId);

            if (existingIndex < 0)
            {
                return;
            }

            entries.RemoveAt(existingIndex);
            SaveAllEntries(entries);
        }

        private List<Entry> GetAllEntries()
        {
            lock (Locks.GetLockForKey(PhysicalFilePath))
            {
                using (var sr = new StreamReader(PhysicalFilePath))
                using (var jtr = new JsonTextReader(sr))
                {
                    var se = new JsonSerializer();
                    return se.Deserialize<IEnumerable<FileEntry>>(jtr).Select(x => x.AsEntry()).ToList();
                }
            }
        }

        private void SaveAllEntries(List<Entry> entries)
        {
            lock (Locks.GetLockForKey(PhysicalFilePath))
            {
                entries.Sort((x, y) => x.StartDate.CompareTo(y.StartDate));
                var json = JsonConvert.SerializeObject(entries.Select(x => x.AsFileEntry()), Formatting.Indented);
                System.IO.File.WriteAllText(PhysicalFilePath, json);
            }
        }

        private void EnsureFile()
        {
            if (!System.IO.File.Exists(PhysicalFilePath))
            {
                System.IO.File.WriteAllText(PhysicalFilePath, "[]");
            }
        }

    }

    public class Locks
    {
        static readonly IDictionary<string, object> LocksCollection = new Dictionary<string, object>();
        static readonly object MasterLock = new object();

        public static object GetLockForKey(string key)
        {
            if (!LocksCollection.ContainsKey(key))
            {
                lock (MasterLock)
                {
                    if (!LocksCollection.ContainsKey(key))
                    {
                        LocksCollection[key] = new object();
                    }
                }
            }
            return LocksCollection[key];
        }
    }
}
