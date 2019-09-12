import React from "react";
import {formatNumber} from "@/app-services/formats";
import {getString} from "@/app-services/strings";
import {Badge} from "reactstrap";
import {connect} from "react-redux";
import {
  datasetsTotalCountSelector,
  querySelector,
} from "../../dataset-list-reducer";
import {PropTypes} from "prop-types";

class _QueryStatus extends React.PureComponent {

  render() {
    const {query, datasetCount} = this.props;
    return (
      <div>
        <h4>
          {formatNumber(datasetCount)} {getString("query.datasets_found")}
          {query.search &&
                    getString("query.with") + ": \"" + query.search + "\""
          }
        </h4>
        <TagLine values={query.publisher}/>
        <TagLine values={query.keyword}/>
        <TagLine values={query.format}/>
      </div>
    );
  }
}

_QueryStatus.propTypes = {
  "query": PropTypes.object.isRequired,
  "datasetCount": PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  "datasetCount": datasetsTotalCountSelector(state),
  "query": querySelector(state),
});

const QueryStatus = connect(mapStateToProps)(_QueryStatus);

export default QueryStatus;

function TagLine({values, size = 1}) {
  if (values === undefined) {
    return null;
  }
  return (
    <div style={{"marginTop": "0.2em"}}>
      {values.map((item) => (
        <Badge
          style={{
            "marginRight": "1em",
            "marginBottom": "0.5em",
            "fontSize": size + "em",
          }}
          color="info"
          pill
          key={item}>
          {item}
        </Badge>
      ))}
    </div>
  );
}

TagLine.propTypes = {
  "values": PropTypes.arrayOf(PropTypes.string).isRequired,
  "size": PropTypes.number,
};

