import React from "react";
import {getString} from "app/strings";
import {selectLabel, selectLabelNoIri} from "app-services/labels/index";

export default class Distribution extends React.PureComponent {
    render() {
        const {labels, distribution, isLoading} = this.props;

        if (isLoading) {
            // TODO Add loading indicator !!
            return null;
        }

        const title = selectLabelNoIri(labels, distribution);

        return (
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                <div className="card p-2">
                    <div className="card-body">
                        {title === undefined ?
                            <span className="sr-only">
                            {getString("s.unnamed_distribution")}
                            </span>
                            :
                            <h5 className="card-title">
                                {title}
                            </h5>
                        }
                        {dataFormatItem(labels, distribution)}
                    </div>
                    <div className="row">
                        <div className="col-6 pr-1">
                            {licenseColumn(distribution)}
                        </div>
                        <div className="col-6 pl-1">
                            {accessColumn(labels, distribution)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function isEmpty(value) {
    return value === undefined || value.length === 0;
}

function licenseColumn(distribution) {
    if (distribution.legacyTermsOfUse) {
        return legacyLicenseColumn(distribution);
    }
    return (
        <div className="card">
            <h6 className="card-title text-muted pl-2 pt-2">
                {getString('s.distribution_license')}
            </h6>
            <ul className="list-group list-group-flush">
                {authorship(distribution)}
                {databaseAuthorship(distribution)}
                {protectedDatabaseAuthorship(distribution)}
                {personalData(distribution)}
            </ul>
        </div>
    )
}

function legacyLicenseColumn(distribution) {
    if (distribution.license === undefined) {
        return (
            <div className="card">
                <h6 className="card-title text-muted pl-2 pt-2">
                    {getString("s.distribution_license")}
                </h6>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        {getString("s.license_missing")}
                    </li>
                </ul>
            </div>
        )
    }
    return (
        <div className="card">
            <div className="card-title text-muted pl-2 pt-2">
                {getString("s.distribution_license")}
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <a href={distribution.license}
                       ref="nofollow"
                       target="_blank">
                        {getString("s.licence")}
                    </a>
                </li>
            </ul>
        </div>
    )
}

function authorship(distribution) {
    switch (distribution.authorship) {
        case "multi":
            return (
                <li className="list-group-item">
                    <div>
                        {getString("license_author_multi")}
                    </div>
                    <div className="label">
                        {getString("license_author_type")}
                    </div>
                </li>
            );
        case "no":
            return (
                <li className="list-group-item">
                    <div>
                        {getString("license_author_no")}
                    </div>
                    <div className="label">
                        {getString("license_author_type")}
                    </div>
                </li>
            );
        case "ccBy":
            return (
                <li className="list-group-item">
                    <div>
                        {getString("license_author_ccBy")}
                    </div>
                    <div className="label">
                        {distribution.author}
                    </div>
                </li>
            );
        default:
            return (
                <li className="list-group-item">
                    <div>
                        {getString("license_author_custom")}
                    </div>
                    <div className="label">
                        <a href={distribution.authorship}
                           rel="nofollow"
                           target="_blank">
                            {distribution.authorship}
                        </a>
                    </div>
                </li>
            );
    }
}

function databaseAuthorship(distribution) {
    switch (distribution.databaseAuthorship) {
        case "no":
            return (
                <li className="list-group-item">
                    <div>
                        {getString("license_author_no")}
                    </div>
                    <div className="label">
                        {getString("license_db_type")}
                    </div>
                </li>
            );
        case "ccBy":
            return (
                <li className="list-group-item">
                    <div>
                        {getString("license_author_ccBy")}
                    </div>
                    <div className="label">
                        {distribution.databaseAuthor}
                    </div>
                </li>
            );
        default:
            return (
                <li className="list-group-item">
                    <div>
                        {getString("license_author_custom")}
                    </div>
                    <div className="label">
                        <a href={distribution.databaseAuthorship}
                           rel="nofollow"
                           target="_blank">
                            {distribution.databaseAuthorship}
                        </a>
                    </div>
                </li>
            );
    }
}

function protectedDatabaseAuthorship(distribution) {
    switch (distribution.protectedDatabase) {
        case "no":
            return (
                <li className="list-group-item">
                    <div>
                        {getString("license_author_no")}
                    </div>
                    <div className="label">
                        {getString("license_specialdb_type")}
                    </div>
                </li>
            );
        case "cc0":
            return (
                <li className="list-group-item">
                    <div>
                        {getString("license_author_ccBy")}
                    </div>
                    <div className="label">
                        {getString("license_specialdb_type")}
                    </div>
                </li>
            );
        default:
            return (
                <li className="list-group-item">
                    <div>
                        {getString("license_author_custom")}
                    </div>
                    <div className="label">
                        <a href={distribution.protectedDatabase}
                           rel="nofollow"
                           target="_blank">
                            {distribution.protectedDatabase}
                        </a>
                    </div>
                </li>
            );
    }
}

function personalData(distribution) {
    if (distribution.personalData === "no") {
        return (
            <li className="list-group-item">
                <div>
                    {getString("license_personal_no")}
                </div>
                <div className="label">
                    {getString("license_personal_type")}
                </div>
            </li>
        );
    } else {
        return (
            <li className="list-group-item">
                <div>
                    {getString("license_personal_yes")}
                </div>
                <div className="label">
                    {getString("license_personal_type")}
                </div>
            </li>
        );
    }
}

function accessColumn(labels, distribution) {
    return (
        <div className="card">
            <h6 className="card-title text-muted pl-2 pt-2">
                {getString("s.distribution_access")}
            </h6>
            <ul className="list-group list-group-flush">
                {downloadListItem(distribution)}
                {schemaListItem(distribution)}
                {mediaTypeItem(labels, distribution)}
            </ul>
        </div>
    );
}

function dataFormatItem(labels, distribution) {
    const label = selectLabel(labels, distribution.format);
    if (label === undefined) {
        return null;
    }
    return (
        <h6 className="card-subtitle mb-2 text-muted">
            {label}
        </h6>
    )
}

function downloadListItem(distribution) {
    let downloadUrl = undefined;
    if (isEmpty(distribution.downloadURL)) {
        if (isEmpty(distribution.accessURL)) {
            console.error("Invalid data, missing accessURL", distribution);
        } else {
            downloadUrl = distribution.accessURL[0];
        }
    } else {
        downloadUrl = distribution.downloadURL[0];
    }

    if (downloadUrl === undefined) {
        return null;
    }

    return (
        <li className="list-group-item">
            <a href={downloadUrl}
               className="card-link"
               rel="nofollow"
               target="_blank">
                {getString("s.download")}
            </a>
        </li>
    )
}

function schemaListItem(distribution) {
    if (distribution.conformsTo.length === 0) {
        return null;
    }
    return (
        <li className="list-group-item">
            <a href={distribution.conformsTo[0]}
               className="card-link">
                {getString("s.schema")}
            </a>
        </li>
    )
}

function mediaTypeItem(labels, distribution) {
    if (distribution.mediaType === undefined) {
        return null;
    }
    return (
        <li className="list-group-item">
            {selectLabelNoIri(labels, distribution.mediaType)}
            <a href={distribution.mediaType["@id"]}
               rel="nofollow"
               target="_blank">
                {linkIcon()}
            </a>
        </li>
    )
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

