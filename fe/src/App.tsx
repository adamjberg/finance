import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { AccountsPage } from "./pages/AccountsPage";
import { HomePage } from "./pages/HomePage";
import { NewAccountPage } from "./pages/NewAccountPage";
import { ViewAccountPage } from "./pages/ViewAccountPage";
import { ROUTES } from "./routes/Routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path={ROUTES.Account.list} exact>
          <AccountsPage />
        </Route>
        <Route path={ROUTES.Account.new} exact>
          <NewAccountPage />
        </Route>
        <Route path={ROUTES.Account.view} exact>
          <ViewAccountPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
