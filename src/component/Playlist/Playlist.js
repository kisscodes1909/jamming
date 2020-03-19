import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

export default class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleOnSave = this.handleOnSave.bind(this);
	}

	handleNameChange(e) {
		//console.log(this);
		this.props.onChangeName(e.target.value);
	}

	handleOnSave() {
		this.props.onSave(this.props.playListName, this.props.tracks);
	}

	render(){
		return(
			<div className="Playlist">
			  <input value={this.props.playListName} onChange = { this.handleNameChange } />
			  <TrackList tracks={this.props.tracks} onRemove={this.props.onRemove} />
			  <button onClick={this.handleOnSave} className="Playlist-save">SAVE TO SPOTIFY</button>
			</div>
		)
	}
}