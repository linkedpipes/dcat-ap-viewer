import React from "react";
import {Table} from "reactstrap";

// TODO Add component that test for empty value and only provide value as children.
const Temporal = ({label, value}) => {
    if (value === undefined) {
        return null;
    }
    let valueNode;
    if (value.startDate === undefined) {
        if (value.endDate === undefined) {
            valueNode = (
                <a href={value.iri}>{value.iri}</a>
            );
        } else {
            valueNode = " - " + updateDate(value.endDate);
        }
    } else {
        if (value.endDate === undefined) {
            valueNode = updateDate(value.endDate) + " - ";
        } else {
            valueNode = updateDate(value.startDate) + " - " +
                updateDate(value.endDate);
        }
    }
    return (
        <tr>
            <td>{label}</td>
            <td>{valueNode}</td>
        </tr>
    )
};

// TODO Add better date handling, the format is YYYY-MM-DD+02:00
function updateDate(value) {
    return value.substr(0, value.indexOf("+"));
}

const ContactPoint = ({value}) => {
    if (typeof value === "object") {
        let label = value.label;
        if (label === undefined || label.length === 0) {
            label = value.iri;
        }
        let iri;
        if (value.email === undefined || value.email.length === 0) {
            iri = value.iri;
        } else {
            iri = "mailto:" + value.email;
        }
        return (
            <a href={iri}>{label}</a>
        );
    } else {
        return (
            <a href={value}>{value}</a>
        );
    }
};

const ContactPoints = ({label, value}) => {
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
            <td>{label}</td>
            <td>
                {
                    valuesAsArray.map((item) => (
                        <ContactPoint key={item} value={item} />
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
            <a href={value.iri}>{label}</a>
        );
    } else {
        return (
            <a href={value}>{value}</a>
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
            <td>{label}</td>
            <td>
                {
                    valuesAsArray.map((item) => (
                        <UrlValue key={item} value={item} />
                    ))
                }
            </td>
        </tr>
    )
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
            <td>{label}</td>
            <td>{value}</td>
        </tr>
    )
};

const DatasetPropertyTable = ({dataset}) => (
    <Table>
        <thead>
        <tr>
            <th>Pole</th>
            <th>Hodnota</th>
        </tr>
        </thead>
        <tbody>
        <ContactPoints label="Kontaktní bod" value={dataset.contactPoint}/>
        <UrlRow label="Poskytovatel" value={dataset.publisher}/>
        <UrlRow label="Téma" value={dataset.theme}/>
        <UrlRow label="Přístupová práva" value={dataset.accessRights}/>
        <UrlRow label="Splňuje" value={dataset.conformsTo}/>
        <UrlRow label="Dokumentace" value={dataset.documentation}/>
        <UrlRow label="Frekvence" value={dataset.frequency}/>
        <UrlRow label="Má verzi" value={dataset.hasVersion}/>
        <UrlRow label="Je verzí" value={dataset.isVersionOf}/>
        <UrlRow label="Identifikátor" value={dataset.identifier}/>
        <UrlRow label="Jiný identifikátor" value={dataset.otherIdentifier}/>
        <UrlRow label="Vstupní stránka" value={dataset.landingPage}/>
        <UrlRow label="Jazyk" value={dataset.language}/>
        <UrlRow label="Původ" value={dataset.provenance}/>
        <UrlRow label="Související zdroj" value={dataset.relation}/>
        <ValueRow label="Datum vydání" value={dataset.issued}/>
        <ValueRow label="Datum aktualizace" value={dataset.modified}/>
        <UrlRow label="Vzorek" value={dataset.sample}/>
        <UrlRow label="Zdroj" value={dataset.source}/>
        <UrlRow label="Územní pokrytí" value={dataset.spatial}/>
        <Temporal label="Časové pokrytí" value={dataset.temporal}/>
        <ValueRow label="Typ" value={dataset.type}/>
        <ValueRow label="Verze" value={dataset.version}/>
        <ValueRow label="Poznámka k verzi" value={dataset.versionNotes}/>
        </tbody>
    </Table>
);

export default DatasetPropertyTable;