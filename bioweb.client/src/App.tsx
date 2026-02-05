import './App.css';
import './components/Navbar.tsx';
import MyNavbar from './components/Navbar.tsx';
import { Routes, Route } from 'react-router-dom';;
import About from './components/About.tsx';
import Skills from './components/Skills.tsx';
import Contact from './components/Contact.tsx';

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
