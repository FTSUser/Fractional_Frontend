import React from "react";
import { Route, Redirect } from "react-router";

export default (
  <Route>
    <Route exact path="/" />
    <Route exact path="/contact-us" />
    <Route exact path="/faq" />
    <Route exact path="/properties" />
    <Route exact path="/about" />
    <Route exact path="/propertiesdetails/:id" />
    <div>
      <Route exact path="/:id" />
    </div>
    <Route exact path="/learnpage" />
    <Route exact path="/disclaimer" />
    <Redirect from="/home" to="/" />
    <Route path="*" />
  </Route>
);
