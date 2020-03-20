using covid_data;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace covid.services
{
    public interface ICovidData
    {
        Task<CovidMasterData> GetAllCovidData();      
    }

    public class InMemoryCovidData : ICovidData
    {
        public async Task<CovidMasterData> GetAllCovidData()
        {
            return new CovidMasterData()
            {

            };
        }
       
    }
}
