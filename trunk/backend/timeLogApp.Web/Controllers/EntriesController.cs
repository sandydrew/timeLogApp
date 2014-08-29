using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
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
        public IEnumerable<EntryViewModel> Get(string startDate)
        {
            //validate
            if (!startDate.IsYmdDate())
            {
                throw new Exception("Invalid input");
            }

            return ObjectFactory.GetInstance<IDataProvider>()
                    .GetEntries(startDate.ParseUtcDate())
                    .Select(x => x.AsViewModel());
        }

        public IEnumerable<EntryViewModel> Get(string startDate, string endDate)
        {
            //validate
            if (!startDate.IsYmdDate() || !endDate.IsYmdDate())
            {
                throw new Exception("Invalid input");
            }

            return ObjectFactory.GetInstance<IDataProvider>()
                .GetMultiDayEntries(startDate.ParseUtcDate(), endDate.ParseUtcDate())
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