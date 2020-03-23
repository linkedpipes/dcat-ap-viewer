import React from "react";
import {TagCloud as ReactTagCloud} from "react-tagcloud";
import {PropTypes} from "prop-types";

// https://www.npmjs.com/package/react-tagcloud
export default function TagCloud(
  {tags, renderFunction, onClick = undefined}) {
  // TODO Can we generate same colors every time?
  return (
    <div
      className="offset-md-1"
      style={{"textAlign": "center", "display": "block"}}
    >
      <ReactTagCloud
        minSize={20}
        maxSize={52}
        shuffle={false}
        tags={tags}
        colorOptions={{"luminosity": "dark", "hue": "random"}}
        renderer={renderFunction}
        onClick={onClick}
      />
    </div>
  );
}

TagCloud.propTypes = {
  "tags": PropTypes.arrayOf(PropTypes.shape({
    "count": PropTypes.number.isRequired,
  })).isRequired,
  "renderFunction": PropTypes.func.isRequired,
  "onClick": PropTypes.func,
};
