using covid.services;
using covid_data;
using NUnit.Framework;
using System.Threading.Tasks;

namespace covid.tests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {
            Assert.Pass();
        }

        //[Test]
        //public void GetTestData()
        //{
        //    InMemoryCovidData service = new InMemoryCovidData();
        //    CovidDataPoint list = service.GetAllCovidData();

        //    Assert.IsTrue(list.Dates.Count == 5);
        //}

        //[Test]
        //public async Task GetWebData()
        //{
        //    CovidDataService service = new CovidDataService();
        //    CovidDataPoint list = await service.GetAllCovidData();

        //    Assert.IsTrue(list.Dates.Count == 5);
        //}

        //[Test]
        //public async Task GetWebData()
        //{
        //    CovidDataService service = new CovidDataService();
        //    CovidDataPoint list = await service.GetAllCovidData();

        //    Assert.IsTrue(list.Dates.Count == 5);
        //}

        [Test]
        public async Task GetWebData()
        {
            CovidDataService service = new CovidDataService();
            CovidMasterData data = await service.GetCaseData("Confirmed", null);
            await service.GetCaseData("Deaths", data);
            await service.GetCaseData("Recovered", data);
            data.GenerateCountryData();
            Assert.IsTrue(data.LocaleData.Count > 100);
        }
    }
}