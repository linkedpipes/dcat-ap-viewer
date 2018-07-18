import React from "react";
import Paginator from "app-ui/paginator";
import {getString} from "app/strings";
import {DistributionContainer} from "./distribution-container";
import {selectLabel, selectLabelNoIri} from "app-services/labels/index";

export default class DistributionList extends React.PureComponent {
    render() {
        const {distributions} = this.props;
        if (distributions.length === 0) {
            return null;
        }
        const {recordsCount, page, pageSize, setPage, setPageSize} = this.props;
        return (
            <div>
                <div className="row">
                    {distributions.map((iri) => (
                        <DistributionContainer
                            key={iri}
                            iri={iri}
                            component={Distribution}/>
                    ))}
                </div>
                <Paginator
                    recordsCount={recordsCount}
                    pageIndex={page}
                    pageSize={pageSize}
                    onIndexChange={setPage}
                    onSizeChange={setPageSize}
                    sizes={[1, 4, 16, 32]}
                />
            </div>
        );
    }
}

class Distribution extends React.PureComponent {
    render() {
        const {labels, distribution, isLoading} = this.props;

        if (isLoading) {
            // TODO Add loading indicator !!
            return null;
        }

        let title = selectLabelNoIri(labels, distribution);

        let formatLabel = undefined;
        if (distribution.format !== undefined) {
            formatLabel = selectLabel(labels, distribution.format);
        }

        return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                <div className="card" style={{"height": "100%"}}>
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
                        {formatLabel &&
                        <h6 className="card-subtitle mb-2 text-muted">
                            {formatLabel}
                        </h6>
                        }
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

function licenseListItem(distribution) {
    if (distribution.license === undefined) {
        return null;
    }
    return (
        <li className="list-group-item">
            <a href={distribution.license}
               className="card-link">
                {getString("s.licence")}
            </a>
        </li>
    )
}
