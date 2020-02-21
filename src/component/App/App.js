import React from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';


const track1 = {
	id: 1,
	name: 'Tinny Dancer',
	artist: 'Elton John',
	album: 'Madman Across The Water'	
}
const track2 = {
	id: 2,
	name: 'Tinny Dancer',
	artist: 'Elton John',
	album: 'Madman Across The Water'	
}
const track3 = {
	id: 3,
	name: 'Tinny Dancer',
	artist: 'Elton John',
	album: 'Madman Across The Water'	
}
const track4 = {
	id: 4,
	name: 'Tinny Dancer',
	artist: 'Elton John',
	album: 'Madman Across The Water'	
}

const tracks= [track1, track2, track3, track4];

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults : tracks,
			playList: tracks
		}
		this.addTrack = this.addTrack.bind(this);
	}

	addTrack(newTrack) {
		if( this.state.playList.find(savedTrack=>{ savedTrack.id === newTrack.id }) ) {
			return;
		}

		const savedTrack = this.state.playList.push(newTrack);

		this.setState({playList: savedTrack})
	}

	render() {
		return (
			<div>
			    <h1>Ja<span className="highlight">mmm</span>ing</h1>
			    <div className="App">
			        <SearchBar />
			        <div className="App-playlist">
			            <SearchResults onAdd={this.state.addTrack} tracks={this.state.searchResults} />
			            <Playlist tracks={this.state.playList} />
			        </div>
			    </div>
			</div>
		)
	}
}