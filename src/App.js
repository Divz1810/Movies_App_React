import './App.css';
import React from "react";
import Filter from './components/Filter';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Table from './components/Table';
import './App.css';

class App extends React.Component {
  state = {
    movies: [],
    genre: [],
    selectedFilter: "All Genre",
  };

  setFilter = (filter) => {
    this.setState({ selectedFilter: filter });
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
      <div>
        <div className="background"></div>
        <NavBar  />

        <div className="row">
          <Filter
            handleFilter={this.setFilter}
            selectedFilter={this.state.selectedFilter}
            genreData={this.state.genre}
          />

          <div class="col-9 p-4">
            <Search />
            <Table
              selectedFilter={this.state.selectedFilter}
              moviesData={this.state.movies}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;