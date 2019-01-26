import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Smurf from './Smurf';

class Smurfs extends Component {
	render() {
		return (
			<div className="Smurfs">
				<ul>
					{this.props.smurfs.map(smurf => {
						return (
							<Link to={`/smurf/${smurf.id}`} key={smurf.id}>
								{smurf.name}
							</Link>
						);
					})}
				</ul>
			</div>
		);
	}
}

Smurf.defaultProps = {
	smurfs: [],
};

export default Smurfs;
