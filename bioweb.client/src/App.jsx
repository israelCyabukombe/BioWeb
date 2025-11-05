import './App.css';
import './components/Navbar.jsx';
import MyNavbar from './components/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';;
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';

function App() {

    return (
        <>
        <MyNavbar />
            <Routes>
                <Route path="/" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/contact" element={<Contact />} />
        </Routes>
        </>
    );
}

export default App
