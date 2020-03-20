import * as React from "react";
import './header.scss';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { About } from '../test-components/About'
import { TestComponent2 } from './../test-components/TestComponent2'
import { CovidLineCharts } from './../test-components/SimpleLineChart';
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
                                <Link className="nav-link" to='/Charts'>About</Link>
                        </li>                      
                        
                    </ul>
                    </div>                                
                </nav>
                <Route exact path={'/'} render={(props) => <CovidLineCharts />} />  
                <Route exact path={`/Charts`} render={(props) => <About />} />  
            </Router>
        )
    }
}