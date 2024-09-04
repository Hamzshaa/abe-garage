// import Link
import { Link } from "react-router-dom";
//import About css
import "./About.css";
import { IoIosArrowForward } from "react-icons/io";

function About() {
  return (
    <div>
      <div className="AboutUSHeader">
        <div className="AboutJerryUS">
          <div className="AbUSJerry">
            <h1>About Us</h1>
          </div>
          <div className="aboutflexJerry">
            <div className="redJerry">
              <Link to={"/"}>
                <p>Home</p>
              </Link>
            </div>
            <div className="arrJerry">
              {" "}
              <IoIosArrowForward />
            </div>
            <div className="arrJerry"> </div>
            <div className="whiteJerry">
              {" "}
              <p>About Us</p>
            </div>
          </div>
        </div>
      </div>

      <section className="firstsecJerry">
        <div className="firstsecparaJerry">
          <h1>
            We are highly skilled mechanics <br /> for your car repair
          </h1>
          <p>
            Bring to the table win-win survival strategies to ensure proactive{" "}
            <br />
            domination. At the end of the day, going forward, a new normal that{" "}
            <br />
            has evolved from generation X is on the runway heading towards a{" "}
            <br />
            streamlined cloud solution. User generated content in real-time will{" "}
            <br />
            have multiple touchpoints for offshore.
          </p>{" "}
          <br />
          <p>
            Capitalize on low hanging fruit to identify a ballpark value added{" "}
            <br />
            activity to beta test. Override the digitgal divide with additional{" "}
            <br />
            clickthroughs from DevOps. Nanotechnology immersion along the <br />
            information heading towards a stearmlined cloud solution, User{" "}
            <br />
            generated content in real-time will have multiple.
          </p>
        </div>
        <div className="firstsecimgJerry ">
          <img
            src="https://abe-garage.netlify.app/static/media/highly_skilled.3397c5d3b01c8bc0694a.png"
            alt="Mechanical tools"
          />
        </div>
      </section>
      {/* <section className="experienceJerry">
				<div className="experienceimgJerry">
					<img
						src="https://abe-garage.netlify.app/static/media/About_us_workshop_image.f6def2e6adeaba7dd696.png"
						alt=""
					/>
				</div>
				<div className="experience-contentJerry">
					<div>
						<div>
							<small>Welcome to our workshop</small>
						</div>
						<h1>We have 24 years of experience</h1>
					</div>
					<p>
						Bring to the table win-win survival strategies to endure proactive{" "}
						domination. <br /> At the end of the day, going dorward, a new
						normal that has evolved from <br /> generation X is on the runway
						heading towards a streamlined cloud solution. <br /> User generated
						content in real-time will have multiple touchpoints for offshoring.
					</p>
					<br />
					<p>
						Capitalize on low handing fruit to identify a ballpark value added{" "}
						activity to beta test. <br /> Override the digitgal divide with
						additional clickthroughs from DevOps. Nanotechnology <br />{" "}
						immersion along the information highway will close the loop on
						focusing.
					</p>
					<button>About Us</button>
				</div>
			</section> */}
      <section className="about-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-5">
              <div className="image-box imageJerryBox">
                <img src="https://abe-garage.netlify.app/static/media/Home_workshop_image.f6def2e6adeaba7dd696.png" />
              </div>
            </div>
            <div className="col-lg-7 pl-lg-5">
              <div className="sec-title">
                <h5>Welcome to Our workshop</h5>
                <h2>We have 24 years experience</h2>
                <div className="text">
                  <p>
                    Bring to the table win-win survival strategies to ensure
                    proactive domination. At the end of the day, going forward,
                    a new normal that has evolved from generation X is on the
                    runway heading towards a streamlined cloud solution. User
                    generated content in real-time will have multiple
                    touchpoints for offshoring.
                  </p>
                  <p>
                    Capitalize on low hanging fruit to identify a ballpark value
                    added activity to beta test. Override the digital divide
                    with additional clickthroughs from DevOps. Nanotechnology
                    immersion along the information highway will close the loop
                    on focusing.
                  </p>
                </div>
                <div className="link-btn mt-40">
                  <Link
                    to="/about"
                    className="theme-btn btn-style-one style-two"
                  >
                    <span>
                      About Us <i className="flaticon-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ///////////////////////////// */}
      {/* ////why choose us//// */}
      <section className="why-choose-us">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="sec-title style-two">
                <h2>Why Choose Us</h2>
                <div className="text">
                  Bring to the table win-win survival strategies to ensure
                  proactive domination. At the end of the day, going forward, a
                  new normal that has evolved from generation heading towards.
                </div>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-mechanic"></span>
                </div>
                <h4>Certified Expert Mechanics</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-wrench"></span>
                </div>
                <h4>Fast And Quality Service</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-price-tag-1"></span>
                </div>
                <h4>Best Prices in Town</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-trophy"></span>
                </div>
                <h4>Awarded Workshop</h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sec-title style-two">
                <h2>Addtional Services</h2>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <div className="image">
                    <img
                      src="https://abe-garage.netlify.app/static/media/aditional_services_image.07e66a4a2740e1f4b29f.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md-7">
                  <ul className="list">
                    <li>General Auto Repair & Maintenance</li>
                    <li>Transmission Repair & Replacement</li>
                    <li>Tire Repair and Replacement</li>
                    <li>State Emissions Inspection</li>
                    <li>Break Job / Break Services</li>
                    <li>Electrical Diagnostics</li>
                    <li>Fuel System Repairs</li>
                    <li>Starting and Charging Repair</li>
                    <li>Steering and Suspension Work</li>
                    <li>Emission Repair Facility</li>
                    <li>Wheel Alignment</li>
                    <li>Computer Diagaonstic Testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* /////video section/////// */}
      <section className="video-section About-VideoSection-Banner">
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
      {/* contact us section */}

      <section className="cta-section">
        <div className="auto-container">
          <div className="wrapper-box">
            <div className="left-column">
              <h3>Schedule Your Appointment Today</h3>
              <div className="text">
                Your Automotive Repair & Maintenance Service Specialist
              </div>
            </div>
            <div className="right-column">
              <div className="phone">1800.456.7890</div>
              <div className="btn">
                <a href="#" className="theme-btn btn-style-one">
                  <span>Appointment</span>
                  <i className="flaticon-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
