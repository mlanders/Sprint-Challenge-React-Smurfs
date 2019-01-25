import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			smurfs: [],
			isUpdate: false,
			err: '',
			smurf: {
				id: '',
				name: '',
				age: '',
				height: '',
			},
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:3333/smurfs')
			.then(res => {
				// console.log(res.data);
				this.setState({ smurfs: res.data });
			})
			.catch(err => {
				console.log(err);
				this.setState({ err: err });
			});
	}

	reset() {
		this.setState({
			isUpdate: false,
			smurf: {
				id: '',
				name: '',
				age: '',
				height: '',
			},
		});
	}

	addSmurf = e => {
		e.preventDefault();
		// add code to create the smurf using the api
		axios
			.post('http://localhost:3333/smurfs', this.state.smurf)
			.then(res => {
				console.log(res);
				this.setState(
					{
						smurfs: res.data,
						smurf: { name: '', age: '', height: '' },
					},
					this.props.history.push('/')
				);
			})
			.catch(err => {
				console.log(err);
				this.setState({ err: err });
			});
	};

	handleInputChange = e => {
		this.setState({
			smurf: {
				...this.state.smurf,
				[e.target.name]: e.target.value,
			},
		});
	};

	handleDelete = (e, id) => {
		e.preventDefault();
		axios
			.delete(`http://localhost:3333/smurfs/${id}`)
			.then(res => {
				console.log(res);
				this.setState({
					smurfs: res.data,
				});
				this.props.history.push('/');
			})
			.catch(err => {
				console.log(err);
				this.setState({ err: err });
			});
	};

	handleEdit = (e, smurf) => {
		e.preventDefault();
		this.setState(
			{
				smurf: smurf,
				isUpdate: true,
			},
			this.props.history.push('/smurf-form')
		);
	};

	handlePut = () => {
		let id = this.state.smurf.id;
		console.log(id);
		axios
			.put(`http://localhost.com/333/smurfs/${id}`, this.state.smurf)
			.then(res => {
				console.log(res.data);
				this.setState(
					{
						smurfs: res.data,
						isUpdate: false,
						smurf: {
							id: '',
							name: '',
							age: '',
							height: '',
						},
					},
					this.props.history.push('/')
				);
			})
			.catch(err => {
				console.log(err);
				this.setState({ err: err });
			});
	};

	render() {
		return (
			<div className="App">
				<Navbar color="light" light expand="md">
					<Link
						className="NavBrand"
						to="/"
						onClick={() => this.reset()}>
						Smurf Village
					</Link>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink
									exact
									className="NavLink"
									to="/"
									onClick={() => this.reset()}>
									Home
								</NavLink>
								<NavLink
									exact
									className="NavLink"
									to="/smurf-form"
									onClick={() => this.reset()}>
									Add Smurf
								</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>

				{this.state.error && <h4>{this.state.error}</h4>}
				<Route
					path="/smurf-form"
					render={props => (
						<React.Fragment>
							<SmurfForm
								smurf={this.state.smurf}
								addSmurf={this.addSmurf}
								handleInputChange={this.handleInputChange}
								isUpdate={this.state.isUpdate}
								handlePut={this.handlePut}
							/>
							<Smurfs {...props} smurfs={this.state.smurfs} />
						</React.Fragment>
					)}
				/>
				<Route
					exact
					path="/"
					render={props => (
						<Smurfs {...props} smurfs={this.state.smurfs} />
					)}
				/>
				<Route
					path="/smurf/:id"
					render={props => (
						<Smurf
							{...props}
							smurfs={this.state.smurfs}
							handleDelete={this.handleDelete}
							handleEdit={this.handleEdit}
						/>
					)}
				/>
			</div>
		);
	}
}

export default App;
