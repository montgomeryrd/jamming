import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searchResults : [
        {name: 'Metal is For Everyone', artist: 'Freedom Call', album: 'Master of Light', id: 1},
        {name: 'Carry On', artist: 'Angra', album: 'Angels Cry / Holy Land', id: 2},
        {name: 'Dawn of Victory', artist: 'Rhapsody', album: 'Legendary Years', id: 3}
      ],
      playlistName : "Epic Metal",
      playlistTracks : [
        {name: 'Kingdom Come', artist: 'Manowar', album: 'Kings of Metal', id: 4}, 
        {name: 'Call To Arms', artist: 'Manowar', album: 'Warriors of The World', id: 5}
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  updatePlaylistName(name) {
    this.setState({playlistName : name});
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      this.setState({playlistTracks : [...this.state.playlistTracks, track]});
    }
  }

  removeTrack(track) {
    const playlistTracks = this.state.playlistTracks.filter(item => item.id !== track.id);
    this.setState({playlistTracks : playlistTracks});
  }

  render() {
    return (
      <div className="App">
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div class="App-playlist">
            <SearchResults 
              searchResults = {this.state.searchResults} 
              onAdd = {this.addTrack}
            />
            <Playlist 
              playlistName = {this.state.playlistName} 
              playlistTracks = {this.state.playlistTracks}
              onRemove = {this.removeTrack}
              onNameChange = {this.updatePlaylistName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;