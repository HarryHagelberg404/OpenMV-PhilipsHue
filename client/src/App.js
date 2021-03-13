import Header from "./components/Header";
import Main from "./components/Main";
import Register from "./components/Register";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/register" component={Register} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}
