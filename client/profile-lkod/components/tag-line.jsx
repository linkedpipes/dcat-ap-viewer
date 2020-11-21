import React from "react";
import {PropTypes} from "prop-types";
import {Badge} from "reactstrap";

export default function TagLine({items, size = 1, labelFunction}) {
  if (items === undefined) {
    return null;
  }
  return (
    <div style={{"marginTop": "0.2em"}}>
      {items.map((item) => (
        <Badge
          style={{
            "marginLeft": "1em",
            "marginBottom": "0.5em",
            "fontSize": size + "em",
          }}
          color="info"
          pill
          key={item}
        >
          {labelFunction(item)}
        </Badge>
      ))}
    </div>
  );
}

TagLine.propTypes = {
  "items": PropTypes.arrayOf(PropTypes.string).isRequired,
  "size": PropTypes.number,
  "labelFunction": PropTypes.func.isRequired,
};
