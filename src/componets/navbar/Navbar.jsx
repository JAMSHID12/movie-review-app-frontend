
import { useState } from "react";
import { Popover, Overlay } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import image from '../../assets/unknown.jpg'
import './navbar.css'
import logo from '../../assets/logo.png'


const NavbarComponent = () => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [user, setUser] = useState({})
    const navigate = useNavigate();

    const handleMouseOver = (event) => {
        getUserData();
        setTarget(event.target);
        setShow(true);
    };

    const getUserData = () => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }

    const handleMouseOut = () => {
        setShow(false);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };
    return (
        <>

<div className="bg bg-dark">
<Navbar bg="dark" variant="dark" expand="sm" className="container justify-content-between">
                <Container fluid>
                    <Navbar.Brand href="/" style={{ color: 'gold' }}>
                        <img className="logo-img" src={logo} alt="" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" />

                    <Navbar.Collapse id="navbarScroll">
                        <Container fluid className="d-flex justify-content-between align-items-center">
                            <Nav className="mx-auto" navbarScroll>
                                <NavLink className="nav-link" to="/">Home</NavLink>
                                <NavLink className="nav-link" to="/movies">All Movies</NavLink>
                                {user && (
                                    <NavLink className="nav-link" to="/myList">My List</NavLink>
                                )}
                            </Nav>

                            {user && user && (
                                <div className="position-relative">
                                    <img
                                        src={image}
                                        alt="User Profile"
                                        className="rounded-circle"
                                        style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                                        onMouseOver={handleMouseOver}
                                        onMouseOut={handleMouseOut}
                                    />
                                    <Overlay
                                        show={show}
                                        target={target}
                                        placement="bottom"
                                        containerPadding={20}
                                        onHide={() => setShow(false)}
                                    >
                                        <Popover id="popover-basic">
                                            <Popover.Header as="h3">{user.userName}</Popover.Header>
                                            <Popover.Body>
                                                <img
                                                    src={image}
                                                    alt="User Profile"
                                                    className="rounded-circle me-2"
                                                    style={{ width: '30px', height: '30px' }}
                                                />
                                                <strong>Email:</strong> {user.email}
                                            </Popover.Body>
                                        </Popover>
                                    </Overlay>
                                </div>
                            )}


                            {!user && (
                                <Button variant="outline-info" className="ms-auto" onClick={handleLoginClick}>Login</Button>
                            )}
                        </Container>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
</div>
            
        </>
    );

}

export default NavbarComponent;