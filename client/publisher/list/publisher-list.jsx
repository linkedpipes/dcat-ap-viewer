import React from "react";
import {PropTypes} from "prop-types";
import {DATASET_LIST_URL, getUrl, PUBLISHER_QUERY} from "@/app/navigation";
import {getString} from "@/app-services/strings";
import {formatNumber} from "@/app-services/formats";
import {Link} from "react-router-dom";

export const PublisherList = ({publishers}) => {
    return (
        <div className="container p-3">
            <h4>
                {formatNumber(publishers.length)}
                &nbsp;{getString("publishers_found")}
            </h4>
            <hr/>
            <div className="row">
                {publishers
                    .filter((publisher) => publisher.count)
                    .map((publisher) => (
                    <OrganisationListItem
                        key={publisher["@id"]}
                        iri={publisher["@id"]}
                        label={publisher.label}
                        count={publisher.count}/>
                ))}
            </div>
        </div>
    )
};

PublisherList.propTypes = {
    "publishers": PropTypes.array.isRequired
};

const OrganisationListItem = ({iri, label, count}) => {
    const url = getUrl(DATASET_LIST_URL, {[PUBLISHER_QUERY]: iri});
    const datasetCountLabel = getDatasetCountLabel(count);
    return (
        <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
            <div className="card p-2">
                <div className="card-body px-2">
                    <h5 className="card-title">
                        <Link to={url}>
                            <h4>{label}</h4>
                        </Link>
                    </h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        {datasetCountLabel}
                    </li>
                </ul>
            </div>
        </div>
    );
};

function getDatasetCountLabel(count) {
    if (count === undefined || count === null) {
        return "";
    } else if (count === 1) {
        return getString("one_dataset");
    } else if (count <= 4) {
        return count + getString("two_three_datasets");
    } else {
        return formatNumber(count) + getString("many_datasets");
    }
}

OrganisationListItem.propTypes = {
    "iri": PropTypes.string.isRequired,
    "label": PropTypes.string.isRequired,
    "count": PropTypes.number.isRequired
};
