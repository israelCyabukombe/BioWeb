import './Navbar.css';
import { Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';

function MyNavbar() {

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="#home">Iz-Bio</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link className="mx-5" href="#home">About</Nav.Link>
                        <Nav.Link className="mx-5" href="#skills">Skills</Nav.Link>
                        <NavDropdown className="mx-5" title="Resources" id="resource-dropdown">
                            <NavDropdown.Item href="#webdev">My GitHub</NavDropdown.Item>
                            <NavDropdown.Item href="#datasci">Linkedln</NavDropdown.Item>
                            <NavDropdown.Item href="#Articles">Articles</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link className="mx-5" href="#contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar