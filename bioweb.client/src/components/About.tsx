import myPhoto from '../assets/IMG_0002.jpg';
import './About.css';
import { FaLinkedin, FaGithub, FaGlobe, FaChevronDown, FaChevronUp, FaLayerGroup } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { personalInfo } from '../data/PersonalInfo';
import { skills } from '../data/Skills';

interface SkillLevel {
	id: number;
	description: string;
}
interface Project {
	id: number;
	title: string;
	description: string;
	liveUrl: string | null;
	repoUrl: string | null;
	skills: string[];
}

const About = () => {
	const apiBaseUrl = import.meta.env.PROD
		? import.meta.env.VITE_API_URL
		: '/api';

	const [projects, setProjects] = useState<Project[]>([]);
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [projectsLoadingMsg, setProjectsLoadingMsg] = useState('');
	const [projectsError, setProjectsError] = useState<string | null>(null);
	const [openSkillsId, setOpenSkillsId] = useState<number | null>(null);
	const frontEndSkills = skills.filter(s => s.category === "FrontEnd");
	const backEndSkills = skills.filter(s => s.category === "BackEnd");
	const otherSkills = skills.filter(s => s.category === "Other");
	const frameWorkSkills = skills.filter(s => s.category === "FrameWork");

	//fetch projects with retry logic
	const fetchWithRetry = async (url: string, retries = 3): Promise<Response> => {
		for (let attempt = 0; attempt < retries; attempt++) {
			try {
				const response = await fetch(url); 
				if (!response.ok) throw new Error(`HTTP ${response.status}`);

				return response;
			} catch (err) {
				if (attempt === retries - 1) throw err;
				const delay = Math.pow(2, attempt) * 1000;

				await new Promise(resolve => setTimeout(resolve, delay));
			}
		}
		throw new Error('All retries failed');
	}

	//Projects fetch and load
    useEffect(() => {
        let t1: ReturnType<typeof setTimeout>;
        let t2: ReturnType<typeof setTimeout>;
        let t3: ReturnType<typeof setTimeout>;
        let t4: ReturnType<typeof setTimeout>;

        const loadProjects = async () => {
            setProjectsLoadingMsg('Loading Projects...');

            t1 = setTimeout(() => setProjectsLoadingMsg('Connecting to Db...'), 4000);

            t2 = setTimeout(() => setProjectsLoadingMsg('Database is waking up from being a sleep on free-tier...'), 12000);

            t1 = setTimeout(() => setProjectsLoadingMsg('Almost there, hang tight!'), 25000);

            t1 = setTimeout(() => setProjectsLoadingMsg('Taking longer than usual... try reload'), 40000);

			try {
				const response = await fetchWithRetry(`${apiBaseUrl}/projects`);
				const data = await response.json();
				setProjects(data);
			} catch (err) {
				setProjectsError('Projects failed to load.');
            } finally {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
                clearTimeout(t4);
				setProjectsLoading(false);
			}
		}
		//call load projects
        loadProjects();

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };        
	}, [apiBaseUrl]);

    return (
        <div>
            <div className="container-fluid">
                <div className="row align-items-start py-5">
                    {/* About info and picture */}
                    <div className="col-lg-4 col-md-4 text-center mb-4 mb-md-0 sticky-sidebar">
                        <div className="d-flex flex-column align-items-center text-center">
                            <img
                                src={myPhoto}
                                alt="My Portrait"
                                style={{ width: '200px', height: '240px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px' }}
                            />
                            <h1 className="mb-1">{personalInfo.firstName} {personalInfo.lastName}</h1>
                            <h4 className="mb-0">{personalInfo.jobTitle}</h4>
                            <div className="d-flex justify-content-center gap-3 mt-2">
                                <a href="https://github.com/israelCyabukombe" target="_blank" rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    style={{ color: 'var(--text)', fontSize: '1.8rem' }}>
                                    <FaGithub />
                                </a>
                                <a href="https://www.linkedin.com/in/israel-cyabukombe-974ba2aa/" target="_blank" rel="noopener noreferrer"
                                    aria-label="Linkedin"
                                    style={{ color: 'var(--text)', fontSize: '1.8rem' }}>
                                    <FaLinkedin />
                                </a>
                            </div>
                            {/* Education */}
                            <div className="mb-4 mt-4">
                                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Education</h3>
                                <div>
                                    <p className="font-semibold text-sm">B.Sc. in Computer Science</p>
                                    <p className="text-sm text-gray-400">South Dakota State University (SDSU)</p>
                                    <p className="text-xs text-gray-500">Minor in Mathematics</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* Intro Skills and Projects */}
                    <div className="col-lg-8 col-md-8 mb-4 mb-md-0 ps-lg-4">
                        <div>
                            {/* Intro */}
                            <h4 className="mb-3">{personalInfo.jobTitle}</h4>
                            <p className="about-intro mb-4">{personalInfo.summaryText}</p>
                            {/* Skills */}
                            <div className="about-skills mb-4">
                                <h2 className="fw-bold mb-4">Skills</h2>
                                <div className="skills-categories">
                                    <div className="skills-category">
                                        <h6 className="category-title mb-3">Front End</h6>
                                        <div className="skills-grid">
                                            {frontEndSkills?.map(skill => (
                                                <span className="skill-badge" key={skill.id}>{skill.skillName}</span>
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
                                            {otherSkills?.map(skill => (
                                                <span className="skill-badge" key={skill.id}>{skill.skillName}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="skills-category">
                                        <h6 className="category-title mb-3">Frameworks</h6>
                                        <div className="skills-grid">
                                            {frameWorkSkills?.map(skill => (
                                                <span className="skill-badge" key={skill.id}>{skill.skillName}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Projects */}
                            <div className="about-projects mb-4">
                                <h2 className="fw-bold mb-4">Projects</h2>
                                <div className="project-list">
                                    {projectsLoading ? (
                                        <div className="d-flex flex-column align-items-center mt-4 gap-2">
                                            <div className="spinner-border" role="status" style={{ color: 'var(--text)' }} >
                                                <span className="visually-hidden">Loading projects...</span>
                                            </div>
                                            <p className="small text-center mb-0" style={{ color: 'var(--text)' }}>{projectsLoadingMsg}</p>
                                        </div>
                                    ) : projectsError ? (
                                            <div className="small mt-3" style={{ color: 'var(--text)' }}>{projectsError}</div>
                                    ) : (
                                        projects.map(project => (
                                            <div key={project.id} className="project-card p-4 mb-4">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <h5 className="fw-bold mb-0">{project.title}</h5>
                                                </div>
                                                <p className="mb-3">{project.description}</p>
                                                {/* Links */}
                                                <div className="d-flex align-items-center gap-3 mt-2">
                                                    {project.repoUrl && (
                                                        <a href={project.repoUrl} target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label="GitHub"
                                                            style={{ color: 'var(--text)', fontSize: '1.8rem' }}>
                                                            <FaGithub />
                                                        </a>
                                                    )}
                                                    {project.liveUrl && (
                                                        <a href={project.liveUrl} target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label="website"
                                                            style={{ color: 'var(--text)', fontSize: '1.8rem' }}>
                                                            <FaGlobe />
                                                        </a>
                                                    )}
                                                    {/* Tech Stack */}
                                                    {project.skills?.length > 0 && (
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary ms-auto"
                                                            onClick={() => setOpenSkillsId(openSkillsId === project.id ? null : project.id)}
                                                            aria-expanded={openSkillsId === project.id}
                                                        >
                                                            <FaLayerGroup className="me-1" />
                                                            Tech Stack
                                                            {openSkillsId === project.id ? <FaChevronUp className="ms-2" /> : <FaChevronDown className="ms-2" />}
                                                        </button>
                                                    )}
                                                </div>
                                                {/* Skills Collapsible */}
                                                <div className={`collapse mt-3 pt-3 border-top ${openSkillsId === project.id ? 'show' : ''}`}>
                                                    <div className="skills-grid">
                                                        {(project.skills ?? []).map(skill => (
                                                            <span className="skill-badge" key={skill}>{skill}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default About;