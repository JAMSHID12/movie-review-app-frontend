import { Popover } from "bootstrap";
import { useState } from "react";
import { Form, Overlay } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";


const NavbarComponent = () => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => ({
        isAuthenticated: state.user.isAuthenticated,
        user: state.user.user,
    }));
    const handleMouseOver = (event) => {
        setTarget(event.target);
        setShow(true);
    };

    const handleMouseOut = () => {
        setShow(false);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };
    return (
        <Navbar bg="dark" variant="dark" expand="sm" className="justify-content-between">
            <Container fluid>
                <Navbar.Brand href="/" style={{ color: 'gold' }}>
                    MOVIE REVIEW
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse id="navbarScroll">
                    <Container fluid className="d-flex justify-content-between align-items-center">
                        <Nav className="mx-auto" navbarScroll>
                            <NavLink className="nav-link" to="/">Home</NavLink>
                            <NavLink className="nav-link" to="/movies">Search</NavLink>
                            {isAuthenticated && (
                                <NavLink className="nav-link" to="/myList">My List</NavLink>
                            )}
                        </Nav>

                        {isAuthenticated && user && (
                            <div className="position-relative">
                                <img
                                    src={user.profilePhoto} 
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
                                        <Popover.Header as="h3">{user.name}</Popover.Header>
                                        <Popover.Body>
                                            <img
                                                src={user.profilePhoto} 
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

                        
                        {!isAuthenticated && (
                            <Button  variant="outline-info" className="ms-auto" onClick={handleLoginClick}>Login</Button>
                        )}
                    </Container>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;