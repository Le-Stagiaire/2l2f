import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './Home';
import Layout from './Layout';
import SiteHeader from './SiteHeader';
import RecipeDetail from './RecipeDetail';

import './App.css';

function App() {
  return (
    <>
      <SiteHeader />
      <Layout>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:detail" component={RecipeDetail} />
        </Router>
      </Layout>
    </>
  );
}

export default App;
