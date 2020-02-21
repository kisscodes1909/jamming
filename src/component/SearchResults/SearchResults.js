import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

export default class SearchResults extends React.Component {
	render() {		

		return(
			<div className="SearchResults">
			  <h2>Results</h2>
			  <TrackList onAdd={this.props.onAdd} inSearchResultList ={1} tracks={this.props.tracks} />
			</div>
		)
	}
}