import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import NotFoundPage from '../views/NotFoundPage'
import MovieInformation from '../views/MovieInformation';
import SearchResults from '../views/SearchResults';

export default class AppRouter extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <div className="page-content">
            <Switch>
              <Route path="/" component={Home} exact={true} />
              <Route path="/search" component={SearchResults} />
              <Route path="/movie" component={MovieInformation} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}