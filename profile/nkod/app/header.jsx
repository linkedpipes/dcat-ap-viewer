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
  DropdownItem,
} from "reactstrap";
import {
  register,
  getRegisteredElement,
  ELEMENT_HEADER,
} from "./../../client-api";
import {LANGUAGE_SELECTOR} from "../nkod-component-names";
import {NavLink as RouterLink} from "react-router-dom";
import {PropTypes} from "prop-types";

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleMore = this.toggleMore.bind(this);
    this.state = {
      "isOpen": false,
      "isMoreOpen": false,
    };
    this.LanguageSelector = getRegisteredElement(LANGUAGE_SELECTOR);
  }

  toggleNavbar() {
    this.setState({
      "isOpen": !this.state.isOpen,
    });
  }

  toggleMore() {
    this.setState({
      "isMoreOpen": !this.state.isMoreOpen,
    });
  }

  render() {
    const {t, tUrl} = this.props;
    const LanguageSelector = this.LanguageSelector;
    return (
      <Container>
        <Navbar expand="md" className="navbar-light">
          <NavbarBrand href="https://data.gov.cz/">
            <img
              width="174" height="30"
              alt={t("header.logoAlt")}
              className="d-inline-block align-top"
              src="./assets/images/opendata-logo.png"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://data.gov.cz/novinky/">
                  {t("header.news")}
                </NavLink>
              </NavItem>
              <NavItem>
                <RouterLink
                  to={tUrl("/datasets")}
                  className="nav-link"
                  activeClassName="active"
                >
                  {t("header.datasets")}
                </RouterLink>
              </NavItem>
              <NavItem>
                <RouterLink
                  to={tUrl("/publishers")}
                  className="nav-link"
                  activeClassName="active"
                >
                  {t("header.publishers")}
                </RouterLink>
              </NavItem>
              <NavItem>
                <RouterLink
                  to={tUrl("/keywords")}
                  className="nav-link"
                  activeClassName="active"
                >
                  {t("header.keywords")}
                </RouterLink>
              </NavItem>
              <NavItem>
                <Dropdown
                  isOpen={this.state.isMoreOpen}
                  toggle={this.toggleMore}
                >
                  <DropdownToggle caret nav>
                    {t("header.more")}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      href="https://opendata.gov.cz/informace:základy-otevřených-dat-pro-zájemce"
                    >
                      {t("header.forInterestedInOpenData")}
                    </DropdownItem>
                    <DropdownItem
                      href="https://opendata.gov.cz/informace:základy-otevřených-dat-pro-programátory"
                    >
                      {t("header.forProgrammes")}
                    </DropdownItem>
                    <DropdownItem href="https://opendata.gov.cz">
                      {t("header.forPublishers")}
                    </DropdownItem>
                    <DropdownItem
                      tag={RouterLink}
                      to={tUrl("/catalogs")}
                      activeClassName="active"
                    >
                      {t("header.catalogs")}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
              <LanguageSelector
                t={this.props.t}
                language={this.props.language}
                url={this.props.url}
              />
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    );
  }
}

Header.propTypes = {
  "t": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "url": PropTypes.object.isRequired,
  "language": PropTypes.string,
};

register({
  "name": ELEMENT_HEADER,
  "element": Header,
});
