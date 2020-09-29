import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../utilities/Spotify';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searchResults : [],
      playlistName : "My Playlist",
      playlistTracks : []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults : searchResults});
    });
  }

  savePlayList() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName : 'New Playlist',
        playlistTracks : []
      })
    });
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
          <SearchBar 
            onSearch = {this.search}
          />
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
              onSave = {this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;