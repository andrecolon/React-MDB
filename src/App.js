import React from 'react';
import { Router } from '@reach/router'

import Header from './components/elements/Header';
import Home from './Home';

import { GlobalStyle } from './components/styles/GlobalStyle';
import Movie from './components/Movie';
import NotFound from './components/NotFound'




const App = () => (
  <><Header />
    <Router>
      <Home path="/" />
      <Movie path="/:movieID" />
      <NotFound default />
    </Router>
    <GlobalStyle />
  </>
)
export default App;
