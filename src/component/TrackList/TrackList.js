import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';


export default class TrackList extends React.Component {
	trackOnClick(track, action) {
		if(action) {
			this.props.pushTrack({
				name: track.name,
				artist: track.artist,
				single: track.single
			})
		}
	}  
	render(){
		let action = this.props.inSearchResultList ? '+' : '-';
		return(
			<div className="TrackList">
				{
					this.props.tracks.map((track, i) => {
						return <Track onAdd={this.props.onAdd} key={i} id={i} action={action} track={track} />;
					})
				}
			</div>
		)
	}
}