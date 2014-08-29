using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using StructureMap;
using timeLogApp.Data.Providers;
using timeLogApp.Web.Controllers;
using timeLogApp.Web.Models;
using timeLogApp.Web.Tests.Shared;

namespace timeLogApp.Web.Tests.Controllers
{
    [TestClass]
    public class ValuesControllerTest
    {
        [TestInitialize]
        public void DoThisBefore()
        {
            Bootstrapper.BoostrapResources();
        }

        [TestMethod]
        public void GetByDate()
        {
            // Arrange
            var controller = new EntriesController();

            // Act
            IEnumerable<EntryViewModel> result = controller.Get("2014-04-15");

            // Assert
            Assert.AreEqual(3, result.Count());
        }

        [TestMethod]
        public void GetMultipleByDate()
        {
            //Arrange
            var controller = new EntriesController();

            //Act
            IEnumerable<EntryViewModel> result = controller.Get("2014-04-15", "2014-04-18");

            Assert.AreEqual(9, result.Count());
        }

        [TestMethod]
        public void Insert()
        {
            // Arrange
            var controller = new EntriesController();
            var entriesProvider = ObjectFactory.GetInstance<IDataProvider>();

            // Act
            var newItem = new EntryViewModel()
            {
                entryId = 0,
                entryDate = new DateTime(2014, 4, 15),
                startH = 12,
                startM = 0,
                endH = 13,
                endM = 0,
                projectCode = "CSU0071",
                description = "description"
            };
            
            controller.Post(newItem);
            var dateEntries = entriesProvider.GetEntries(newItem.entryDate);

            // Assert
            Assert.AreEqual(4, dateEntries.Count());
        }
        
        [TestMethod]
        public void Delete()
        {
            // Arrange
            var controller = new EntriesController();
            var entriesProvider = ObjectFactory.GetInstance<IDataProvider>();

            controller.Request = new HttpRequestMessage(HttpMethod.Delete, "http://localhost:9999/api/entries?entryId=2");

            // Act
            controller.Delete();
            var dateEntries = entriesProvider.GetEntries(new DateTime(2014, 4, 15));

            // Assert
            Assert.AreEqual(2, dateEntries.Count());
        }
    }
}
