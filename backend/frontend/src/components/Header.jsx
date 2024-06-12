import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { IoCartSharp } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { logout } from "../action/userAction";
import SearchBox from "./SearchBox";

function Header() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="primary" data-bs-theme="dark" className="mb-3">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Navbar</Navbar.Brand>
          </LinkContainer>

          <Nav className="me-auto">
            {userInfo ? (
              <NavDropdown title={userInfo.username}>
                <LinkContainer to="/profile">
                  <NavDropdown.Item>
                    <CgProfile size={20} /> Profile
                  </NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={handleLogout}>
                  <CiLogout size={20} /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <FiLogIn size={20} /> Login
                </Nav.Link>
              </LinkContainer>
            )}

            <LinkContainer to="/cart">
              <Nav.Link>
                <IoCartSharp size={20} /> Cart
              </Nav.Link>
            </LinkContainer>

            {(userInfo && userInfo.isAdmin) && <NavDropdown title={"admin"}>
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>
                     Users
                  </NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>
                    Products
                  </NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/orders">
                  <NavDropdown.Item>
                    Orders
                  </NavDropdown.Item>
                </LinkContainer>

              </NavDropdown> }

              <SearchBox/>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
