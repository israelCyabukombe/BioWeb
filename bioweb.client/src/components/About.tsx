import myPhoto from '../assets/IMG_0002.jpg';
import './About.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface PersonalInfo {
	firstName: string;
	lastName: string;
	summaryText: string;
}

interface Skill {
	id: number;
	skillName: string;
	skillLevelId: number;
	skillLevel: SkillLevel;
	category: string;
}

interface SkillLevel {
	id: number;
	description: string;
}

const About = () => {
	const isLarge = window.innerWidth >= 992;	
	const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
	const [skills, setSkills] = useState<Skill[]| null>(null);

	const apiBaseUrl = import.meta.env.PROD
		? import.meta.env.VITE_API_URL
		: '/api';

	useEffect(() => {
		let cancelled = false;

		const sleep = (ms: number) =>
			new Promise(resolve => setTimeout(resolve, ms));

		const fetchPersonalInfo = async (): Promise<void> => {
			const retryDelays = [0, 1500, 3000];

			for (let attempt = 0; attempt < retryDelays.length; attempt++) {

				try {
					if (retryDelays[attempt] > 0) {
						await sleep(retryDelays[attempt]);
					}
					const response = await fetch(`${apiBaseUrl}/personalInfo/1`);

					if (!response.ok) {
						throw new Error(`HTTP ${response.status}`);
					}

					const data = await response.json();

					if (!cancelled) {
						setPersonalInfo(data);
					}

					return;

				} catch (error) {
					if (attempt === retryDelays.length - 1 && !cancelled) {
						console.error('Error fetching personal info:', error);
					}
				}
			}
		};
		void fetchPersonalInfo();

		return () => {
			cancelled = true;
		};
	}, [apiBaseUrl]);

	useEffect(() => {
		fetch(`${apiBaseUrl}/skills/?personId=1`)
			.then(response => response.json())
			.then(data => setSkills(data))
			.catch(error => console.error('Error fetching skills:', error));
	}, [apiBaseUrl]);

	const frontEndSkills = skills?.filter(s => s.category === "FrontEnd");
	const backEndSkills = skills?.filter(s => s.category === "BackEnd");
	const otherSkills = skills?.filter(s => s.category === "Other");
	const frameWorkSkills = skills?.filter(s => s.category === "FrameWork");
	
	if (!personalInfo) {
		return <div>Loading...</div>
	}	
	
	return (
		<div>
			<div className="container-fluid">
				<div className="row align-items-start py-5">
					<div className="col-lg-4 col-md-4 text-center mb-4 mb-md-0 sticky-sidebar">
						<div className="d-flex flex-column align-items-center text-center">
							<img
								src={myPhoto}
								alt="My Portrait"
								style={{ width: '200px', height: '240px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px' }}
							/>
							<h1 className="mb-1">{personalInfo.firstName} {personalInfo.lastName}</h1>
							<h4 className="mb-0">Software Engineer</h4>

							<div className="d-flex justify-content-center gap-3 mt-3">
								<a href="https://github.com/israelCyabukombe" target="_blank" rel="noopener noreferrer"
									aria-label="GitHub"
									style={{ color: 'var(--text)', fontSize: '1.8rem' }}>
									<FaGithub/>
								</a>

								<a href="https://www.linkedin.com/in/israel-cyabukombe-974ba2aa/" target="_blank" rel="noopener noreferrer"
									aria-label="Linkedin"
									style={{ color: 'var(--text)', fontSize: '1.8rem' }}
								>
									<FaLinkedin/>
								</a>
							</div>

						</div>
					</div>
					<div className="col-lg-8 col-md-8 mb-4 mb-md-0 ps-lg-4">
						<div>
							{/* Intro */ }
							<h4 className="mb-3">
								Software engineer
							</h4>
							<p className="about-intro mb-4">
								{personalInfo.summaryText }
							</p>
							{/* Skills */}
							<div className="about-skills mb-4">
								<h2 className="fw-bold mb-4">Skills</h2>
								<div className="skills-categories">
									<div className="skills-category">
										<h6 className="category-title mb-3">Front End</h6>
										<div className="skills-grid">
											{frontEndSkills?.map(skill => (
												<span className="skill-badge" key={skill.id}> {skill.skillName} </span>
											))}
										</div>
									</div>
									<div className="skills-category">
										<h6 className="category-title mb-3">Back End</h6>
										<div className="skills-grid">
											{backEndSkills?.map(skill => (
												<span className="skill-badge" key={skill.id}>{skill.skillName}</span>
											))}
										</div>
									</div>
									<div className="skills-category">
										<h6 className="category-title mb-3">Other Tools</h6>
										<div className="skills-grid">
											<div className="skills-grid">
												{otherSkills?.map(skill => (
													<span className="skill-badge" key={skill.id}>{skill.skillName}</span>
												))}
											</div>
										</div>
									</div>
									<div className="skills-category">
										<h6 className="category-title mb-3">Frameworks</h6>
										<div className="skills-grid">
											<div className="skills-grid">
												{frameWorkSkills?.map(skill => (
													<span className="skill-badge" key={skill.id}>{skill.skillName}</span>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* Projects*/}
							<div className="about-projects mb-4">
								<h2 className="fw-bold mb-4">Projects</h2>
								<div className="project-list">
									<div className="project-card p-4 mb-4">
										<div className="d-flex justify-content-between align-items-start mb-2">
											<h5 className="fw-bold mb-0">Project 1</h5>
										</div>
										<p className="mb-3">
											I enjoy turning complex problems into simple, robust solutions using
											modern web...Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Sed scelerisque ante pellentesque tincidunt varius. 
										</p>
										<div className="skills-grid">
											<span className="skill-badge" key="1"> PHP </span>
											<span className="skill-badge" key="2"> C# </span>
										</div>
									</div>
									<div className="project-card p-4 mb-4">
										<div className="d-flex justify-content-between align-items-start mb-2">
											<h5 className="fw-bold mb-0">Project 2</h5>
										</div>
										<p className="mb-3">
											I enjoy turning complex problems into simple, robust solutions using
											modern web...Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Sed scelerisque ante pellentesque tincidunt varius.
										</p>
										<div className="skills-grid">
											<span className="skill-badge" key="1"> PHP </span>
											<span className="skill-badge" key="2"> C# </span>
										</div>
									</div>
								</div>
							</div>	
							{/* Education*/ }
							<div className="mb-3">
								<h5 className="fw-bold mb-1">Education</h5>
								<p>B.Sc. in Computer Science, South Dakota State University(SDSU)</p>
								<p>Completed Computer Science with minor in Mathematics</p>
							</div>
						</div>
					</div>
				</div>		
			</div>
		</div>

    );

}

export default About;