import React from "react";
import vban1 from "../../assets/images/misc/vban1.jpg";
import vban2 from "../../assets/images/misc/vban2.jpg";
import fuelImage from "../../assets/images/misc/fuel2.jpg";
import cars from "../../assets/images/misc/cars.jpg";
import tire from "../../assets/images/misc/tire.jpg";
import HomeService from "../components/HomeService/HomeService";
function Home() {
	return (
		<>
			<section className="video-section">
				<div data-parallax='{"y": 50}' className="sec-bg banner"></div>
				<div className="auto-container">
					<h5>Working since 1999</h5>
					<h2>
						Tuneup Your Car <br /> to Next Level
					</h2>
					<div className="video-box">
						<div className="video-btn">
							<a
								href="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s"
								className="overlay-link lightbox-image video-fancybox ripple"
							>
								<i className="flaticon-play"></i>
							</a>
						</div>
						<div className="text">
							Watch intro video <br /> about us
						</div>
					</div>
				</div>
			</section>
			<HomeService
				vban1={vban1}
				vban2={vban2}
				fuelImage={fuelImage}
				about={true}
				features={true}
			/>
		</>
	);
}

export default Home;
