using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace covid_data
{
    public class CovidDataPoint
    {
        public CovidDataPoint(string locale, string country)
        {
            Locale = locale;
            Country = country;
            Dates = new List<string>();
            NumConfirmed = new List<int>();
            NumDeaths = new List<int>();
            NumRecovered = new List<int>();
            NumActive = new List<int>();
        }       
        public string Country { get; set; }
        public string Locale { get; set; }
        public List<string> Dates { get; set; }
        public List<int> NumConfirmed { get; set; }
        public List<int> NumDeaths { get; set; }
        public List<int> NumRecovered { get; set; }
        public List<int> NumActive { get; set; }

        public List<int> DailyNewCases { get; set; }

        public List<int> DailyNewDeaths { get; set; }
    }

    public class CovidMasterData
    {
        public CovidMasterData()
        {
            LocaleData = new List<CovidDataPoint>();
            CountryData = new List<CovidDataPoint>();
        }
        public List<CovidDataPoint> LocaleData { get; set; }

        public List<CovidDataPoint> CountryData { get; set; }
        public List<string> Locales { get; set; }
        public List<string> Countries { get; set; }
        public List<string> Dates { get; set; }
        public List<int> AggregateNumConfirmed { get; set; }
        public List<int> AggregateNumDeaths { get; set; }
        public List<int> AggregateNumRecovered { get; set; }
        public List<int> AggregateNumActive { get; set; }

        public CovidDataPoint Get(string locale, string country)
        {
            return this.LocaleData.Where(c => c.Locale == locale && c.Country == country).SingleOrDefault();
        }

        public void GenerateCountryData()
        {
            CountryData = new List<CovidDataPoint>();
            AggregateNumConfirmed = new int[this.Dates.Count].ToList();
            AggregateNumDeaths = new int[this.Dates.Count].ToList();
            AggregateNumRecovered = new int[this.Dates.Count].ToList();
            AggregateNumActive = new int[this.Dates.Count].ToList();

            foreach (var localDataPoint in LocaleData)
            {
                var currentCountry = CountryData.Where(c => c.Country == localDataPoint.Country).SingleOrDefault();

                if (currentCountry == null)
                {
                    currentCountry = new CovidDataPoint("", localDataPoint.Country);

                    currentCountry.Dates = localDataPoint.Dates;
                    currentCountry.NumActive = localDataPoint.NumActive;
                    currentCountry.NumConfirmed = localDataPoint.NumConfirmed;
                    currentCountry.NumDeaths = localDataPoint.NumDeaths;
                    currentCountry.NumRecovered = localDataPoint.NumRecovered;
                    CountryData.Add(currentCountry);
                }
                else
                {
                    for (int i = 0; i < localDataPoint.NumActive.Count; i++)
                    {
                        currentCountry.NumActive[i] += localDataPoint.NumActive[i];
                    }
                    for (int i = 0; i < localDataPoint.NumConfirmed.Count; i++)
                    {
                        currentCountry.NumConfirmed[i] += localDataPoint.NumConfirmed[i];
                    }
                    for (int i = 0; i < localDataPoint.NumDeaths.Count; i++)
                    {
                        currentCountry.NumDeaths[i] += localDataPoint.NumDeaths[i];
                    }
                    for (int i = 0; i < localDataPoint.NumRecovered.Count; i++)
                    {
                        currentCountry.NumRecovered[i] += localDataPoint.NumRecovered[i];
                    }
                }

                for (int i = 0; i < localDataPoint.NumActive.Count; i++)
                {
                    this.AggregateNumActive[i] += localDataPoint.NumActive[i];
                }
                for (int i = 0; i < localDataPoint.NumConfirmed.Count; i++)
                {
                    this.AggregateNumConfirmed[i] += localDataPoint.NumConfirmed[i];
                }
                for (int i = 0; i < localDataPoint.NumDeaths.Count; i++)
                {
                    this.AggregateNumDeaths[i] += localDataPoint.NumDeaths[i];
                }
                for (int i = 0; i < localDataPoint.NumRecovered.Count; i++)
                {
                    this.AggregateNumRecovered[i] += localDataPoint.NumRecovered[i];
                }
            }
        }

        public void Trim()
        {
            foreach (var country in this.CountryData)
            {
                if (country.NumConfirmed[country.NumConfirmed.Count - 1] < 500)
                {
                    this.Countries.Remove(country.Country);
                }
                this.Countries.Sort();
            }
            foreach (var locale in this.LocaleData)
            {
                if (locale.NumConfirmed[locale.NumConfirmed.Count - 1] < 100 || this.Countries.Contains(locale.Locale))
                {
                    this.Locales.Remove(locale.Locale);
                }
                this.Locales.Sort();
            }
        }
    }            
}
