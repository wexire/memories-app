import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Container maxWidth="xl">
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Redirect to="/posts" />}
          ></Route>
          <Route exact path="/posts" component={Home}></Route>
          <Route exact path="/posts/search" component={Home}></Route>
          <Route exact path="/posts/:id" component={PostDetails}></Route>
          <Route
            exact
            path="/auth"
            component={() =>
              !user ? <Auth></Auth> : <Redirect to="/posts"></Redirect>
            }
          ></Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default App;
