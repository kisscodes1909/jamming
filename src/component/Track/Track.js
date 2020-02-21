import React from 'react';
import './Track.css';

export default class Track extends React.Component {

	render(){
		return(
			<div id={`track-${this.props.id}`}className="Track">
			  <div className="Track-information">
			    <h3>{this.props.track.name}</h3>
			    <p>{this.props.track.album} | {this.props.track.single}</p>
			  </div>
			  <button className="Track-action" onClick={this.props.onClick}>{this.props.action ? '+' : '-'}</button>
			</div>
		)
	}
}