import Router from "preact-router";
import { h } from "preact";
import BinChooser from "./BinChooser.js";
import Viewer from "./Viewer";

const App = () => (
  <Router>
    <BinChooser path="/" />
    <Viewer path="/v/:namespace" />
  </Router>
);

export default App;
