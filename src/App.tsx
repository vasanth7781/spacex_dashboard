import React from 'react';
import './App.css';
import 'rsuite/dist/styles/rsuite-default.css';
import AppWrapper from 'Components/AppWrapper';
import DashboardLanding from 'features/Dashboard';
function MainContent() {
  return (
    <div className="App" style={{ overflow: 'none' }}>
      <AppWrapper>
        <DashboardLanding />
      </AppWrapper>
    </div>
  );
}

export default MainContent;
