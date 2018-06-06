import React from "react";
import {PropTypes} from "prop-types";
import {DATASET_LIST_URL, getUrl, PUBLISHER_QUERY} from "../../app/navigation";
import {getString} from "../../app/strings";
import {formatNumber} from "../../app-services/formats";
import {Link} from "react-router-dom";

export const PublisherList = ({publishers}) => {
    return (
        <div className="container p-3">
            <h4>
                {formatNumber(publishers.length)}
                &nbsp;{getString("s.publishers_found")}
            </h4>
            <div>
                <hr/>
                {publishers.map((publisher) => (
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
    let datasetCountLabel = getDatasetCountLabel(count);
    return (
        <div>
            <Link to={getUrl(DATASET_LIST_URL, {[PUBLISHER_QUERY]: iri})}>
                <h4>{label}</h4>
            </Link>
            <p>{datasetCountLabel}</p>
            <hr/>
        </div>
    );
};

function getDatasetCountLabel(count) {
    if (count === 1) {
        return getString("s.one_dataset");
    } else if (count <= 4) {
        return count + getString("s.two_three_datasets");
    } else {
        return formatNumber(count) + getString("s.many_datasets");
    }
}


OrganisationListItem.propTypes = {
    "iri": PropTypes.string.isRequired,
    "label": PropTypes.string.isRequired,
    "count": PropTypes.number.isRequired
};
