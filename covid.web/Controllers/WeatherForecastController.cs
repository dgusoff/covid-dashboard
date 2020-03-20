using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using covid.services;
using covid_data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace net_core_ts.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {      
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ICovidData _dataService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, ICovidData dataService)
        {
            _dataService = dataService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<CovidMasterData> Get()
        {
            return await _dataService.GetAllCovidData();           
        }
    }
}
