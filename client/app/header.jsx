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
import {
    getUrl,
    DATASET_LIST_URL,
    ORGANISATION_LIST_URL,
    KEYWORDS_LIST_URL,
    getLanguage
} from "./navigation";
import {NavLink as RouterLink} from "react-router-dom";
import {getString, getLanguages} from "../app-services/strings";

class HeaderComponent extends React.Component {

    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleMore = this.toggleMore.bind(this);
        this.state = {
            "isOpen": false,
            "isMoreOpen": false,
        };
    }

    toggleNavbar() {
        this.setState({
            "isOpen": !this.state.isOpen
        });
    }

    toggleMore() {
        this.setState({
            "isMoreOpen": !this.state.isMoreOpen
        });
    }

    render() {
        return (
            <Container>
                <Navbar expand="md" className="navbar-light">
                    <NavbarBrand href="https://data.gov.cz/">
                        <img width="174" height="30"
                             alt={getString("header.logo_alt")}
                             className="d-inline-block align-top"
                             src="./assets/images/opendata-logo.png"/>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink
                                    href="https://data.gov.cz/novinky/">
                                    {getString("news")}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <RouterLink to={getUrl(DATASET_LIST_URL)}
                                            className="nav-link"
                                            activeClassName="active"
                                            isActive={isDatasetActive}>
                                    {getString("datasets")}
                                </RouterLink>
                            </NavItem>
                            <NavItem>
                                <RouterLink to={getUrl(ORGANISATION_LIST_URL)}
                                            className="nav-link"
                                            activeClassName="active">
                                    {getString("publishers")}
                                </RouterLink>
                            </NavItem>
                            <NavItem>
                                <RouterLink to={getUrl(KEYWORDS_LIST_URL)}
                                            className="nav-link"
                                            activeClassName="active">
                                    {getString("keywords")}
                                </RouterLink>
                            </NavItem>
                            <NavItem>
                                <Dropdown isOpen={this.state.isMoreOpen}
                                          toggle={this.toggleMore}>
                                    <DropdownToggle caret nav>
                                        {getString("more")}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <NavLink
                                                href="https://opendata.gov.cz/informace:základy-otevřených-dat-pro-zájemce">
                                                {getString("for_interested_in_open_data")}
                                            </NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink
                                                href="https://opendata.gov.cz/informace:základy-otevřených-dat-pro-programátory">
                                                {getString("for_programmes")}
                                            </NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink
                                                href="https://opendata.gov.cz">
                                                {getString("for_publishers")}
                                            </NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                            <HeaderLanguageSelector
                                language={getLanguage()}
                                location={this.props.location}/>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
        )
    }
}

function isDatasetActive(match, location) {
    if (match) {
        return true;
    }
    const rootPath = URL_PREFIX + "/";
    return location.pathname === rootPath;
}

export const Header = (HeaderComponent);

class HeaderLanguageSelector extends React.Component {

    constructor(props) {
        super(props);
        this.toggleLanguage = this.toggleLanguage.bind(this);
        this.getOtherLanguages = this.getOtherLanguages.bind(this);
        this.state = {
            "isLanguageOpen": false
        };
    }

    render() {
        // TODO Move to props change handler.
        const {language, location} = this.props;
        let baseUrl = this.createBaseUrl(location);
        const otherLanguages = this.getOtherLanguages(language);
        //
        return (
            <NavItem>
                <Dropdown isOpen={this.state.isLanguageOpen}
                          toggle={this.toggleLanguage}>
                    <DropdownToggle caret nav>
                        <img src={"./assets/images/flag-" + language + ".png"}
                             style={{"width": "1.2rem"}}
                             alt={getString(language)}/>
                    </DropdownToggle>
                    <DropdownMenu className="language-drop-down">
                        {otherLanguages.map((lang) => (
                            this.createDropdownItem(baseUrl, lang)
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </NavItem>
        )
    }

    toggleLanguage() {
        this.setState({
            "isLanguageOpen": !this.state.isLanguageOpen
        });
    }

    createBaseUrl(location) {
        let search = location.search;
        if (search === "") {
            search = "?"
        } else {
            search += "&";
        }
        return location.pathname + search;
    }

    getOtherLanguages(active) {
        const languages = getLanguages();
        const index = languages.indexOf(active);
        languages.splice(index, 1)
        return languages;
    }

    createDropdownItem(baseUrl, lang) {
        const link = baseUrl + "lang=" + lang;
        return (
            <DropdownItem key={lang} tag={NavLink} href={link}>
                <img src={"./assets/images/flag-" + lang + ".png"}
                     style={{
                         "width": "1.2rem",
                         "marginLeft": "0.4rem",
                         "marginBottom": "0.3rem"
                     }}
                     alt={getString(lang)}/>
            </DropdownItem>
        );
    }

}
