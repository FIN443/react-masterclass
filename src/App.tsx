import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Movies from "./Routes/Movies";
import Search from "./Routes/Search";
import TvShows from "./Routes/Tv";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/tv" exact>
          <Tv />
        </Route>
        <Route path="/movies" exact>
          <Movies />
        </Route>
        <Route path="/search" exact>
          <Search />
        </Route>
        <Route path={["/", "movies/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
