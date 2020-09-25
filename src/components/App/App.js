import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults : [
        {name: 'Metal is For Everyone', artist: 'Freedom Call', album: 'Master of Light', id: 1},
        {name: 'Carry On', artist: 'Angra', album: 'Angels Cry / Holy Land', id: 2},
        {name: 'Dawn of Victory', artist: 'Rhapsody', album: 'Legendary Years', id: 3}
      ]
    }
  }
  render() {
    return (
      <div className="App">
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div class="App-playlist">
            <SearchResults searchResults = {this.state.searchResults}/>
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;