import React from "react";
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Container,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import {getUrl, DATASET_LIST_URL, ORGANISATION_LIST_URL} from "./navigation";
import {Link} from "react-router";
import {getString} from "./strings"

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state = {
            "isOpen": false,
            "dropDownOpen": false
        };
    }

    toggleNavbar() {
        this.setState({
            "isOpen": !this.state.isOpen
        });
    }

    toggleDropDown() {
        this.setState({
            "dropDownOpen": !this.state.dropDownOpen
        });
    }

    render() {
        return (
            <Container>
                <Navbar toggleable="md" className="navbar-light">
                    <NavbarBrand href="https://data.gov.cz.opendata.cz/">
                        <img width="174" height="30"
                             className="d-inline-block align-top"
                             src="assets/images/opendata-logo.png"/>
                    </NavbarBrand>
                    <NavbarToggler right onClick={this.toggleNavbar}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to={getUrl(DATASET_LIST_URL)}
                                      className="nav-link"
                                      activeClassName="active">
                                    {getString("h.datasets")}
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to={getUrl(ORGANISATION_LIST_URL)}
                                      className="nav-link"
                                      activeClassName="active">
                                    {getString("h.publishers")}
                                </Link>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">
                                    {getString("h.applications")}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <Dropdown isOpen={this.state.dropDownOpen}
                                          toggle={this.toggleDropDown}>
                                    <DropdownToggle caret nav>
                                        {getString("h.more")}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <NavLink href="/">
                                                {getString("h.for_interested_in_open_data")}
                                            </NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink href="/">
                                                {getString("h.for_programmes")}
                                            </NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink href="/">
                                                {getString("h.for_publishers")}
                                            </NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
        )
    }
}

export default Header;