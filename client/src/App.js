import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Light from "./components/Light";
import Lights from "./components/Lights";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/lights/:id" component={Light} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}
