import React from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import {Spotify} from '../../util/Spotify.js';


Spotify.getAccessToken();

 console.log(Spotify.search('kevin'));
const track1 = {
	id: 1,
	name: 'Tinny Dancer1',
	artist: 'Elton John',
	album: 'Madman Across The Water'	
}
const track2 = {
	id: 2,
	name: 'Tinny Dancer2',
	artist: 'Elton John',
	album: 'Madman Across The Water'	
}
const track3 = {
	id: 3,
	name: 'Tinny Dancer3',
	artist: 'Elton John',
	album: 'Madman Across The Water'	
}
const track4 = {
	id: 4,
	name: 'Tinny Dancer4',
	artist: 'Elton John',
	album: 'Madman Across The Water'	
}

const tracks= [track1, track2, track3, track4];

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults : tracks,
			playList: [],
			playListName: 'New Playlist'
		}

		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlayList = this.savePlayList.bind(this);
		this.search = this.search.bind(this);
	}

	addTrack(newTrack) {

		if( this.state.playList.find( savedTrack =>  savedTrack.id === newTrack.id  ) ) {
			return ;
		}

		const savedTrack = this.state.playList;
		savedTrack.push(newTrack);
		this.setState({playList: savedTrack})
	}

	removeTrack(trackId) {
		let trackIndex = this.state.playList.findIndex(track=>{
			return track.id === trackId;
		});

		const savedTrack = this.state.playList;
		savedTrack.splice(trackIndex,1);
		this.setState({playList: savedTrack});
	}

	updatePlaylistName(name) {
		this.setState({
			playListName: name
		})
	}

	savePlayList(playlistName, playList) {
		Spotify.savePlaylist(playlistName, playList).then(response => {
			this.setState({
				playListName: 'New Playlist',
				playList: []
			})
		});
	}

	search(searchTerm) {
		Spotify.search(searchTerm).then(response => {
			this.setState({
				searchResults: response
			})
		})		
	}

	render() {
		return (
			<div>
			    <h1>Ja<span className="highlight">mmm</span>ing</h1>
			    <div className="App">
			        <SearchBar onSearch={this.search} />
			        <div className="App-playlist">
			            <SearchResults onAdd={this.addTrack} tracks={this.state.searchResults} />
			            <Playlist onSave = {this.savePlayList} onChangeName = {this.updatePlaylistName} playListName={this.state.playListName} tracks={this.state.playList} onRemove = {this.removeTrack} />
			        </div>
			    </div>
			</div>
		)
	}
}