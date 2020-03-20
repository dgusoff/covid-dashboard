import * as React from "react";

export interface ITestComponent1Props {

}

export class About extends React.Component<ITestComponent1Props, {}> {

    public render(): React.ReactElement<ITestComponent1Props> {
        return (
            <div className="container">
                <h2>Corona Virus Dashboard</h2>

                <div>Written March 13-16, 2020</div>

                <div>Uses data from Johns Hopkins and open sources directly from <a href="https://github.com/CSSEGISandData/COVID-19">here.</a> </div>

                <div>By Derek Gusoff</div>
               
                <ul>
                    <li><a href="https://github.com/dgusoff">Github</a></li>
                    <li><a href="https://twitter.com/dgusoff">Twitter</a></li>
                    <li><a href="https://www.linkedin.com/in/derekgusoff">LinkedIn</a></li>
                </ul>

                <img src="/bob.png" />

                <h3>Uses</h3>
                <ul>
                    <li><a href="https://docs.microsoft.com/en-us/dotnet/core/">.NET Core 3.1</a></li>
                    <li><a href="https://reactjs.org/">React</a></li>
                    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
                    <li><a href="https://www.chartjs.org/">Chart.JS</a></li>
                    <li><a href="https://getbootstrap.com/">Bootstrap</a></li>
                </ul>
            </div>
        )
    }
}