import React from "react";
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import {
  selectT,
  selectTUrl,
  selectTLabel,
  fetchLabels,
  ELEMENT_KEYWORD_LIST,
  URL_DATASET_LIST,
  register,
} from "../../../../client/app/component-api";
import TagCloud from "../../user-iterface/tag-cloud";
import {Link} from "react-router-dom";
import withStatus from "../../user-iterface/status";

class KeywordList extends React.PureComponent {

  componentDidMount() {
    this.props.fetchLabels(this.props.keywords.map(item => item.iri))
  }

  render() {
    const {t, tUrl, tLabel, keywords} = this.props;
    const tags = keywords.map(item => {
      const label = tLabel(item.iri);
      return {
        "key": item.iri,
        "label": label,
        "count": item.usedByPublisherCount,
        "url": tUrl(URL_DATASET_LIST, {"keyword": label}),
      }
    });
    return (
      <div className="container p-3">
        <h4>
          {t("keywords")}
        </h4>
        <hr/>
        <TagCloud tags={tags} renderFunction={renderTag}/>
      </div>
    )
  }
}

KeywordList.propTypes = {
  "t": PropTypes.func.isRequired,
  "keywords": PropTypes.array.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
};

function renderTag(tag, size, color) {
  const style = {
    "marginLeft": "1rem",
    "verticalAlign": "middle",
    "display": "inline-block",
  };
  //
  return (
    <span className="tag-cloud-tag" style={style} key={tag.key}>
      <Link to={tag.url} className="tag-cloud-tag">
        <span style={{"color": color, "fontSize": size}}>
          {tag.label}
        </span>
      </Link>
    </span>
  )
}

register({
  "name": ELEMENT_KEYWORD_LIST,
  "element": connect((state) => ({
    "t": selectT(state),
    "tUrl": selectTUrl(state),
    "tLabel": selectTLabel(state),
  }), (dispatch) => ({
    "fetchLabels": (iris) => dispatch(fetchLabels(iris)),
  }))(withStatus(KeywordList)),
});

