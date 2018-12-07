import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {onUnMount, onMount, fetch} from "./semantic-related-actions";
import {isDataReady, isFetching} from "@/app-services/http-request";
import {selectLabel, labelsSelector} from "@/app-services/labels/"
import {getString} from "@/app-services/strings";
import {statusSelector, relatedSelector} from "./semantic-related-reducer";
import {
    getUrl,
    DATASET_DETAIL_URL,
    DATASET_QUERY,
} from "@/app/navigation";

class _SemanticDatasetRelated extends React.Component {

    componentWillMount() {
        this.props.onMount();
        this.props.fetch(this.props.dataset);
    }

    render() {
        if (isFetching(this.props.status)) {
            return (
                <div className="container">
                </div>
            )
        } else if (isDataReady(this.props.status)) {
            return (
                <div>
                    {getString("related")}
                    <ul>
                        {this.props.related.map((item) => (
                            <li key={item["@id"]}>
                                <Link to={getDatasetDetailUrl(item["@id"])}>
                                    {selectLabel(this.props.labels, item["@id"])}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <hr/>
                </div>
            )
        } else {
            return null;
        }
    }

    componentWillUnmount() {
        this.props.onUnMount();
    }

}

function getDatasetDetailUrl(dataset) {
    return getUrl(DATASET_DETAIL_URL, {[DATASET_QUERY]: dataset});
}

const mapStateToProps = (state, ownProps) => ({
    "status": statusSelector(state),
    "related": relatedSelector(state),
    "labels": labelsSelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "onMount": () => dispatch(onMount()),
    "onUnMount": () => dispatch(onUnMount()),
    "fetch": (dataset) => dispatch(fetch(dataset))
});

const SemanticDatasetRelated = connect(
    mapStateToProps,
    mapDispatchToProps
)(_SemanticDatasetRelated);

SemanticDatasetRelated.propTypes = {
    "dataset": PropTypes.string.isRequired
};

export default SemanticDatasetRelated;


