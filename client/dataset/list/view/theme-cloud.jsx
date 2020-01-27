import React from "react";
import {connect} from "react-redux";
import {
  selectedThemesSelector,
  queryThemesSelector,
} from "../dataset-list-reducer";
import {THEME_QUERY} from "../../../app/navigation";
import {updateQueryFilters} from "../dataset-list-actions";
import {TagCloud} from "react-tagcloud";
import {labelsSelector, selectLabel} from "../../../app-services/labels";
import {themesMapSelector} from "../../../theme/theme-reducer";
import {PropTypes} from "prop-types";

class _ThemeCloud extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    const renderer = (tag, size) => // tag, size, color
      tagRenderer(this.props.labels, this.props.all, this.props.selected,
        tag, size);

    return (
      <div className="col col-sm-12 col-md-9 offset-md-1"
        style={{"textAlign": "center", "display": "block"}}>
        <br/>
        <TagCloud minSize={20}
          maxSize={52}
          shuffle={false}
          tags={this.props.query}
          renderer={renderer}
          onClick={this.onClick}/>
      </div>
    );
  }

  onClick(tag) {
    this.props.setThemeFacet(tag["@id"], true);
  }

}

function tagRenderer (labels, all, selected, tag, size)  {
  const style = {
    "marginLeft": "1REM",
    "verticalAlign": "middle",
    "display": "inline-block",
    "cursor": "pointer",
  };

  // If all elements have the same count, then size is NaN.
  if (isNaN(size)) {
    size = 32;
  }

  const entry = all[tag["@id"]];

  let color = "black";
  if (entry) {
    color = entry["color"];
  }

  return (
    <span className="tag-cloud-tag" style={style} key={tag["@id"]}>
      <span style={{"color": color, "fontSize": size}}>
        {selectLabel(labels, tag["@id"])}
      </span>
    </span>
  )
}

_ThemeCloud.propTypes = {
  "setThemeFacet": PropTypes.func.isRequired,
  "labels": PropTypes.object.isRequired,
  "all": PropTypes.object.isRequired,
  "query": PropTypes.array.isRequired,
  "selected": PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  "all": themesMapSelector(state),
  "selected": selectedThemesSelector(state),
  "query": queryThemesSelector(state),
  "labels": labelsSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  "setThemeFacet": (value, isActive) => dispatch(updateQueryFilters(
    ownProps.location, THEME_QUERY, value, isActive,
  )),
});

const ThemeCloud = connect(mapStateToProps, mapDispatchToProps)(_ThemeCloud);

export default ThemeCloud;