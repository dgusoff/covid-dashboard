import * as React from "react";
import './header.scss';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { About } from '../test-components/About'
import { TestComponent2 } from './../test-components/TestComponent2'
import { CovidLineCharts } from './../test-components/SimpleLineChart';
import { DailyCounts } from "../test-components/DailyCounts";
export interface IHeaderProps {

}

export class Header extends React.Component<IHeaderProps, {}> {

    public render(): React.ReactElement<IHeaderProps> {
        return (
            <Router>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">

                    <a className="navbar-brand" href="#">CoVid DB</a>

                    <div className="navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/Daily'>Daily Totals</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/Charts'>About</Link>
                            </li>

                        </ul>
                    </div>
                </nav>

                <p>Sorry, we're down right now. They've changed the data model on over at their <a href='https://github.com/CSSEGISandData/COVID-19'>repo</a> and I need to update my API to accomodate. Stay tuned!</p>

                <Route exact path={'/'} render={(props) => <CovidLineCharts />} />
                <Route exact path={'/Daily'} render={(props) => <DailyCounts />} />
                <Route exact path={`/Charts`} render={(props) => <About />} />
            </Router>
        )
    }
}