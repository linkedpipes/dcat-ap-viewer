import React, {useState, useContext} from "react";
import {
  Navbar, NavbarBrand, NavbarToggler, Container,  Collapse,  Nav,  NavItem,
  NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from "reactstrap";

import {
  t, register, Namespace, translateString, NavigationContext,
  navLink, createUrl,
} from "../viewer-api";
import LanguageSelector from "../../profile-lkod/components/language-selector";

import translations from "./header.json";

function Header() {
  const {language} = useContext(NavigationContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Namespace.Provider value="header">
      <Container>
        <Navbar light expand="md">
          <NavbarBrand href="/">
            <img
              width="174" height="30"
              alt={translateString(language, "header.logoAlt")}
              className="d-inline-block align-top"
              src="./assets/images/opendata-logo.png"
            />
          </NavbarBrand>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <NavLink href="/vzdělávání/">
                  {t("header.education")}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/články/">
                  {t("header.articles")}
                </NavLink>
              </NavItem>
              <NavItem>
                {navLink("/datasets", "header.datasets")}
              </NavItem>
              <NavItem>
                {navLink("/publishers", "header.publishers")}
              </NavItem>
              <NavItem>
                {navLink("/keywords", "header.keywords")}
              </NavItem>
              <NavItem>
                <UncontrolledDropdown>
                  <DropdownToggle caret nav>
                    {translateString(language, "header.more")}
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem
                      href="/informace/základy-otevřených-dat-pro-zájemce/"
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
                    <DropdownItem href={createUrl(language, "/catalogs")}>
                      {t("header.catalogs")}
                    </DropdownItem>
                    <DropdownItem href="https://docs.google.com/forms/d/e/1FAIpQLSdUaVaCITtmHdTGxsU5xPvdzIygOA7wHHaotPRPAbglCF3mpw/viewform">
                      {t("header.suggestions")}
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <LanguageSelector/>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </Namespace.Provider>
  );
}

register({
  "name": "header",
  "element": Header,
  "translations": translations,
});
