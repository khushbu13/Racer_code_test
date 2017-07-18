import React from 'react';

// eslint-disable-next-line react/prop-types
const TableRow = ({ driver, handleWinsChange, handlePositionChange }) => (
	<tr className="row">
		<td>{driver.Driver.givenName}</td>
		<td>{driver.Driver.driverId}</td>
		<td>{driver.Driver.url}</td>
		<td>{driver.Driver.code}</td>
		<td>{driver.Driver.nationality}</td>
		{/* eslint-disable react/jsx-no-bind */}
		<td><input type="text" defaultValue={driver.wins} onChange={handleWinsChange.bind(event, driver)} /></td>
		<td><input type="text" defaultValue={driver.position} onChange={handlePositionChange.bind(event, driver)} /></td>
		{/* eslint-enable react/jsx-no-bind */}
		<td>{driver.points}</td>
	</tr>
	);
export default TableRow;
