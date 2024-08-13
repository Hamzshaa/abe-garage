import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./dashboared.css"; 

function Dashboard() {
	return (
		<Container fluid className="p-3">
			<div className="sec-title style-two">
				<h2>Admin Dashboard</h2>
				<div className="text">
					Bring to the table win-win survival strategies to ensure proactive
					domination. At the end of the day, going forward, a new normal that
					has evolved from generation X is on the runway heading towards a
					streamlined cloud solution.
				</div>
			</div>
			{/* First Row */}
			<Row className="mb-3">
				<Col md={9} xs={12} className="mb-3">
					<Card className="h-100">
						<Card.Body className="d-flex justify-content-between">
							{/* Replace with your content */}
							<div className="dashboard-box">All Orders</div>
							<div className="dashboard-box">New Orders</div>
							<div className="dashboard-box">Add Employees</div>
							<div className="dashboard-box">Employees</div>
						</Card.Body>
					</Card>
				</Col>
				<Col md={3} xs={12} className="mb-3">
					<Card className="h-100">
						<Card.Body>
							{/* Replace with your circular graph content */}
							Circular Graph
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Second Row */}
			<Row className="mb-3">
				<Col md={9} xs={12} className="mb-3">
					<Card className="h-100">
						<Card.Body>
							{/* Replace with your bar chart content */}
							Bar Chart
						</Card.Body>
					</Card>
				</Col>
				<Col md={3} xs={12} className="mb-3">
					<Card className="h-100">
						<Card.Body>
							{/* Replace with your radar chart content */}
							Radar Chart
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Third Row */}
			<Row>
				<Col xs={12}>
					<Card className="h-100">
						<Card.Body>
							{/* Replace with your line chart or graph content */}
							Line Chart
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Dashboard;
