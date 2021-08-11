import React, {useState} from "react";
import {
  Navbar, NavbarToggler, Container, Collapse, Nav, NavItem,
} from "reactstrap";

import {register, Namespace} from "../viewer-api";
import {navLink} from "../../profile-lkod/components/link";
import LanguageSelector from "../../profile-lkod/components/language-selector";
import {
  EvaluationToolbar,
} from "../../dataset-similarity-evaluation";

import translations from "./header.json";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Namespace.Provider value="header">
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
      </Namespace.Provider>
      <EvaluationToolbar/>
    </Container>
  );
}

register({
  "name": "header",
  "element": Header,
  "translations": translations,
});
