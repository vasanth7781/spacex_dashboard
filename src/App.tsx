import React from 'react';
import './App.css';
import 'rsuite/dist/styles/rsuite-default.css';
import AppWrapper from 'Components/AppWrapper';
import DashboardLanding from 'features/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function MainContent() {
  return (
    <Router>
      <div className="App" style={{ overflow: 'none' }}>
        <AppWrapper>
          <Switch>
            <Route exact path="/" component={DashboardLanding} />
          </Switch>
        </AppWrapper>
      </div>
    </Router>
  );
}

export default MainContent;
