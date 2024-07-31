import React from "react";
import HomeService from "../components/HomeService/HomeService";
import banner from "../../assets/images/banner/serviceBanner.jpg";
import { Link } from "react-router-dom";
function Services() {
	return (
		<>
			{/* <!-- Page Title --> */}
			<section class="page-title" style={{ backgroundImage: `url(${banner})` }}>
				<div class="auto-container">
					<h2>Services</h2>
					<ul class="page-breadcrumb">
						<li>
							<Link to="/">home</Link>
						</li>
						<li>Services</li>
					</ul>
				</div>
				<h1 data-parallax='{"x": 200}'>Car Repairing</h1>
			</section>
			<HomeService />
		</>
	);
}

export default Services;
