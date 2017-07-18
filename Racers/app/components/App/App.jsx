import React from 'react';
import { API_URL, POINTS_FOR_EACH_WIN } from '../../constants/constants';
import TableRow from '../TableRow.jsx';

class App extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			drivers: [],
		};
	}

	componentDidMount = () => {
		fetch(API_URL).then(response => response.json())
			.then((responseJson) => {
				const driversList = responseJson.MRData.StandingsTable.StandingsLists[0].DriverStandings;
				const drivers = driversList.slice(0, 3);
				this.setState({
					drivers,
				});
			});
	}

	getPointsForPosition = (position) => {
		let points;
		switch (position) {
			case 1: points = 100;
				break;
			case 2: points = 50;
				break;
			case 3: points = 25;
				break;
			default: points = 0;
				break;
		}
		return points;
	}

	handlePositionChange = (driver, event) => {
		const value = event.target.value;
		const pointsForWins = driver.wins * POINTS_FOR_EACH_WIN;
		const pointsForPosition = this.getPointsForPosition(Number(value));
		const totalPoints = pointsForWins + pointsForPosition;
		const foundDriver = this.state.drivers.find(d => d.Driver.driverId === driver.Driver.driverId);
		foundDriver.position = value;
		foundDriver.points = totalPoints;
		this.setState({
			drivers: this.state.drivers,
		});
	}

	handleWinsChange = (driver, event) => {
		const value = event.target.value;
		const pointsForWins = value * POINTS_FOR_EACH_WIN;
		const pointsForPosition = this.getPointsForPosition(Number(driver.position));
		const totalPoints = pointsForWins + pointsForPosition;
		const foundDriver = this.state.drivers.find(d => d.Driver.driverId === driver.Driver.driverId);
		foundDriver.wins = value;
		foundDriver.points = totalPoints;
		this.setState({
			drivers: this.state.drivers,
		});
	}

	render() {
		return (
			<div className="table-responsive container">
				<table className="table table-bordered table-striped">
					<thead>
						<tr className="row">
							<th>
								Driver Name
							</th>
							<th>
								Driver Id
							</th>
							<th>
								URL
							</th>
							<th>
								Code
							</th>
							<th>
								Nationality
							</th>
							<th>
								Wins
							</th>
							<th>
								Position
							</th>
							<th>
								Total Points
							</th>
						</tr>
					</thead>
					<tbody>
						{this.state.drivers.map((driver, index) => <TableRow
							key={index} driver={driver}
							handleWinsChange={this.handleWinsChange}
							handlePositionChange={this.handlePositionChange}
						/>)}
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;
