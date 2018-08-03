import React from "react";
import {selectLabel, selectString, selectLabelNoIri} from "app-services/labels/index";
import {Link} from "react-router-dom";
import {getString} from "app/strings";
import {
    DATASET_LIST_URL,
    getUrl,
    KEYWORDS_QUERY,
    THEME_QUERY
} from "../../app/navigation";

export default class DatasetView extends React.PureComponent {

    render() {
        const {dataset, publisherUrl, labels} = this.props;
        const title = selectLabel(labels, this.props.dataset);


        return (
            <div>
                <h1>{title}
                    <a href={dataset["@id"]} target="_blank">
                        <i className="material-icons pl-2">open_in_new</i>
                    </a>
                </h1>
                <h2>
                    <Link to={publisherUrl}>
                        {selectLabel(labels, dataset.publisher)}
                    </Link>
                </h2>
                <p>{selectString(labels, dataset.description)}</p>
                <hr/>
                <Keywords labels={labels} keywords={dataset.keywords}/>
                <Properties labels={labels} dataset={dataset}/>
                <hr/>
            </div>
        )
    }

}


function Keywords({labels, keywords}) {
    const hasKeywords = Object.keys(keywords).length > 0;
    if (!hasKeywords) {
        return null;
    }

    const keywordsLabels = selectString(labels, keywords);
    const keywordsRef = keywordsLabels.map((keyword) => (
        {
            "label": keyword,
            "url": getUrl(DATASET_LIST_URL, {[KEYWORDS_QUERY]: keyword})
        }));

    return (
        <div>
            <span className="sr-only">{getString("s.keywords") + ":"}</span>
            {keywordsRef.map((keyword) => (
                <Link className="btn btn-light mx-1"
                      to={keyword.url} role="button"
                      key={keyword.label}>
                    {keyword.label}
                </Link>
            ))}
            <hr/>
        </div>
    )
}


const Properties = ({labels, dataset}) => {
    return (
        <div className="row">
            {firstColumn(labels, dataset)}
            {secondColumn(labels, dataset)}
            {thirdColumn(labels, dataset)}
            {fourthColumn(labels, dataset)}
        </div>
    );
};

function firstColumn(labels, dataset) {
    const hasThemes = containsData(dataset.themes);
    const hasDataThemes = containsData(dataset.datasetThemes);
    if (!hasThemes && !hasDataThemes) {
        return null;
    }
    return (
        <div className="col-12 col-sm-6 col-md-3">
            {hasDataThemes &&
            <dl>
                <dt>{getString("s.datasetTopic")}</dt>
                {searchableLabeledLinkEntitiesAsDd(
                    labels, dataset.datasetThemes, THEME_QUERY)}
            </dl>
            }
            {hasThemes &&
            <dl>
                <dt>{getString("s.topic")}</dt>
                {searchableLabeledLinkEntitiesAsDd(
                    labels, dataset.themes, THEME_QUERY)}
            </dl>
            }
        </div>
    )

}

function searchableLabeledLinkEntitiesAsDd(labels, entities, searchQuery) {
    if (!Array.isArray(entities)) {
        entities = [entities];
    }
    return entities.map((entity) => {
        const searchLink = getUrl(
            DATASET_LIST_URL, {[searchQuery]: entity["@id"]});
        return (
            <dd key={entity["@id"]}>
                <Link to={searchLink}>
                    {selectLabel(labels, entity)}
                </Link>
                <a href={entity["@id"]} rel="nofollow" target="_blank">
                    {linkIcon()}
                </a>
                <br/>
            </dd>
        )
    });
}

function linkIcon() {
    const iconStyle = {
        "fontSize": "1.2rem",
        "paddingLeft": "0.5rem"
    };
    return (
        <i className="material-icons" style={iconStyle}>
            open_in_new
        </i>
    );
}

function containsData(value) {
    return value !== undefined && value.length !== 0;
}


function secondColumn(labels, dataset) {
    const hasSpatial = containsData(dataset.spatial);
    const hasTemporal = containsData(dataset.temporal);
    if (!hasSpatial && !hasTemporal) {
        return null;
    }
    return (
        <div className="col-12 col-sm-6 col-md-3">
            <dl>
                {hasSpatial && <dt>{getString("s.spatial")}</dt>}
                {hasSpatial && labeledLinkEntitiesAsDd(labels, dataset.spatial)}
                {hasTemporal && <dt>{getString("s.temporal")}</dt>}
                {hasTemporal && temporal(dataset.temporal)}
            </dl>
        </div>
    )
}

function labeledLinkEntitiesAsDd(labels, entities) {
    if (!Array.isArray(entities)) {
        entities = [entities];
    }
    return entities.map((entity) => (
        <dd key={entity["@id"]}>
            {selectLabel(labels, entity)}
            <a href={entity["@id"]} rel="nofollow" target="_blank">
                {linkIcon()}
            </a>
            <br/>
        </dd>
    ));
}

function thirdColumn(labels, dataset) {
    const hasDocumentation = containsData(dataset.documentation);
    const hasContacts = containsData(dataset.contactPoints);
    if (!hasDocumentation && !hasContacts) {
        return null;
    }
    return (
        <div className="col-12 col-sm-6 col-md-3">
            <dl>
                {hasDocumentation && <dt>{getString("s.documentation")}</dt>}
                {hasDocumentation && documentation(dataset.documentation)}
                {hasContacts && <dt>{getString("s.contact_point")}</dt>}
                {hasContacts && contactPoints(labels, dataset.contactPoints)}
            </dl>
        </div>
    )
}

function fourthColumn(labels, dataset) {
    const hasFrequency = containsData(dataset.frequency);
    if (!hasFrequency) {
        return null;
    }
    return (
        <div className="col-12 col-sm-6 col-md-3">
            <dl>
                <dt>{getString("s.frequency")}</dt>
                {labeledLinkEntitiesAsDd(labels, dataset.frequency)}
            </dl>
        </div>
    )
}


function documentation(entities) {
    if (!Array.isArray(entities)) {
        entities = [entities];
    }
    const label = getString("s.documentation_download");
    return entities.map((iri) => (
        <dd key={iri}>
            <a href={iri} rel="nofollow">
                {label}
            </a>
            <br/>
        </dd>
    ));
}

function temporal(temporal) {
    let value;
    if (temporal.startDate === undefined) {
        if (temporal.endDate === undefined) {
            value = temporal.iri;
        } else {
            value = " - " + updateDate(temporal.endDate);
        }
    } else {
        if (temporal.endDate === undefined) {
            value = updateDate(temporal.startDate) + " - ";
        } else {
            value = updateDate(temporal.startDate) + " - " +
                updateDate(temporal.endDate);
        }
    }
    return (
        <dd>
            {value}
        </dd>
    )
}

// TODO Add better date handling, the format is YYYY-MM-DD+02:00 or YYYY-MM-DD
function updateDate(value) {
    const plusIndex = value.indexOf("+");
    if (plusIndex === -1) {
        return value;
    } else {
        return value.substr(0, value.indexOf("+"));
    }
}

function contactPoints(labels, contactPoints) {
    if (contactPoints === undefined) {
        return null;
    }
    if (!Array.isArray(contactPoints)) {
        contactPoints = [contactPoints];
    }
    return contactPoints.map((contact) => (
        <dd key={contact.iri}>
            {contactPoint(labels, contact)}
            <br/>
        </dd>
    ));
}

function contactPoint(labels, contactPoint) {
    let label = selectLabelNoIri(labels, contactPoint.iri);
    let email = getEmail(contactPoint);

    if (label === undefined) {
        if (email === undefined) {
            label = contactPoint.iri;
        } else {
            label = email;
        }
    }

    let iri;
    if (email === undefined) {
        iri = contactPoint.iri;
    } else {
        iri = "mailto:" + contactPoint.email;
    }

    return (
        <a href={iri} rel="nofollow">{label}</a>
    )
}

function getEmail(value) {
    if (value.email === undefined || value.email.length === 0) {
        return undefined;
    } else {
        return value.email[0];
    }
}
