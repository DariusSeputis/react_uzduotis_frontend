import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import ProtectedRoute from './components/ProtectedRoute';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

export const TeamContext = React.createContext();

function App() {
  const [teamInLocalStorage, setTeamInLocalStorage] = useState(
    localStorage.getItem('team') ? true : false
  );
  return (
    <>
      <TeamContext.Provider
        value={{ teamInLocalStorage, setTeamInLocalStorage }}
      >
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/my-account' component={ProtectedRoute} />
          </Switch>
        </Router>
        <Footer />
      </TeamContext.Provider>
    </>
  );
}

export default App;
