import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import PageProxy from "./components/PageProxy";
import SearchPage from "./components/SearchPage";
import PreviewPage from "./components/PreviewPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/search/" component={SearchPage} />
        <Route path="/_preview/" component={PreviewPage} />
        <Route path="*" component={PageProxy}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
