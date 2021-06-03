import React, { useEffect } from 'react';
import GlobalStyle from './components/GlobalStyle';
import HomeContainer from './containers/HomeContainer';
import ReactGa from 'react-ga';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import SignIn from './components/Auth/signin';
import SignUp from './components/Auth/signup';

function App() {

  //Google analytics
  useEffect(() => {
    ReactGa.initialize('UA-198543044-1')

    //Rapportere side-visninger
    ReactGa.pageview('/')
  }, [])

  useEffect(()=> {
    const script = document.createElement("script");

    script.src = "https://cdn.jsdelivr.net/npm/chart.js@3.1.0/dist/chart.min.js";
    script.async = true;

    document.body.appendChild(script);    
  })

  return (
    <>
      <GlobalStyle />      
      <Router>
        <Switch>          
          <Route path="/sign-up" component={SignUp} />          
          <Route path="/home" component={HomeContainer} />
          <Route path="/" component={SignIn} />
        </Switch>
        
      </Router>
    </>
  )
};

export default App;