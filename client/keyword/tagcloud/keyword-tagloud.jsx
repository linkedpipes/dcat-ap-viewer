import React from "react";
import {DATASET_LIST_URL, getUrl, KEYWORDS_QUERY} from "../../app/navigation";
import {Link} from "react-router-dom";
import {TagCloud} from "react-tagcloud";
import {PropTypes} from "prop-types";

// https://www.npmjs.com/package/react-tagcloud
export const KeywordTagCloud = ({tags}) => (
  <div className="container pt-5 pb-4">
    <div className="row">
      <div className="col col-sm-12 col-md-9 offset-md-1"
        style={{"textAlign": "center", "display": "block"}}>
        <TagCloud minSize={20}
          maxSize={52}
          shuffle={false}
          tags={tags}
          colorOptions={{
            "luminosity": "dark",
            "hue": "random",
          }}
          renderer={tagRenderer}/>
      </div>
    </div>
  </div>
);

KeywordTagCloud.propTypes = {
  "tags": PropTypes.arrayOf(PropTypes.object).isRequired,
};

function tagRenderer(tag, size, color) {
  const url = getUrl(DATASET_LIST_URL, {[KEYWORDS_QUERY]: tag.value});
  const style = {
    "marginLeft": "1REM",
    "verticalAlign": "middle",
    "display": "inline-block",
  };
  return (
    <span className="tag-cloud-tag" style={style} key={tag.value}>
      <Link to={url} className="tag-cloud-tag">
        <span style={{"color": color, "fontSize": size}}>
          {tag.value}
        </span>
      </Link>
    </span>
  )
}
