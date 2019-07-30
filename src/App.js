import React from 'react';
import {Switch,Route} from 'react-router-dom';
import DashboardWithForm from "./Components/DashboardWithForm";
import Dashboard from "./Components/Dashboard";
import ProjectForm from './Components/projectForm';

class App extends React.Component{
  render(){
    return(
      <Switch>
        {/*<Route exact to = '/' component={DashboardWithForm}/>*/}
        <Route exact path = '/' component={Dashboard}/>
        <Route exact path = '/editProj/:id' component={ProjectForm}/>
      </Switch>
    )
  }
}

export default App;
