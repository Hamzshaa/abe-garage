import React from "react";
import { Table, Button } from "react-bootstrap"

function Orders() {
	return (
		<div>
			<section className="contact-section">
				<div className="auto-container">
					<div className="contact-title">
						<h2>Orders</h2>
					</div>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Order id</th>
								<th>Customer</th>
								<th>Vehicle</th>
								<th>Order Date</th>
								<th>Received by</th>
								<th>Order Status</th>
								<th>View/Edit</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>2</td>
								<td>3</td>
								<td>4</td>
								<td>5</td>
								<td>6</td>
								<td>7</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</section>
		</div>
	);
}

export default Orders;
