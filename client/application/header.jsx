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
import {getUrl, DATASET_LIST_URL, ORGANISATION_LIST_URL} from "./navigation"

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
            <Navbar toggleable="md">
                <Container>
                    <NavbarBrand href="https://data.gov.cz.opendata.cz/">
                        <img width="174" height="30"
                             className="d-inline-block align-top"
                             src="assets/images/opendata-logo.png"/>
                    </NavbarBrand>
                    <NavbarToggler right onClick={this.toggleNavbar}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="active">
                                <NavLink href={getUrl(DATASET_LIST_URL)}>
                                    Datové sady
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={getUrl(ORGANISATION_LIST_URL)}>
                                    Poskytovatelé
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">
                                    Aplikace
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <Dropdown isOpen={this.state.dropDownOpen}
                                          toggle={this.toggleDropDown}>
                                    <DropdownToggle caret nav>
                                        Další
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <NavLink href="/">
                                                Pro zájemce o otevírání dat
                                            </NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink href="/">
                                                Pro uživatele a programátory
                                            </NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink href="/">
                                                Pro poskytovatele dat
                                            </NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Header;