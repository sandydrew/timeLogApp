using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Runtime.Remoting.Channels;
using System.Web;

namespace timeLogApp.Web.Config
{
    public static class AppSettings
    {
        public static string EntriesFile
        {
            get
            {
                return HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["EntriesFile"]);
            }
        }
    }
}