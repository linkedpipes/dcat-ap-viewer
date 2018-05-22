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
import {Link} from "react-router";
import {getString, getLanguages} from "./strings";
import {connect} from "react-redux";

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
        const {language, router} = this.props;
        let baseUrl = this.createBaseUrl(router);
        const otherLanguages = this.getOtherLanguages(language);
        //
        return (
            <NavItem>
                <Dropdown isOpen={this.state.isLanguageOpen}
                          toggle={this.toggleLanguage}>
                    <DropdownToggle caret nav>
                        <img src={"/assets/images/flag-" + language + ".png"}
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

    createBaseUrl(router) {
        let search = router.location.search;
        if (search === "") {
            search = "?"
        } else {
            search += "&";
        }
        return router.location.pathname + search;
    }

    getOtherLanguages(active) {
        const languages = getLanguages();
        const index = languages.indexOf(active);
        languages.splice(index, 1)
        return languages;
    }

    createDropdownItem(baseUrl, lang){
        return (
            <DropdownItem key={lang}>
                <NavLink href={baseUrl + "lang=" + lang}>
                    <img src={"/assets/images/flag-" + lang + ".png"}
                         style={{
                             "width": "1.2rem",
                             "marginLeft": "0.4rem",
                             "marginBottom": "0.3rem"
                         }}
                         alt={getString(lang)}/>
                </NavLink>
            </DropdownItem>
        );
    }

}

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
                <Navbar toggleable="md" className="navbar-light">
                    <NavbarBrand href="https://data.gov.cz/">
                        <img width="174" height="30"
                             className="d-inline-block align-top"
                             src="/assets/images/opendata-logo.png"/>
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
                                <Link to={getUrl(KEYWORDS_LIST_URL)}
                                      className="nav-link"
                                      activeClassName="active">
                                    {getString("h.keywords")}
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Dropdown isOpen={this.state.isMoreOpen}
                                          toggle={this.toggleMore}>
                                    <DropdownToggle caret nav>
                                        {getString("h.more")}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <NavLink
                                                href="https://opendata.gov.cz/development:zajemci">
                                                {getString("h.for_interested_in_open_data")}
                                            </NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink
                                                href="https://opendata.gov.cz/development:programatori">
                                                {getString("h.for_programmes")}
                                            </NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink
                                                href="https://opendata.gov.cz/development:poskytovatele">
                                                {getString("h.for_publishers")}
                                            </NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                            <HeaderLanguageSelector
                                language={getLanguage()}
                                router={this.props.router}/>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({});

export const Header = connect(mapStateToProps)(HeaderComponent);
