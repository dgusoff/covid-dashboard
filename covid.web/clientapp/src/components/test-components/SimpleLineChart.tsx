import * as React from "react";
import Chart from 'chart.js';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

interface ICovidDataProps {

}
interface ICovidDataState {    
    countryOptions: IDropdownOption[],   
    localeOptions: IDropdownOption[],
    fullData: any;
    chart: any
}

export class CovidLineCharts extends React.Component<ICovidDataProps, ICovidDataState> {
    constructor(props: ICovidDataProps) {
        super(props);

        this.state = {
            countryOptions: [],
            localeOptions: [],
            fullData: {},
            chart: {}
        };
    }
    async componentDidMount() {

        let data = await fetch("/coviddata/");
        let dataJson = await data.json();
        console.log(dataJson);

        const countryOptions: IDropdownOption[] = [];
        dataJson.countries.sort().map((item:any) => {
            countryOptions.push({ 'key': item, 'text': item });
        });

        const localeOptions: IDropdownOption[] = [];
        dataJson.locales.sort().map((item: any) => {
            if (localeOptions.indexOf(item) == -1) {
                localeOptions.push({ 'key': item, 'text': item });
            }           
        });       

        this.setState(prevState => ({
            fullData: dataJson,
            countryOptions: countryOptions,
            localeOptions: localeOptions
        }));

        this.renderChart(dataJson.aggregateNumConfirmed, dataJson.aggregateNumDeaths, dataJson.numRecovered);
       
    }


    public render() {
        return (
            <div className="container">
                <div>
                    <Dropdown onChange={this.countrySelected} placeholder="Select a country" label="Choose a country" options={this.state.countryOptions} />
                </div>

                <div>
                    <Dropdown onChange={this.localeSelected} placeholder="Select a Locale" label="OR, Choose a locale" options={this.state.localeOptions} />
                </div>

                <div>
                    <p>Cumulative Totals</p>
                    <canvas id="myChart" ref="myCanvas"/>
                </div>
            </div>
        )
    }

    countrySelected = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
        if (option && option.text) {
            let selectedCountry = this.state.fullData.countryData.filter((c: { country: string; }) => c.country == option.text)[0];
            this.renderChart(selectedCountry.numConfirmed, selectedCountry.numDeaths, selectedCountry.numRecovered);
        }
    }

    localeSelected = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
        if (option && option.text) {
            let selectedLocale = this.state.fullData.localeData.filter((c: { locale: string; }) => c.locale == option.text)[0];
            this.renderChart(selectedLocale.numConfirmed, selectedLocale.numDeaths, selectedLocale.numRecovered);
        }
    }

    renderChart = (confirmData: [], deathData: [], recoveredData: []) => {       
        const canvas = this.refs.myCanvas as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");

        Chart.helpers.each(Chart.instances, function (instance: any) {
            instance.destroy();
        });
        
        if (ctx != null) {
            let myChart = new Chart(ctx, {
                type: "line",               
                data: {
                    labels: this.state.fullData.dates,                  
                    datasets: [
                        {
                            label: "Confirmed",
                            data: confirmData,
                            backgroundColor: [
                                'rgba(155, 99, 232, 0.4)'
                            ]
                        },
                        {
                            label: "Deaths",
                            data: deathData,
                            backgroundColor: [
                                'rgba(255, 99, 32, 0.4)'
                            ],
                        },
                        {
                            label: "Recovered",
                            data: recoveredData,
                            backgroundColor: [
                                'rgba(95, 255, 32, 0.4)'
                            ],
                        }
                    ]
                }
            });

            this.setState(prevState => ({
                ...prevState,
                chart: myChart
            }));
        }
    }
}