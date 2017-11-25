import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom'

import  Login  from './components/pages/Login.jsx';
import  NewUser from './components/pages/NewUser.jsx';
import 'bootstrap/dist/css/bootstrap.css';

class Entry extends React.Component {
    render() {
        return (
          <HashRouter>
             <div>
               <Switch>
                 <Route component={NewUser} path="/register" />
                 <Route component={Login} path="/" />
               </Switch>
             </div>
           </HashRouter>
        );
    }
}
ReactDOM.render (<Entry />, window.document.getElementById("root"));
