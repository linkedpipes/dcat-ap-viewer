import React from "react";
import {
    listLanguages,
    getQuery,
    getFullUrl,
} from "@/app/navigation";
import {getString} from "@/app-services/strings";
import {PropTypes} from "prop-types";
import {Helmet} from "react-helmet";
import {parse as parseQueryString} from "query-string";

export default class HeadLinks extends React.PureComponent {

    render() {
        const query = parseQueryString(this.props.search);
        const {url, params} = this.props;
        const languages = listLanguages();
        console.log(">", languages);
        return (
            <Helmet>
                <title>{getString(this.props.title)}</title>
                <link rel="canonical"
                      href={prepareQuery(url, query, params)}/>
                {
                    languages.map((lang) => (
                        <link rel="alternate"
                              href={prepareQuery(url, query, params, lang)}
                              hrefLang={lang}/>
                    ))
                }
            </Helmet>
        )
    }

}

function prepareQuery(url, query, params, lang) {
    if (!params) {
        return getFullUrl(url, {}, lang);
    }
    const queryObject = {};
    params.forEach((name) => {
        queryObject[name] = query[getQuery(name)];
    });
    return getFullUrl(url, queryObject, lang);
}


HeadLinks.propTypes = {
    "title": PropTypes.string.isRequired,
    "url": PropTypes.string.isRequired,
    "search": PropTypes.string,
    "params": PropTypes.array
};
