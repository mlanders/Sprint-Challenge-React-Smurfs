import React from 'react';
import { Button } from 'reactstrap';

function Smurf(props) {
	let currentSmurf = props.smurfs.find(
		smurf => smurf.id.toString() === props.match.params.id
	);

	if (!currentSmurf)
		return (
			<div className="lostSmurf">
				<h2>Cannot find that Smurf!</h2>
			</div>
		);

	return (
		<div className="Smurf">
			<h3>{currentSmurf.name}</h3>
			<strong>{currentSmurf.height} tall</strong>
			<p>{currentSmurf.age} smurf years old</p>
			<Button
				className="smurfButton"
				color="primary"
				onClick={e => props.handleEdit(e, currentSmurf)}>
				Edit
			</Button>
			<Button
				className="smurfButton"
				color="primary"
				onClick={e => props.handleDelete(e, currentSmurf.id)}>
				Delete
			</Button>
		</div>
	);
}

Smurf.defaultProps = {
	name: '',
	height: '',
	age: '',
};

export default Smurf;
