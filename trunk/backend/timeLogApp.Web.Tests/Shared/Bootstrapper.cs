using StructureMap;
using timeLogApp.Data.Providers;
using timeLogApp.Web.Tests.Mocks;

namespace timeLogApp.Web.Tests.Shared
{
    public static class Bootstrapper
    {
        public static void BoostrapResources()
        {
            ObjectFactory.Initialize(x =>
                x.For<IDataProvider>().Use<MockDataProvider>().Singleton());
        }
    }
}
