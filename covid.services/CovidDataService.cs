using covid_data;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

using Microsoft.VisualBasic.FileIO;
using System.IO;

namespace covid.services
{
  
    public class CovidDataService : ICovidData
    {
        private HttpClient client;       

        public CovidDataService()
        {
            this.client = new HttpClient();
        }

        public async Task<CovidMasterData> GetAllCovidData()
        {
            CovidMasterData data = await GetCaseData("Confirmed", null);
            await GetCaseData("Deaths", data);
            await GetCaseData("Recovered", data);
            data.GenerateCountryData();
            data.Trim();

            return data;
        }

        private async Task<List<string>> GetCsvData(string category)
        {
            string url = $"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-{category}_global.csv";
            var resp = await client.GetAsync(url);
            resp.EnsureSuccessStatusCode();
            string rawCasesData = await resp.Content.ReadAsStringAsync();
            return rawCasesData.Split(new char[] { '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries).ToList();
        }

        public async Task<CovidMasterData> GetCaseData(string status, CovidMasterData masterData)
        {
            bool isNew = false;
            if (masterData == null)
            {
                isNew = true;
                masterData = new CovidMasterData();
            }
           
            var lines = await GetCsvData(status);

            if (isNew)
            {
                string headerRow = lines[0];
                List<string> dates = headerRow.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries).ToList();
                dates.RemoveRange(0, 4);
                masterData.Dates = dates.Skip(dates.Count - 21).ToList();
                GetLocales(lines.Skip(1), masterData); 
            }

            List<CovidDataPoint> localeData = new List<CovidDataPoint>();
            foreach(string line in lines.Skip(1))
            {
                try
                {
                    string trimmedLine = line.TrimEnd(',');
                    TextFieldParser parser = new TextFieldParser(new StringReader(trimmedLine));
                    parser.HasFieldsEnclosedInQuotes = true;
                    parser.SetDelimiters(",");

                    string[] fields;

                    while (!parser.EndOfData)
                    {
                        fields = parser.ReadFields();

                        string localeField = fields[0].Replace(",", "").Replace("'", "");

                        List<int> counts = new List<int>();
                        try
                        {
                           counts = fields.ToList().Skip(4).Select(int.Parse).ToList();
                        }
                        catch (Exception ex)
                        {
                            
                        }
                        List<int> dailyCounts = new int[counts.Count].ToList();

                        CovidDataPoint point = new CovidDataPoint(localeField.Replace(",", ""), fields[1]);                       

                        if (!isNew)
                        {
                            point = masterData.Get(localeField, fields[1]);
                        }

                        for (int i = 0; i < counts.Count; i++)
                        {
                            if (i == 0)
                            {
                                dailyCounts[i] = 0;
                            }
                            else
                            {                                
                                dailyCounts[i] = counts[i] - counts[i - 1] < 0 ? 0 : counts[i] - counts[i - 1];
                            }
                        }

                        switch (status)
                        {
                            case "Confirmed":
                                point.NumConfirmed = counts.Skip(counts.Count - 21).ToList();
                                point.DailyNewCases = dailyCounts.Skip(dailyCounts.Count - 21).ToList();
                                break;
                            case "Deaths":
                                point.NumDeaths = counts.Skip(counts.Count - 21).ToList();
                                point.DailyNewDeaths = dailyCounts.Skip(dailyCounts.Count - 21).ToList();
                                break;
                            case "Recovered":
                                point.NumRecovered = counts.Skip(counts.Count - 21).ToList();
                                break;
                            default:
                                break;
                        }
                        localeData.Add(point);
                    }
                }
                catch (Exception ex)
                {
                    var a = ex;
                    throw;
                }
            }
            masterData.LocaleData = localeData;
            return masterData;
        }      

        private void GetLocales(IEnumerable<string> localeLines, CovidMasterData masterData)
        {
            List<string> locales = new List<string>();
            List<string> countries = new List<string>();
            foreach(string localeLine in localeLines)
            {
                TextFieldParser parser = new TextFieldParser(new StringReader(localeLine));
                parser.HasFieldsEnclosedInQuotes = true;
                parser.SetDelimiters(",");

                string[] fields;

                while (!parser.EndOfData)
                {
                    fields = parser.ReadFields();
                    string localeField = fields[0].Replace(",", "").Replace("'", "");
                    
                    if (!locales.Contains(localeField))
                    {
                        locales.Add(localeField);
                    }
                    if (!countries.Contains(fields[1]))
                    {
                        countries.Add(fields[1]);
                    }
                }     
            }
            masterData.Countries = countries;
            masterData.Locales = locales;
        }
    }
}
