import './Navbar.css';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSun, FaCloudSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeProvider';

const MyNavbar = () => {
    const { theme, setTheme } = useTheme();
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">Iz-Bio</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link className="mx-5" as={Link} to="/">About</Nav.Link>
                        <NavDropdown className="mx-5" title="Links" id="links-dropdown">
                            <NavDropdown.Item href="https://github.com/israelCyabukombe" target="_blank">My GitHub</NavDropdown.Item>
                            <NavDropdown.Item href="https://www.linkedin.com/in/israel-cyabukombe-974ba2aa/" target="_blank">My Linkedln</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link className="mx-5" as={Link} to="/contact">Contact</Nav.Link>
                    </Nav>
                    <div className="d-flex align-items-center ms-3">
                        <button
                            type="button"
                            className={`btn btn-sm me-1 ${theme === 'light' ?
                                'btn-secondary' : 'btn-outline-secondary'}`}
                            aria-label="Light theme"
                            onClick={() => setTheme('light')}
                        >
                            <FaSun />
                        </button>
                        <button
                            type="button"
                            className={`btn btn-sm me-1 ${theme === 'mid' ?
                                'btn-secondary' : 'btn-outline-secondary'}`}
                            aria-label="Mid theme"
                            onClick={() => setTheme('mid')}
                        >
                            <FaCloudSun />
                        </button>
                        <button
                            type="button"
                            className={`btn btn-sm me-1 ${theme === 'dark' ?
                                'btn-secondary' : 'btn-outline-secondary'}`}
                            aria-label="Dark theme"
                            onClick={() => setTheme('dark')}
                        >
                            <FaMoon />
                        </button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar