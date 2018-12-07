import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {onUnMount, onMount, fetch} from "./semantic-terms-actions";
import {statusSelector, termsSelector} from "./semantic-terms-reducer";
import {isDataReady, isFetching} from "@/app-services/http-request";
import {selectLabel, labelsSelector} from "@/app-services/labels/"
import {getString} from "@/app-services/strings";

class _SemanticDatasetTerms extends React.Component {

    componentWillMount() {
        this.props.onMount();
        this.props.fetch(this.props.dataset);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataset !== this.props.dataset) {
            this.props.fetch(this.props.dataset);
        }
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
                    {getString("terms")}
                    <ul>
                        {this.props.terms.map((item) => (
                            <li key={item["@id"]}>
                                <a href={item["@id"]} target="_blank">
                                    {selectLabel(this.props.labels, item["@id"])}
                                </a>
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

const mapStateToProps = (state, ownProps) => ({
    "status": statusSelector(state),
    "terms": termsSelector(state),
    "labels": labelsSelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "onMount": () => dispatch(onMount()),
    "onUnMount": () => dispatch(onUnMount()),
    "fetch": (dataset) => dispatch(fetch(dataset))
});

const SemanticDatasetTerms = connect(
    mapStateToProps,
    mapDispatchToProps
)(_SemanticDatasetTerms);

SemanticDatasetTerms.propTypes = {
    "dataset": PropTypes.string.isRequired
};

export default SemanticDatasetTerms;


