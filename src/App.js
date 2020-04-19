import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './com/Header';
import HomeHeader from './com/HomeHeader';
import Feed from './com/Feed';
import * as routes from './constant/routes';
import DetailProduct from "./com/DetailProductMobx";
import ProductEditor from "./com/ProductEditor";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        {/* <HomeHeader Title={"Jubelio"}/> */}
        <Header Title={"Jubelio"}/>
        <Route exact path="/">
          <Feed />
        </Route>
        <Route exact path={routes.FEEDS} component={Feed} />
        <Route exact path={routes.DETAILS} component={DetailProduct} />
        <Route exact path={routes.DETAILSMOBX} component={DetailProduct} />
        <Route exact path={routes.EDITPRODUCT} component={ProductEditor} />
      </Router>

    )
  }
}

export default App;