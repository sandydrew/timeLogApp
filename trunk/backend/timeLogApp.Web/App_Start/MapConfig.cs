using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using StructureMap;
using timeLogApp.Data.Providers;
using timeLogApp.Data.Providers.File;

namespace timeLogApp.Web.App_Start
{
    public static class MapConfig
    {
        public static void MapObjects()
        {
            ObjectFactory.Initialize(x => 
                x.For<IDataProvider>().Use<FileDataProvider>()
                .Ctor<string>("physicalFilePath").Is(Config.AppSettings.EntriesFile));
        }
    }
}