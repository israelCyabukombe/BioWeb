import myPhoto from '../assets/lion-animal-portrait.jpg';
import sdsuPhoto from '../assets/JackRabbits.png';
import sanfordPhoto from '../assets/SanfordHealth.jpg';
import goodSamPhoto from '../assets/GoodSam.jpg';
import './About.css';

import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

interface PersonalInfo {
	firstName: string;
	lastName: string;
	summaryText: string;
}

const About = () => {
	
	const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
	
	useEffect(() => {
		fetch('https://localhost:7010/api/personalInfo/1')
			.then(response => response.json())
			.then(data => setPersonalInfo(data))
			.catch(error => console.error('Errof fethincg personal Info:', error));
	}, []);
	
	if (!personalInfo) {
		return <div>Loading...</div>
	}	
	
	return (
		<div className="bg-light">
			<div className="container bg-light">
				<div className="row align-items-center py-5">
					<div className="col-lg-3 col-md-4 text-center mb-4 mb-md-0">
						<div className="d-flex flex-column justify-content-center align-items-center text-center py-5">
							<img
								src={myPhoto}
								alt="My Portrait"
								style={{ width: '200px', height: '240px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px' }}
							/>
							<h1 className="mb-1">{personalInfo.firstName} {personalInfo.lastName}</h1>
							<h5 className="text-muted mb-0">Software Engineer</h5>
						</div>
					</div>
					<div className="col-lg-6 col-md-5 mb-4 mb-md-0 ps-lg-4">
						<div style={{ maxWidth: '600px' }}>
							{/* Intro */ }
							<h4 className="mb-3">
								Software engineer building reliable web applications
							</h4>
							<p className="text-muted mb-4">
								I enjoy turning complex problems into simple, robust solutions using modern web...
							</p>
							{/* Skills */}
							<div className="about-skills mb-4">
								<h2 className="fw-bold mb-4">Skills</h2>
								<div className="skills-categories">
									<div className="skills-category">
										<h6 className="category-title mb-3">Front End</h6>
										<div className="skills-grid">
											<span className="skill-badge">HTML</span>
											<span className="skill-badge">CSS</span>
											<span className="skill-badge">JavaScript</span>
											<span className="skill-badge">TypeScript</span>
										</div>
									</div>
									<div className="skills-category">
										<h6 className="category-title mb-3">Back End</h6>
										<div className="skills-grid">
											<span className="skill-badge">PHP</span>
											<span className="skill-badge">C#</span>
											<span className="skill-badge">Laminas</span>
											<span className="skill-badge">.Net Core</span>
										</div>
									</div>

									<div className="skills-category">
										<h6 className="category-title mb-3">Other Tools</h6>
										<div className="skills-grid">
											<span className="skill-badge">Git</span>
											<span className="skill-badge">Git Extensions</span>
											<span className="skill-badge">RabbitMQ</span>
											<span className="skill-badge">Elastic</span>
										</div>
									</div>
								</div>
							</div>
							{/* Education*/ }
							<div className="mb-3">
								<h5 className="fw-bold mb-1">Education</h5>
								<p>B.Sc. in Computer Science, University Name</p>
								<p>{personalInfo.summaryText}</p>
							</div>
						</div>
						
					</div>
					{/* Right Column: Work and School logos*/ }
					<div className="col-lg-3 col-md-3 text-center">
						<div className="d-flex flex-column align-items-center" style={{ gap: '1rem' }}>
							<img src={sdsuPhoto} className="image-fluid mb-4 logo-img" alt="SDSU" />
							<img src={sanfordPhoto} className="image-fluid mb-4 logo-img" alt="SDSU"/>
							<img src={goodSamPhoto} className="image-fluid mb-4 logo-img" alt="SDSU"  />
						</div>
					</div>
				</div>		
			</div>
		</div>

    );

}

export default About;