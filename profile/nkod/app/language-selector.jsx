import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  NavLink,
} from "reactstrap";
import {PropTypes} from "prop-types";
import {getAllLanguages, register} from "../../client-api";
import {LANGUAGE_SELECTOR} from "../nkod-component-names";

class LanguageSelector extends React.PureComponent {

  constructor(props) {
    super(props);
    this.toggleLanguage = this.toggleLanguage.bind(this);
    this.state = {
      "isLanguageOpen": false,
    };
  }

  render() {
    const {t, language, location} = this.props;
    const baseUrl = createBaseUrl(location);
    return (
      <NavItem>
        <Dropdown
          isOpen={this.state.isLanguageOpen}
          toggle={this.toggleLanguage}
        >
          <DropdownToggle caret nav>
            <img
              src={"./assets/flags/flag-" + language + ".png"}
              style={{"width": "1.2rem"}}
              alt={t(language)}
            />
          </DropdownToggle>
          <DropdownMenu className="language-drop-down">
            {getOtherLanguages(language).map((lang) => (
              createDropdownItem(baseUrl, lang, t(lang))
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavItem>
    )
  }

  toggleLanguage() {
    this.setState({
      "isLanguageOpen": !this.state.isLanguageOpen,
    });
  }

}

LanguageSelector.propTypes = {
  "t": PropTypes.func.isRequired,
  "location": PropTypes.object.isRequired,
  "language": PropTypes.string.isRequired,
};

register({
  "name": LANGUAGE_SELECTOR,
  "element": LanguageSelector,
});

function createBaseUrl(location) {
  let search = location.search;
  if (search === "") {
    search = "?"
  } else {
    search += "&";
  }
  return location.pathname + search;
}

/**
 * Return all languages but the given one.
 */
function getOtherLanguages(active) {
  const languages = getAllLanguages();
  const index = languages.indexOf(active);
  languages.splice(index, 1);
  return languages;
}

function createDropdownItem(url, lang, label) {
  const link = url + "language=" + lang;
  return (
    <DropdownItem key={lang} tag={NavLink} href={link}>
      <img
        src={"./assets/flags/flag-" + lang + ".png"}
        style={{
          "width": "1.2rem",
          "marginLeft": "0.4rem",
          "marginBottom": "0.3rem",
        }}
        alt={label}
      />
    </DropdownItem>
  );
}