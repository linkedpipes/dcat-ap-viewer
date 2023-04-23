import React from "react";
import {PropTypes} from "prop-types";
import {Badge} from "reactstrap";

export default function TagLine(props) {
  if (props.items === undefined) {
    return null;
  }
  return (
    <div style={{"marginTop": "0.2em"}}>
      {props.items.map((item) => (
        <Badge
          style={{
            "marginLeft": "1em",
            "marginBottom": "0.5em",
            "fontSize": (props.size ?? 1) + "em",
          }}
          color={props.info ?? "info"}
          className={props.className ?? ""}
          pill
          key={item}
        >
          {props.labelFunction(item)}
        </Badge>
      ))}
    </div>
  );
}

TagLine.propTypes = {
  "items": PropTypes.arrayOf(PropTypes.string).isRequired,
  "labelFunction": PropTypes.func.isRequired,
  "size": PropTypes.number,
  "color": PropTypes.string,
  "className": PropTypes.string,
};
