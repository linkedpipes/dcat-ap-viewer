import React from "react";
import {Badge} from "reactstrap";

const TagLine = ({values}) => {
    if (values === undefined) {
        return (
            <div></div>
        )
    }
    return (
        <div style={{"marginTop": "0.2em"}}>
            {values.map((item) => (
                <Badge
                    style={{"marginLeft": "1em", "fontSize": "1em"}}
                    color="default"
                    pill
                    key={item}>
                    {item}
                </Badge>
            ))}
        </div>
    );
};

export default TagLine;