import React from "react";
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import {
  selectT,
  selectTUrl,
  selectTLabel,
  fetchLabels,
  ELEMENT_PUBLISHER_LIST,
  register,
} from "../../../../client/app/component-api";
import {formatNumber} from "../../utils";
import PublisherListItem from "./publisher-list-item";
import withStatus from "../../user-iterface/status";

class PublisherList extends React.PureComponent {

  render() {
    const {publishers, t, tUrl, tLabel, fetchLabels} = this.props;
    return (
      <div className="container p-3">
        <h4>
          {formatNumber(publishers.length)}&nbsp;{t("publishers_found")}
        </h4>
        <hr/>
        <div className="row">
          {publishers.map((publisher) => (
            <PublisherListItem
              key={publisher.iri}
              publisher={publisher}
              t={t}
              tUrl={tUrl}
              tLabel={tLabel}
              fetchLabels={fetchLabels}/>
          ))}
        </div>
      </div>
    );
  }
}

PublisherList.propTypes = {
  "publishers": PropTypes.array.isRequired,
  "t": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
};

register({
  "name": ELEMENT_PUBLISHER_LIST,
  "element": connect((state) => ({
    "t": selectT(state),
    "tUrl": selectTUrl(state),
    "tLabel": selectTLabel(state),
  }), (dispatch) => ({
    "fetchLabels": (iris) => dispatch(fetchLabels(iris)),
  }))(withStatus(PublisherList)),
});
