import React from "react";
import {selectLabel, selectString} from "app-services/labels";
import {Link} from "react-router";
import TagLine from "app-components/tag-line";
import {Table} from "reactstrap";
import {getString} from "app/strings";

export default class NkodDatasetView extends React.PureComponent {

    render() {
        const {dataset, publisherUrl, labels} = this.props;
        const title = selectLabel(labels, this.props.dataset);
        const keywords = selectString(labels, dataset.keywords);
        return (
            <div>
                <h1>{title}
                    <a href={dataset["@id"]} target="_blank">
                        <i className="material-icons pl-2">share</i>
                    </a>
                </h1>
                <h2>
                    <Link to={publisherUrl}>
                        {selectLabel(labels, dataset.publisher)}
                    </Link>
                </h2>
                <p>{selectString(labels, dataset.description)}</p>
                <hr/>
                <Keywords keywords={keywords}/>
                <hr/>
                <Properties labels={labels} dataset={dataset}/>
                <hr/>
            </div>
        )
    }

}


const Keywords = (({keywords}) => (
    <div>
        <span className="sr-only">{getString("s.keywords") + ":"}</span>
        {keywords.map((keyword) => (
            <a className="btn btn-light mx-1"
               href="#" role="button"
               key={keyword}>
                {keyword}
            </a>
        ))}
    </div>
));

const Properties = (({labels, dataset}) => (
    <div className="row">
        <div className="col-12 col-sm-6 col-md-3">
            <dl>
                <dt>{getString("s.topic")}</dt>
                {labeledLinkEntitiesAsDd(labels, dataset.themes)}
            </dl>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
            <dl>
                <dt>{getString("s.spatial")}</dt>
                {labeledLinkEntitiesAsDd(labels, dataset.spatial)}
                <dt>{getString("s.temporal")}</dt>
                {temporal(dataset.temporal)}
            </dl>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
            <dl>
                <dt>{getString("s.documentation")}</dt>
                {documentation(dataset.documentation)}
                <dt>{getString("s.contact_point")}</dt>
                {contactPoints(labels, dataset.contactPoints)}
            </dl>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
            <dl>
                <dt>{getString("s.frequency")}</dt>
                {labeledLinkEntitiesAsDd(labels, dataset.frequency)}
            </dl>
        </div>
    </div>
));


function labeledLinkEntitiesAsDd(labels, entities) {
    if (entities === undefined) {
        return (
            <dd>
                <span className="badge badge-warning">N/A</span>
            </dd>
        )
    }
    if (!Array.isArray(entities)) {
        entities = [entities];
    }
    return entities.map((entity) => (
        <dd key={entity["@id"]}>
            <a href={entity["@id"]} rel="nofollow">
                {selectLabel(labels, entity)}
            </a>
            <br/>
        </dd>
    ));
}

function documentation(entities) {
    if (entities === undefined || entities.length === 0) {
        return (
            <dd>
                <span className="badge badge-warning">N/A</span>
            </dd>
        )
    }
    if (!Array.isArray(entities)) {
        entities = [entities];
    }
    const label = getString("s.download");
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
    if (temporal === undefined) {
        return (
            <dd>
                <span className="badge badge-warning">N/A</span>
            </dd>
        );
    }
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
    let label = selectLabel(labels, contactPoint.iri);
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
