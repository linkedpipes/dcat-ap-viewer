import React from "react";
import {getString} from "@/app-services/strings";
import {selectLabel, selectLabelNoIri} from "@/app-services/labels/index";

export default class Distribution extends React.PureComponent {
    render() {
        const {labels, distribution, isLoading} = this.props;

        if (isLoading) {
            // TODO Add loading indicator !!
            return null;
        }

        const title = selectLabelNoIri(labels, distribution);

        return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                <div className="card" style={{"height": "100%"}}>
                    <div className="card-body">
                        {title === undefined ?
                            <span className="sr-only">
                            {getString("unnamed_distribution")}
                            </span>
                            :
                            <h5 className="card-title">
                                {title}
                            </h5>
                        }
                        {dataFormatItem(labels, distribution)}
                    </div>
                    <ul className="list-group list-group-flush">
                        {downloadListItem(distribution)}
                        {schemaListItem(distribution)}
                        {licenseListItem(distribution)}
                    </ul>
                </div>
            </div>
        )
    }
}

function isEmpty(value) {
    return value === undefined || value.length === 0;
}

function dataFormatItem(labels, distribution) {
    const formatLabel = selectLabel(labels, distribution.format);
    const mediaType = selectLabel(labels, distribution.mediaType);
    let label;
    if (formatLabel === undefined && mediaType === undefined) {
        return null;
    } else if (formatLabel === undefined) {
        label = mediaType;
    } else if (mediaType === undefined) {
        label = formatLabel;
    } else {
        label = formatLabel + ", " + mediaType;
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
            <a href={downloadUrl} className="card-link">
                {getString("download")}
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
                {getString("schema")}
            </a>
        </li>
    )
}

function licenseListItem(distribution) {
    if (distribution.license === undefined) {
        return null;
    }
    return (
        <li className="list-group-item">
            <a href={distribution.license}
               className="card-link">
                {getString("licence")}
            </a>
        </li>
    )
}
