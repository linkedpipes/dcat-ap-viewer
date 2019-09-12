import React from "react";
import {parse as parseQueryString} from "query-string";
import {
  DATASET_LIST_URL,
  getLanguage,
  setLanguage,
  getUrl,
  translate,
  getLanguageForUrl,
  PAGE,
  QUERY,
} from "./navigation";
import {replace} from "connected-react-router";
import {PropTypes} from "prop-types";

/**
 * Top level component, does not modify the content.
 * Set the language based on the URL, browser options or perform
 * redirect.
 */
export class LanguageReRouter extends React.Component {

  constructor(props) {
    super(props);
    this.handleNoLanguageQuery = this.handleNoLanguageQuery.bind(this);
    this.getPathName = this.getPathName.bind(this);
    this.redirectToHome = this.redirectToHome.bind(this);
    this.handleLanguageQuery = this.handleLanguageQuery.bind(this);
  }

  componentWillMount() {
    const params = parseQueryString(this.props.location.search);
    const lang = params["lang"];
    if (lang === undefined) {
      this.handleNoLanguageQuery();
    } else {
      this.handleLanguageQuery(params);
    }
  }

  handleNoLanguageQuery() {
    const pathname = this.getPathName();
    if (pathname === "") {
      this.redirectToHome();
    } else {
      const pathLanguage = getLanguageForUrl(pathname);
      if (getLanguage() === pathLanguage) {
        // Do nothing.
      } else {
        setLanguage(pathLanguage);
        // Dataset list parse query from URL, as we change the language we
        // need to update this - in order to trigger the update
        // we change the route.
        // TODO Solve this in other way which does not require redraw.
        this.props.dispatch(replace({
          "pathname": pathname,
          "search": this.props.location.search,
        })
        );
      }
    }
  }

  getPathName() {
    return decodeURI(this.props.location.pathname.substring(1));
  }

  redirectToHome() {
    this.props.dispatch(replace({
      "pathname": getUrl(DATASET_LIST_URL),
      "search": this.props.location.search,
    })
    );
  }

  handleLanguageQuery(params) {
    const pathname = this.getPathName();
    const pathLanguage = getLanguageForUrl(pathname);
    const queryLanguage = params["lang"];
    if (pathLanguage === queryLanguage) {
      this.handleLanguagesAreSame(pathname, params, queryLanguage);
    } else {
      this.handleLanguagesAreDifferent(pathname, params, queryLanguage);
    }
  }

  handleLanguagesAreSame(pathname, params, targetLanguage) {
    setLanguage(targetLanguage);
    this.props.dispatch(replace(createPushObject(
      this.props.location.pathname,
      {
        ...parseQueryString(this.props.location.search),
        "lang": undefined,
      }
    )));
  }

  handleLanguagesAreDifferent(pathname, params, targetLanguage) {
    let path = this.translatePathName(pathname, targetLanguage);
    const query = this.translateQuery(params, targetLanguage);
    setLanguage(targetLanguage);
    this.props.dispatch(replace(createPushObject(
      path,
      query
    )));
  }

  translatePathName(pathname, targetLanguage) {
    const path = translate(decodeURI(pathname), PAGE, targetLanguage);
    // Stay on the same site if the translation is missing.
    if (path === undefined) {
      return "/" + pathname;
    } else {
      return encodeURI(path);
    }
  }

  translateQuery(params, targetLanguage) {
    const query = {};
    for (let name in params) {
      if (name === "lang") {
        continue;
      }
      let translated = translate(name, QUERY, targetLanguage);
      if (translated === undefined) {
        translated = name;
      }
      query[translated] = params[name];

    }
    return query;
  }

  render() {
    return this.props.children;
  }

}

LanguageReRouter.propTypes = {
  "dispatch": PropTypes.func.isRequired,
  "location": PropTypes.object.isRequired,
  "children": PropTypes.node.isRequired,
};

function createPushObject(pathname, query) {
  let search = "";
  Object.keys(query).map((key) => {
    let values = query[key];
    if (values === undefined || values.length === 0 || values === "") {
      return;
    }
    if (!Array.isArray(values)) {
      values = [values];
    }
    values.forEach((value) => {
      if (search === "") {
        search += "?";
      } else {
        search += "&";
      }
      search += encodeURIComponent(key) + "=" + encodeURIComponent(value);
    });
  });
  return {
    "pathname": pathname,
    "search": search,
  }
}
