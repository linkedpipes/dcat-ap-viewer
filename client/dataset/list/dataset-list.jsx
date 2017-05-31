import React from "react";
import {Link} from "react-router";
import TagLine from "../../components/tag-line";
import {
    getUrl,
    DATASET_DETAIL_URL,
    DATASET_QUERY,
    DATASET_LIST_URL,
    PUBLISHER_QUERY
} from "../../application/navigation";

const DatasetListItem = ({value, showPublisher}) => {
    const datasetUrl = getUrl(DATASET_DETAIL_URL, {
        [DATASET_QUERY]: value.iri
    });
    const publisherUrl = getUrl(DATASET_LIST_URL, {
        [PUBLISHER_QUERY]: value.publisher
    });
    return (
        <div >
            <Link to={datasetUrl}>
                <h4>{value.title}</h4>
            </Link>
            {showPublisher &&
            <Link to={publisherUrl}>{value.publisher}</Link>
            }
            <p style={{
                "overflow": "hidden",
                "display": "-webkit-box",
                "WebkitLineClamp": "3",
                "WebkitBoxOrient": "vertical"
            }}>
                {value.description}
            </p>
            <TagLine values={value.format} size={0.7}/>
            <hr/>
        </div>
    )
};

const DatasetList = ({values, showPublisher}) => {
    return (
        <div>
            <hr/>
            {values.map((value) => (
                <DatasetListItem
                    key={value.id}
                    value={value}
                    showPublisher={showPublisher}/>
            ))}
        </div>
    )
};

export default DatasetList;
