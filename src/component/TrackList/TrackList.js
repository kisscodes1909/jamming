import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';


export default class TrackList extends React.Component {
	render(){
		let action = this.props.inSearchResultList ? '+' : '-';
		return(
			<div className="TrackList">
				{
					this.props.tracks.map((track, i) => {
						return <Track onAdd={this.props.onAdd} onRemove={this.props.onRemove} key={i} id={i} action={action} track={track} />;
					})
				}
			</div>
		)
	}
}