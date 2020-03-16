import React from "react";
import {PropTypes} from "prop-types";
import TagCloud from "../../user-iterface/tag-cloud";
import {Button} from "reactstrap";

const DEFAULT_SIZE = 32;

const INCREASE_BY_SIZE = 16;

export default class FacetView extends React.PureComponent {

  componentDidMount() {
    this.props.fetchMore(DEFAULT_SIZE);
  }

  render() {
    const renderer =
      (tag, size) => tagRenderer(this.props.itemToLabel, tag, size);

    const showMore = () => this.props.fetchMore(
      this.props.items.length + INCREASE_BY_SIZE);
    const showAll = () => this.props.fetchMore(this.props.count);

    return (
      <div
        className="col col-sm-12 col-md-9 offset-md-1"
        style={{"textAlign": "center", "display": "block"}}
      >
        <TagCloud
          tags={this.props.items}
          renderFunction={renderer}
          onClick={this.props.toggleFacet}
        />
        {!this.props.allFetched && (
          <div>
            <Button
              onClick={showMore}
              style={{"float": "left"}}
            >
              {this.props.t("facet.show_more")}
            </Button>
            <Button
              onClick={showAll}
              color="warning"
              style={{"float": "right"}}
            >
              {this.props.t("facet.show_all")}
            </Button>
          </div>
        )}
      </div>
    )
  }

}

FacetView.propTypes = {
  "t": PropTypes.func.isRequired,
  "itemToLabel": PropTypes.func.isRequired,
  "items": PropTypes.arrayOf(PropTypes.exact({
    "iri": PropTypes.string.isRequired,
    "code": PropTypes.string.isRequired,
    "count": PropTypes.number.isRequired,
    "color": PropTypes.string.isRequired,
  })).isRequired,
  "count": PropTypes.number.isRequired,
  "allFetched": PropTypes.bool.isRequired,
  "toggleFacet": PropTypes.func.isRequired,
  "fetchMore": PropTypes.func.isRequired,
};

function tagRenderer(itemToLabel, tag, size) {
  const style = {
    "marginLeft": "1rem",
    "verticalAlign": "middle",
    "display": "inline-block",
    "cursor": "pointer",
  };

  // If all elements have the same count, then size is NaN.
  if (isNaN(size)) {
    size = 32;
  }

  return (
    <span className="tag-cloud-tag" style={style} key={tag.iri}>
      <span style={{"color": tag.color, "fontSize": size}}>
        {itemToLabel(tag)} ({tag.count})
      </span>
    </span>
  )
}