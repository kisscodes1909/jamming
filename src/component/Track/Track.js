import React from 'react';
import './Track.css';

export default class Track extends React.Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}
	addTrack() {
		this.props.onAdd(this.props.track);
	}
	removeTrack() {
		this.props.onRemove(this.props.track.id);
	}
	renderBtn() {
		if( this.props.action === '+' ) {
			return <button className="Track-action" onClick={this.addTrack}>+</button>
		} else {
			return <button className="Track-action" onClick={this.removeTrack}>-</button>
		}
	}
	render(){
		console.log(this.props.action);
		return(
			<div id={`track-${this.props.id}`}className="Track">
			  <div className="Track-information">
			    <h3>{this.props.track.name}</h3>
			    <p>{this.props.track.album} | {this.props.track.single}</p>
			  </div>
			  {this.renderBtn()}
			</div>
		)
	}
}