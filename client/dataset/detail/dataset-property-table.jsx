import React from "react";
import {Table} from "reactstrap";

const PropertyRow = ({label, value}) => {
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
            <PropertyRow label="Kontaktní bod" value={dataset.contactPoint}/>
            <PropertyRow label="Poskytovatel" value={dataset.publisher}/>
            <PropertyRow label="Téma" value={dataset.theme}/>
            <PropertyRow label="Přístupová práva" value={dataset.accessRights}/>
            <PropertyRow label="Splňuje" value={dataset.conformsTo}/>
            <PropertyRow label="Dokumentace" value={dataset.documentation}/>
            <PropertyRow label="Frekvence" value={dataset.frequency}/>
            <PropertyRow label="Má verzi" value={dataset.hasVersion}/>
            <PropertyRow label="Je verzí" value={dataset.isVersionOf}/>
            <PropertyRow label="Identifikátor" value={dataset.identifier}/>
            <PropertyRow label="Jiný identifikátor" value={dataset.otherIdentifier}/>
            <PropertyRow label="Vstupní stránka" value={dataset.landingPage}/>
            <PropertyRow label="Jazyk" value={dataset.language}/>
            <PropertyRow label="Původ" value={dataset.provenance}/>
            <PropertyRow label="Související zdroj" value={dataset.relation}/>
            <PropertyRow label="Datum vydání" value={dataset.issued}/>
            <PropertyRow label="Datum aktualizace" value={dataset.modified}/>
            <PropertyRow label="Vzorek" value={dataset.sample}/>
            <PropertyRow label="Zdroj" value={dataset.source}/>
            <PropertyRow label="Územní pokrytí" value={dataset.spatial}/>
            <PropertyRow label="Časové pokrytí" value={dataset.temporal}/>
            <PropertyRow label="Typ" value={dataset.type}/>
            <PropertyRow label="Verze" value={dataset.version}/>
            <PropertyRow label="Poznámka k verzi" value={dataset.AAA}/>
            <PropertyRow label="" value={dataset.versionNotes}/>
        </tbody>
    </Table>
);

export default DatasetPropertyTable;