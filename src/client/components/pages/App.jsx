import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom'

import  Navigation  from './Navigation.jsx';
import  UpdateInfo  from './UpdateInfo.jsx';
import  FindMatch from './FindMatch.jsx';
import  Home from './Home.jsx';


import 'bootstrap/dist/css/bootstrap.css';

export default class App extends React.Component {

    render() {
        return (
          <HashRouter>
             <div>
               <Navigation />
               <Switch>
                 <Route render={(props) => <UpdateInfo {...props} user={this.props.user}/>}  path="/updateInfo" />
                 <Route render={(props) => <FindMatch {...props} user={this.props.user}/>} path="/findMatch" />
                 <Route render={(props) => <Home {...props} user={this.props.user}/>} path="/" />
               </Switch>
             </div>
           </HashRouter>
        );
    }
}
