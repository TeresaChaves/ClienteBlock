import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MyPortfolio from "./pages/MyPortfolio/MyPortfolio";
import InitialOffering from "./pages/InitialOffering/InitialOffering";
import DetailPage from "./pages/DetailPage/DetailPage";
import "./App.css";
import NavBarNew from "../src/Component/NewNavBar/NewNabBar"
import Home2 from "./pages/Home2/Home2";

const App = () => {


  return (
    <Router>

      <NavBarNew />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home2 />
          </Route>
          <Route path="/my-portfolio" exact>
            <MyPortfolio />
          </Route>
          <Route path="/initial-offering" exact>
            <InitialOffering />
          </Route>
          <Route path="/detail-song/:id">
            <DetailPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}


export default App;
