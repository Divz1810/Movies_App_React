import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Filter from './components/Filter';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Table from './components/Table';
import Customer from  './components/Customer';
import Login from './components/Login';
import Rental from './components/Rental';
import './App.css';

class App extends React.Component {
  state = {
    movies: [],
    genre: [],
    selectedFilter: "All Genre",
    search:"",
  };

  updateSearch = (searchString) => {
    this.setState({ search: searchString });
  };

  setFilter = (filter) => {
    this.setState({ selectedFilter: filter });
  };

  toggleLike = (id) => {
    let index = this.state.movies.findIndex((el) => {
      return el._id === id;
    });

    let currMoviesArr = this.state.movies.map((el) => el);

    if (currMoviesArr[index].liked) {
      currMoviesArr[index].liked = false;
    } else {
      currMoviesArr[index].liked = true;
    }

    this.setState({ movies: currMoviesArr });
  };

  deleteMovie = (id) => {
    let filteredArr = this.state.movies.filter((el) => {
      return el._id !== id;
    });

    this.setState({ movies: filteredArr });
  };


  componentDidMount() {
    let f = async () => {
      let responseGenre = await fetch("/genre");
      let responseMovies = await fetch("/movies");
      let moviesJson = await responseMovies.json();
      let genreJson = await responseGenre.json();

      this.setState({
        movies: moviesJson,
        genre: genreJson,
      });
    };

    f();
  }

  render() {
    return (
      <Router>
        <div className= "background">
          <NavBar />

          <Switch>
            <Route exact path="/rentals/premium">
              <Login />
            </Route>
            <Route exact path="/rentals">
              <Rental />
            </Route>

            <Route path="/customer">
              <Customer />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <div className="row">
                <Filter
                  handleFilter={this.setFilter}
                  selectedFilter={this.state.selectedFilter}
                  genreData={this.state.genre}
                />

                <div className="col-9 p-4">
                  <Search
                    search={this.state.search}
                    updateSearch={this.updateSearch}
                    total={this.state.movies.length}
                  />
                  <Table
                    search={this.state.search}
                    deleteMovie={this.deleteMovie}
                    toggleLike={this.toggleLike}
                    selectedFilter={this.state.selectedFilter}
                    moviesData={this.state.movies}
                  />
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;