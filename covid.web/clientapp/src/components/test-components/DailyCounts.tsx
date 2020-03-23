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

export class DailyCounts extends React.Component<ICovidDataProps, ICovidDataState> {
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
        dataJson.countries.sort().map((item: any) => {
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
                    <p>Cases per day</p>
                    <canvas id="myChart" ref="casesCanvas" />
                </div>

                <div>
                    <p>Deaths per day</p>
                    <canvas id="deathsPerDay" ref="deathsCanvas" />
                </div>
            </div>
        )
    }

    countrySelected = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
        if (option && option.text) {
            let selectedCountry = this.state.fullData.countryData.filter((c: { country: string; }) => c.country == option.text)[0];
            this.renderChart(selectedCountry.dailyNewCases, selectedCountry.dailyNewDeaths);
        }
    }

    localeSelected = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
        if (option && option.text) {
            let selectedLocale = this.state.fullData.localeData.filter((c: { locale: string; }) => c.locale == option.text)[0];
            this.renderChart(selectedLocale.dailyNewCases, selectedLocale.dailyNewDeaths);
        }
    }

    renderChart = (confirmData: [], deathData: []) => {
        const canvas = this.refs.casesCanvas as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");

        Chart.helpers.each(Chart.instances, function (instance: any) {
            instance.destroy();
        });

        if (ctx != null) {
            let myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: this.state.fullData.dates,
                    datasets: [
                        {
                            label: "Confirmed",
                            data: confirmData,
                            backgroundColor: [
                                'rgba(155, 99, 232, 0.4)'
                            ]
                        }
                    ]
                }
            });



            const canvas2 = this.refs.deathsCanvas as HTMLCanvasElement;
            const ctx2 = canvas2.getContext("2d");           

            if (ctx2 != null) {
                let myChart2 = new Chart(ctx2, {
                    type: "bar",
                    data: {
                        labels: this.state.fullData.dates,
                        datasets: [
                            {
                                label: "Deaths",
                                data: deathData,
                                backgroundColor: [
                                    'rgba(155, 99, 232, 0.4)'
                                ]
                            }
                        ]
                    }
                });
            }

            this.setState(prevState => ({
                ...prevState,
                chart: myChart
            }));
        }
    }
}