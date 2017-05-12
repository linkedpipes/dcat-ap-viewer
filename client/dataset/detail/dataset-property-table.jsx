import React from "react";
import {Table} from "reactstrap";

const UrlRow = ({label, value}) => {
    if (value === undefined) {
        return null;
    }
    if (value.length === 0) {
        return null;
    }
    return (
        <tr>
            <td>{label}</td>
            <td>
                <a href={value}>{value}</a>
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
            <UrlRow label="Kontaktní bod" value={dataset.contactPoint}/>
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
            <UrlRow label="Časové pokrytí" value={dataset.temporal}/>
            <ValueRow label="Typ" value={dataset.type}/>
            <ValueRow label="Verze" value={dataset.version}/>
            <ValueRow label="Poznámka k verzi" value={dataset.versionNotes}/>
        </tbody>
    </Table>
);

export default DatasetPropertyTable;