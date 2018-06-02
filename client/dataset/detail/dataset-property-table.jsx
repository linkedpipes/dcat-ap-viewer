import React from "react";
import {Table} from "reactstrap";
import {getString} from "app/strings";
import {selectLabel} from "app-services/labels";

// TODO Extract components and add property specification.

// TODO Add component that test for empty value and only provide value as children.
const Temporal = ({label, value}) => {
    if (value === undefined) {
        return null;
    }
    let valueNode;
    if (value.startDate === undefined) {
        if (value.endDate === undefined) {
            valueNode = (
                <a href={value.iri} rel="nofollow">{value.iri}</a>
            );
        } else {
            valueNode = " - " + updateDate(value.endDate);
        }
    } else {
        if (value.endDate === undefined) {
            valueNode = updateDate(value.startDate) + " - ";
        } else {
            valueNode = updateDate(value.startDate) + " - " +
                updateDate(value.endDate);
        }
    }
    return (
        <tr>
            <td>{getString(label)}</td>
            <td>{valueNode}</td>
        </tr>
    )
};

// TODO Add better date handling, the format is YYYY-MM-DD+02:00 or YYYY-MM-DD
function updateDate(value) {
    const plusIndex = value.indexOf("+");
    if (plusIndex === -1) {
        return value;
    } else {
        return value.substr(0, value.indexOf("+"));
    }
}

const ContactPoint = ({labels, value}) => {
    if (typeof value === "object") {
        let label = selectLabel(labels, value.iri);
        let email = getEmail(value);
        // TODO Use more readable approach.
        if (labelIsEmpty(label)) {
            if (email === undefined) {
                label = value.iri;
            } else {
                label = email;
            }
        }
        let iri;
        if (email === undefined) {
            iri = value.iri;
        } else {
            iri = "mailto:" + value.email;
        }
        //
        return (
            <a href={iri} rel="nofollow">{label}</a>
        );
    } else {
        // TODO Check if this branch is ever needed.
        return (
            <a href={value} rel="nofollow">{selectLabel(labels, value)}</a>
        );
    }
};

// TODO Move to utility functions?
function labelIsEmpty(label) {
    return label === undefined || Object.keys(label).length === 0;
}

function getEmail(value) {
    if (value.email === undefined || value.email.length === 0) {
        return undefined;
    } else {
        return value.email[0];
    }
}


// TODO Check usage.
const ContactPoints = ({labels, label, value}) => {
    if (value === undefined) {
        return null;
    }
    let valuesAsArray;
    if (value.constructor === Array) {
        valuesAsArray = value;
    } else {
        valuesAsArray = [value];
    }
    if (valuesAsArray.length === 0) {
        return null;
    }
    return (
        <tr>
            <td>{getString(label)}</td>
            <td>
                {
                    valuesAsArray.map((item) => (
                        <ContactPoint labels={labels} key={item} value={item}/>
                    ))
                }
            </td>
        </tr>
    )
};

const UrlValue = ({value}) => {
    if (typeof value === "object") {
        let label = value.label;
        if (label === undefined || label.length === 0) {
            label = value.iri;
        }
        return (
            <a href={value.iri} rel="nofollow">{label}</a>
        );
    } else {
        return (
            <a href={value} rel="nofollow">{value}</a>
        );
    }
};

const UrlRow = ({label, value}) => {
    if (value === undefined) {
        return null;
    }
    let valuesAsArray;
    if (value.constructor === Array) {
        valuesAsArray = value;
    } else {
        valuesAsArray = [value];
    }
    if (valuesAsArray.length === 0) {
        return null;
    }
    return (
        <tr>
            <td>{getString(label)}</td>
            <td>
                {
                    valuesAsArray.map((item) => (
                        <UrlValue key={item} value={item}/>
                    ))
                }
            </td>
        </tr>
    )
};

const LabeledUrlRow = ({labels, label, value}) => {
    if (value === undefined) {
        return null;
    }
    let valuesAsArray;
    if (value.constructor === Array) {
        valuesAsArray = value;
    } else {
        valuesAsArray = [value];
    }
    if (valuesAsArray.length === 0) {
        return null;
    }
    return (
        <tr>
            <td>{getString(label)}</td>
            <td>
                {
                    valuesAsArray.map((item) => (
                        <span key={item["@id"]}>
                            <LabeledUrlValue labels={labels} value={item}/>
                            {valuesAsArray.length > 0 && <br/>}
                        </span>
                    ))
                }
            </td>
        </tr>
    )
};

const LabeledUrlValue = ({labels, value}) => {
    return (
        <a href={value["@id"]} rel="nofollow">{selectLabel(labels, value)}</a>
    );
};

const ValueRow = ({label, value}) => {
    if (value === undefined) {
        return null;
    }
    if (value.length === 0) {
        return null;
    }
    return (
        <tr>
            <td>{getString(label)}</td>
            <td>{value}</td>
        </tr>
    )
};

const DatasetPropertyTable = ({labels, dataset}) => (
    <Table>
        <tbody>
        <UrlRow label="s.dataset_iri" value={dataset["@id"]}/>
        <ContactPoints labels={labels} label="s.contact_point"
                       value={dataset.contactPoints}/>
        <LabeledUrlRow labels={labels} label="s.publisher"
                       value={dataset.publisher}/>
        <LabeledUrlRow labels={labels} label="s.topic" value={dataset.themes}/>
        <UrlRow label="s.access_right" value={dataset.accessRights}/>
        <UrlRow label="s.conforms_to" value={dataset.conformsTo}/>
        <UrlRow label="s.documentation" value={dataset.documentation}/>
        <LabeledUrlRow labels={labels} label="s.frequency"
                       value={dataset.frequency}/>
        <UrlRow label="s.has_version" value={dataset.hasVersion}/>
        <UrlRow label="s.is_version_of" value={dataset.isVersionOf}/>
        <UrlRow label="s.identifier" value={dataset.identifier}/>
        <UrlRow label="s.other_identifier" value={dataset.otherIdentifier}/>
        <UrlRow label="s.landing_page" value={dataset.landingPage}/>
        <UrlRow label="s.language" value={dataset.language}/>
        <UrlRow label="s.provenance" value={dataset.provenance}/>
        <UrlRow label="s.relation" value={dataset.relation}/>
        <ValueRow label="s.issued" value={dataset.issued}/>
        <ValueRow label="s.modified" value={dataset.modified}/>
        <UrlRow label="s.sample" value={dataset.sample}/>
        <UrlRow label="s.source" value={dataset.source}/>
        <LabeledUrlRow labels={labels} label="s.spatial"
                       value={dataset.spatial}/>
        <Temporal label="s.temporal" value={dataset.temporal}/>
        <ValueRow label="s.type" value={dataset.type}/>
        <ValueRow label="s.version" value={dataset.version}/>
        <ValueRow label="s.version_notes" value={dataset.versionNotes}/>
        {/*<UrlRow label="s.catalog_source" value={dataset.catalogSource}/>*/}
        </tbody>
    </Table>
);

export default DatasetPropertyTable;