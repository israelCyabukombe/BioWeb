import myPhoto from '../assets/IMG_0002.jpg';
import React, { useState, useEffect } from 'react';

function About() {
	
	const [personalInfo, setPersonalInfo] = useState(null);
	
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
        <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '80vh', padding: '20px' }}>
            <img
                src={myPhoto}
                alt="My Portrait"
                style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px' }}
            />

            <h1>Hi, I'm {personalInfo.firstName} {personalInfo.lastName}</h1>
            <p style={{ maxWidth: '600px', fontSize: '1.2rem', marginTop: '10px' }}>
				{personalInfo.summaryText}
            </p>
        </div>
    );

}

export default About;