using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Mvc;
using StructureMap;
using timeLogApp.Data.Providers;
using timeLogApp.Web.Extensions;
using timeLogApp.Web.Models;

namespace timeLogApp.Web.Controllers
{
    public class EntriesController: ApiController
    {
        // GET api/entries
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/entries/2014-01-01
        public IEnumerable<EntryViewModel> Get(string id)
        {
            var splitDate = id.Split('-');

            //validate
            if (!Regex.IsMatch(id, @"^\d{4}-\d{1,2}-\d{1,2}$"))
            {
                throw new Exception("Invalid input");
            }

            return ObjectFactory.GetInstance<IDataProvider>()
                    .GetEntries(new DateTime(int.Parse(splitDate[0]), int.Parse(splitDate[1]), int.Parse(splitDate[2]), 0, 0, 0, DateTimeKind.Utc))
                    .Select(x => x.AsViewModel());
        }
        
        // POST api/entries
        public void Post(EntryViewModel entry)
        {
            ObjectFactory.GetInstance<IDataProvider>().UpdateEntry(entry.AsEntry());
        }

        // PUT api/entries/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/entries?entryId=
        public void Delete()
        {
            var qsParams = Request.RequestUri.ParseQueryString();
            int id;
            if (int.TryParse(qsParams["entryId"], out id))
            {
                ObjectFactory.GetInstance<IDataProvider>().DeleteEntry(id);
            }

        }
    }
}