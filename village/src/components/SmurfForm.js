import React from 'react';
import { Form, Input } from 'reactstrap';

function SmurfForm(props) {
	const submitButton = e => {
		if (props.isUpdate) {
			props.handlePut(e);
		} else {
			props.addSmurf(e);
		}
	};

	return (
		<div className="SmurfForm">
			<Form className="form" onSubmit={submitButton}>
				<Input
					className="input"
					onChange={props.handleInputChange}
					placeholder="name"
					value={props.smurf.name}
					name="name"
				/>
				<Input
					className="input"
					onChange={props.handleInputChange}
					placeholder="age"
					value={props.smurf.age}
					name="age"
				/>
				<Input
					className="input"
					onChange={props.handleInputChange}
					placeholder="height"
					value={props.smurf.height}
					name="height"
				/>
				<button type="submit">
					{props.isUpdate ? 'Update Smurf' : 'Add to the village'}
				</button>
			</Form>
		</div>
	);
}
// }

export default SmurfForm;
