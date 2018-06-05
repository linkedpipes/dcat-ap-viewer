import React from "react";
import {Badge} from "reactstrap";
import {PropTypes} from "prop-types";

const TagLine = ({values, size=1}) => {
    if (values === undefined) {
        return (
            <div></div>
        )
    }
    return (
        <div style={{"marginTop": "0.2em"}}>
            {values.map((item) => (
                <Badge
                    style={{"marginLeft": "1em", "marginBottom":"0.5em", "fontSize": size + "em"}}
                    color="info"
                    pill
                    key={item}>
                    {item}
                </Badge>
            ))}
        </div>
    );
};

TagLine.propTypes = {
    "values": PropTypes.arrayOf(PropTypes.string).isRequired,
    "size": PropTypes.number
};

export default TagLine;

