import React, {useState} from "react";
import {
  Navbar, NavbarToggler, Container, Collapse, Nav, NavItem,
} from "reactstrap";

import {register, Namespace} from "../viewer-api";
import {navLink} from "../components/link";
import LanguageSelector from "../components/language-selector";

import translations from "./header.json";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Namespace.Provider value="header">
      <Container>
        <Navbar light expand="md">
          <NavbarToggler onClick={() => setIsOpen(!isOpen)}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                {navLink("/datasets", "header.datasets")}
              </NavItem>
              <NavItem>
                {navLink("/keywords", "header.keywords")}
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
