import React, {useContext} from "react";
import {PropTypes} from "prop-types";
import {
  NavItem, NavLink, UncontrolledDropdown, DropdownItem, DropdownMenu,
  DropdownToggle,
} from "reactstrap";

import {NavigationContext, createUrl, translateString} from "../viewer-api";
import {getLanguages} from "../../viewer-react/service/translations";

export default function LanguageSelector() {
  const navigation = useContext(NavigationContext);

  const languages = getLanguages()
    .filter(language => language !== navigation.language);
  return (
    <NavItem>
      <UncontrolledDropdown>
        <DropdownToggle caret nav>
          <LanguageImage language={navigation.language}/>
        </DropdownToggle>
        <DropdownMenu className="language-drop-down">
          {languages.map((language) => (
            <DropdownItem
              key={language}
              tag={NavLink}
              href={createLanguageHref(navigation, language)}
            >
              <LanguageImage language={language}/>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </NavItem>
  );
}

function LanguageImage(props) {
  return (
    <img
      src={"./assets/flags/flag-" + props.language + ".png"}
      style={{"width": "1.2rem"}}
      alt={translateString(props.language, "language." + props.language)}
    />
  );
}

LanguageImage.propTypes = {
  "language": PropTypes.string.isRequired,
};

function createLanguageHref(navigation, language) {
  return createUrl(language, navigation.path, navigation.query);
}
